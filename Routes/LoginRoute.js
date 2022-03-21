const express = require("express")
const router = express.Router()
const {body} = require('express-validator')


const LoginController = require('../Controllers/LoginController')



router.post('/login',[
    body("passwordConfirmation").custom((value,{req})=>{
        if(value !== req.body.password){
            return false
        }
        return true
    }).withMessage("Passwords are not typical")
], LoginController)