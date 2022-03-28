const { response } = require('express');
const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
const DoctorController = require('../Controllers/DoctorController')
const auth = require('../middleware/auth')
const DoctorValidator = require('../Validations/DoctorValidator')

const storage = multer.diskStorage({
    destination: (request, file, cd) => {
        cd(null, "images")
    },
    filename: (request, file, cd) => {
        let fname = Date.now() + path.extname(file.originalname)
        cd(null,fname)
        request.body.doctorImage = fname
    }

})

const upload = multer({ storage: storage })


//Add a new Doctor
router.post('/add', upload.single('image'), async (req, res, next) => {
    try {
        await DoctorValidator.validateAsync({

            doctorName:req.body['doctorName'],
            doctorBirthDate:req.body['doctorBirthDate'],
            doctorGender:req.body['doctorGender'],
            doctorAddress:req.body['doctorAddress'],
            doctorPhoneNumber:req.body['doctorPhoneNumber'],
            doctorSpecialization:req.body['doctorSpecialization'],
            doctorImage:req.body['doctorImage'].toString(),
            doctorEmail:req.body['doctorEmail'],
            password:req.body['password']
        });
        DoctorController.AddDoctor(req, res, next)
    }
    catch (err) {
        res.status(400).json({
            message: 'Validation error!',
            error: err,
        });
    }
})

//Delete Doctor
router.delete('/delete', (request, response, next) => {
    DoctorController.DeleteDoctor(request, response, next)
})

//Get Doctor ID
router.get('/byId', (request, response, next) => {
    DoctorController.GetDoctorByID(request, response, next)
})

//Get All Doctors
router.get('/all', (request, response, next) => {
    DoctorController.GetAllDoctors(request, response, next)
})



//Edit Doctor
router.put('/edit', async(request, response, next) => {
    try {
        await DoctorValidator.validateAsync({
            doctorName:req.body['doctorName'],
            doctorBirthDate:req.body['doctorBirthDate'],
            doctorGender:req.body['doctorGender'],
            doctorAddress:req.body['doctorAddress'],
            doctorPhoneNumber:req.body['doctorPhoneNumber'],
            doctorSpecialization:req.body['doctorSpecialization'],
            doctorImage:req.body['doctorImage'].toString(),
            doctorEmail:req.body['doctorEmail'],
            password:req.body['password']
        });
        DoctorController.EditDoctor(request, response, next)
    } catch (err) {
        res.status(400).json({
            message: 'Validation error!',
            error: err,
        });
    }
})

module.exports = router;