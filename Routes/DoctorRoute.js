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
//,auth.checkAdmin
/*{
    "_id": "6238a48bbd9dca7904058899"
    "name":"Ahmed Hamdy",
    "birthday":"5/5/1999",
    "gender":"m",
    "address":"Assiut",
    "phoneno":1027866191,
    "specialisation":"Diabates",
    "email":"fairytailuzumaki2@gmail.com",
    "password":"Kirito1151999"
}*/
module.exports= router;