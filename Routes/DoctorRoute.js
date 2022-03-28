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
        cd(null, fname)
        request.body.image = fname
    }

})

const upload = multer({ storage: storage })


//Add a new Doctor
router.post('/add', upload.single('image'), async (req, res, next) => {
    try {
        await DoctorValidator.validateAsync({
            name: req.body['name'],
            birthday: req.body['birthday'],
            gender: req.body['gender'],
            address: req.body['address'],
            phoneno: req.body['phoneno'],
            specialisation: req.body['specialisation'],
            image: req.body['image'].toString(),
            email: req.body['email'],
            password: req.body['password']
        });
        DoctorController.AddDoctor(req, res, next)
    }
    catch (err) {
        res.status(400).json({
            message: err['details'][0]['message'],
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
            name: req.body['name'],
            birthday: req.body['birthday'],
            gender: req.body['gender'],
            address: req.body['address'],
            phoneno: req.body['phoneno'],
            specialisation: req.body['specialisation'],
            image: req.body['image'].toString(),
            email: req.body['email'],
            password: req.body['password']
        });
        DoctorController.EditDoctor(request, response, next)
    } catch (err) {
        res.status(400).json({
            message: err['details'][0]['message'],
        });
    }
})

module.exports = router;