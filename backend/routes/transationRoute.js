const express = require('express')
const { getAlltransation, Addtransation, Edittransation, Deletetransation } = require('../controllers/transationsController')


const router = express.Router()

// add the transation
router.post('/add-transation', Addtransation)
// edit the transation
router.post('/edit-transation', Edittransation)
// delete the transation
router.post('/delete-transation', Deletetransation)
// get all transations
router.post('/get-transation', getAlltransation)


module.exports = router