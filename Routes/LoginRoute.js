const express = require("express")
const router = express.Router()
const {body} = require('express-validator')


const LoginController = require('../Controllers/LoginController')



router.post('/login', LoginController)

module.exports = router