import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { Form, Input, Modal, Select, Table, message ,DatePicker} from 'antd';
import axios from 'axios';
import {UnderlineOutlined, AreaChartOutlined, EditFilled ,DeleteOutlined} from '@ant-design/icons'
import Spinner from '../components/Spinner';
import moment from 'moment'
import Charts from '../components/Charts';
const {RangePicker} = DatePicker

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alltransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [selectedDate , setSelectedDate] = useState([])
  const [type,setType] = useState('all')
  const [viewData , setViewData] = useState('table')
  const [editable , setEditable] = useState(null)


// for edting
const handleEdit = (editedTransaction) => {
  setAllTransaction(prevTransactions =>
    prevTransactions.map(transaction =>
      transaction._id === editedTransaction._id ? editedTransaction : transaction
    )
  );
  setShowModal(false);
  setEditable(null);
  message.success('Transaction Updated Successfully');
};

//  for deleting
  const handleDelete = async (record) =>{
    try {
      setLoading(true)
      const res = await axios.post('http://localhost:8080/api/v1/transations/delete-transation',{transactionId: record._id})
      setLoading(false)
      message.success('Transaction deleted')
      setAllTransaction(prevTransactions => prevTransactions.filter(transaction => transaction._id !== record._id));
    } catch (error) {
      setLoading(false);
      message.error('Error in delete Transaction');
    }
    

  }
  // tables data
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
      key: 'reference',
    },
    {
      title: 'Actions',
   render : (text,record)=>(
    <div>
      <EditFilled onClick={() =>{
        setEditable(record)
        setShowModal(true)
      }}/>
      <DeleteOutlined className='m-2' onClick={()=> handleDelete(record)}/>
    </div>
   )
     
    },
  ];

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('users'));
        setLoading(true);
        const formattedSelectedDate = selectedDate.map(date => moment(date).format('YYYY-MM-DD'));
        const res = await axios.post('http://localhost:8080/api/v1/transations/get-transation', {
          userid: user._id,
          frequency,
          selectedDate: formattedSelectedDate,
          type
        });
  
        setLoading(false);
        setShowModal(false);
  
        const transactionsWithKeys = res.data
          ? res.data.map((transaction, index) => ({ ...transaction, key: index.toString() }))
          : [];
  
        setAllTransaction(transactionsWithKeys);
      } catch (error) {
        message.error('Error in getting all the transactions');
      }
    };
  
    getAllTransactions();
  }, [frequency, selectedDate, type]);
  

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('users'));
      setLoading(true);
      const formattedSelectedDate = selectedDate.map(date => moment(date).format('YYYY-MM-DD'));
   if(editable){
    await axios.post('http://localhost:8080/api/v1/transations/edit-transation', {
     payload:{
      ...values,
      userid: user._id,
      date: formattedSelectedDate,
     },
     transactionId: editable._id
    });

    setLoading(false);
    handleEdit({ ...editable, ...values });
   
    

   } else {
    await axios.post('http://localhost:8080/api/v1/transations/add-transation', {
      ...values,
      userid: user._id,
      date: formattedSelectedDate,
    });

    setLoading(false);
   
    message.success('Transaction Added Successfully');
   }
    
      setShowModal(false);
      setEditable(null)
    } catch (error) {
      setLoading(false);
      message.error('Error in Add Transaction');
    }
  };
 

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters flex items-center sm:p-0 justify-between shadow">
        <div>
          <h5>Select Frequency</h5>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            {/* <Select.Option value={'7'}>Last 1 Week</Select.Option> */}
            <Select.Option value={'30'}>Last 1 Month</Select.Option>
            <Select.Option value={'365'}>Last 1 Year</Select.Option>
            <Select.Option value={'custom'}>Custom</Select.Option>
          </Select>
          {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values)=>setSelectedDate(values)}/>

          
          }
        </div>
        <div>
          <h5>Select Type</h5>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value={'all'}>All</Select.Option>
            <Select.Option value={'income'}>Income</Select.Option>
            <Select.Option value={'expense'}>Expense</Select.Option>
           
          </Select>
          {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values)=>setSelectedDate(values)}/>

          
          }
        </div>
        <div className="m-2 border border-solid border-gray-500 rounded px-10 py-15">
  <UnderlineOutlined className={`m-2 ${viewData === 'table' ? 'active-icon':"inactive-icon"} cursor-pointer font-medium`} onClick={() => setViewData('table')} />
  <AreaChartOutlined className={`m-2 ${viewData === 'chart' ? 'active-icon':"inactive-icon"} cursor-pointer font-medium`}
  onClick={() => setViewData('chart')} />
</div>

        <div>
          <button
            className="bg-blue-500 rounded mt-2 px-4 text-white py-4"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content">
        {viewData === 'table' ?   <Table columns={columns} dataSource={alltransaction}  responsive="stack" /> : <Charts alltransaction={alltransaction}/> }
     
      </div>

      <Modal
         title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
          <Form.Item label={'Amount'} name={'amount'}>
            <Input />
          </Form.Item>
          <Form.Item label={'Type'} name={'type'}>
            <Select>
              <Select.Option value={'income'}>Income</Select.Option>
              <Select.Option value={'expense'}>Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label={'Category'} name={'category'}>
            <Select>
              <Select.Option value={'salary'}>Salary</Select.Option>
              <Select.Option value={'tip'}>Tip</Select.Option>
              <Select.Option value={'project'}>Project</Select.Option>
              <Select.Option value={'food'}>Food</Select.Option>
              <Select.Option value={'movie'}>Movie</Select.Option>
              <Select.Option value={'bills'}>Bills</Select.Option>
              <Select.Option value={'medical'}>Medical</Select.Option>
              <Select.Option value={'fee'}>Fee</Select.Option>
              <Select.Option value={'tax'}>Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label={'Date'} name={'date'}>
            <Input type="date" />
          </Form.Item>
          <Form.Item label={'Reference'} name={'reference'}>
            <Input type="text" />
          </Form.Item>
          <Form.Item label={'Description'} name={'description'}>
            <Input type="text" />
          </Form.Item>
          <div className="flex justify-end">
            <button className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded">
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
