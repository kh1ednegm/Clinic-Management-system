const express=require('express');
const router=express.Router();


const DoctorController = require('../Controllers/DoctorController')
const auth = require('../middleware/auth')


//Add a new Doctor
router.post('/doctor/add',(req,res)=>{
    DoctorController.AddDoctor(req,res)
});

//Delete Doctor
router.delete('/doctor/delete',(request,response)=>{
    console.log("Iam here")
    DoctorController.DeleteDoctor(request,response)
})

//Get Doctor ID
router.get('/doctor/byId',(request,response)=>{
    DoctorController.GetDoctorByID(request,response)
})

//Get All Doctors
router.get('/doctor/all',(request,response)=>{
    console.log("hghghhghg");
    DoctorController.GetAllDoctors(request,response)
})

//Edit Doctor
router.put('/doctor/edit',(request,response)=>{
    DoctorController.EditDoctor(request,response)
})

module.exports= router;