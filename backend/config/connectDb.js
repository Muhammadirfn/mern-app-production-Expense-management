const mongoose = require('mongoose')
require('colors')

const connectDb = async() =>{
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log(`server is running on ${mongoose.connection.host}`.bgBlue.white);
  } catch (error) {
    console.log(`${error}`.bgRed);
    
  }
}
module.exports = connectDb