import { message } from 'antd';
import React,{useState,useEffect} from 'react';
import { Link,  useNavigate } from 'react-router-dom';

const Header = () => {
  const [loginuser, setLoginuser] = useState('')
  const navigate = useNavigate()
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('users'))
    if(user){
      setLoginuser(user)
    }
  },[])
  const handleLogout = ()=>{
    localStorage.removeItem('users')
    message.success("Logout Successfull")
   navigate('/login')
  }
  return (
    <header className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to={'/'}>
          <h1 className="text-white text-2xl font-bold cursor-pointer">Expense Management</h1>
          </Link>
         
        </div>
        <div className='flex p-6 '>
          
          <p className="text-white cursor-pointer p-2">{loginuser && loginuser.name}</p>

          <button className='bg-red-400 rounded p-2 cursor-pointer' onClick={handleLogout}>Logout</button>
         
       
        </div>
      </div>
    </header>
  );
};

export default Header;
