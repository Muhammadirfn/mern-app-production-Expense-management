const  transactionModel  = require("../Models/transationModal");
const moment = require('moment');

const getAlltransation = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;
    // console.log(frequency);
    const transactions = await transactionModel.find({
      ...(frequency !== "custom" ? {
        date: {
          $gt: moment().subtract(Number(frequency), 'd').toDate()
        },
      } : {
        date: {
          $gte: selectedDate[0],
          $lte: selectedDate[1]
        }
      }),
      userid: req.body.userid,
      ...(type !== 'all' && { type })

    });
    // console.log(req.body.userid);
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json('Error in getting transation');
  }
}

const Addtransation = async (req, res) => {
  try {
    const newTransation = new transactionModel(req.body);
    await newTransation.save();
    res.status(201).json('Transaction created');
  } catch (error) {
    console.log(error);
    res.status(500).json('Error in adding transaction');
  }
}
const Edittransation = async (req, res) => {
  try {
    const updatedTransaction = await transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload,
      { new: true } // This option returns the modified document, not the original
    );

    if (!updatedTransaction) {
      // If no transaction is found with the given _id
      return res.status(404).json('Transaction not found');
    }

    res.status(200).json('Edit successful');
  } catch (error) {
    console.error(error);
    res.status(500).json('Error in editing transaction');
  }
};
// delete controler
const  Deletetransation = async (req,res)=>{
  try {
    await transactionModel.findByIdAndDelete({_id: req.body.transactionId})
    res.status(200).json('transation deleted successful');
  } catch (error) {
    console.error(error);
    res.status(500).json('Error in deleting transaction');
    
  }
}


module.exports = { getAlltransation, Addtransation, Edittransation ,Deletetransation};
