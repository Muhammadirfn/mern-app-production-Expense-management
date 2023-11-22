const express = require('express')
const { loginController, registerController } = require('../controllers/userControllers')

const router = express.Router()

// post routes for Login
router.post('/login', loginController)
// post routes for Register
router.post('/register', registerController)


module.exports = router