const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')

router.get('/patients',auth.checkDoctor,(request,response)=>{
    
})