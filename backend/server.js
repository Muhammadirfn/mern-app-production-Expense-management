const express = require('express')
const app = express()
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv')
const path = require('path')
const connectDb = require('./config/connectDb')
const PORT = process.env.PORT || 8080

dotenv.config()
// database
connectDb()

// middlware
app.use(express.json())
app.use(cors())
// userroutes
// routes
app.use('/api/v1/users' , require('./routes/userRoute'))
// transations route
app.use('/api/v1/transations', require('./routes/transationRoute'))

// static files
app.use(express.static(path.join(__dirname, "./frontend/dist")))


app.get('*', function(req,res){
  res.sendFile(path.join(__dirname, './frontend/dist/index.html'))
})

// listen the app
app.listen(PORT, ()=>{
  console.log(`server is runnig on the port ${PORT} and this ${process.pid} working id is assigned`.bgCyan);
})