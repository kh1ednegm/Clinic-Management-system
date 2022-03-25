const express=require('express');
const router=express.Router();
const multer = require('multer')
const path = require('path')

const DoctorController = require('../Controllers/DoctorController')
const auth = require('../middleware/auth')

const storage = multer.diskStorage({
    destination:(request,file,cd)=>{
        cd(null,"images")
    },
    filename: (request,file,cd)=>{
        let fname = Date.now() + path.extname(file.originalname)
        cd(null,fname)

        request.body.image = fname
    }

})
    
const upload = multer({storage:storage})


//Add a new Doctor
router.post('/add',upload.single('image'),(req,res,next)=>{
    DoctorController.AddDoctor(req,res,next)
});

//Delete Doctor
router.delete('/delete',(request,response,next)=>{
    DoctorController.DeleteDoctor(request,response,next)
})

//Get Doctor ID
router.get('/byId',(request,response,next)=>{
    DoctorController.GetDoctorByID(request,response,next)
})

//Get All Doctors
router.get('/all',(request,response,next)=>{
    DoctorController.GetAllDoctors(request,response,next)
})



//Edit Doctor
router.put('/edit',(request,response,next)=>{
    DoctorController.EditDoctor(request,response,next)
})

module.exports= router;