const express=require('express');
const router=express.Router();


const DoctorController = require('../Controllers/DoctorController')
const auth = require('../middleware/auth')


//Add a new Doctor
router.post('/doctor',auth.checkAdmin,(req,res)=>{
    DoctorController.AddDoctor(req,res)
});


module.exports= router;