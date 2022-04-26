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
        req.body['phoneno']=req.body['phoneno'].toString();
        console.log(req.body['image']);
        await DoctorValidator.validateAsync({
            name: req.body['name'],
            birthday: req.body['birthday'],
            gender: req.body['gender'],
            address: req.body['address'],
            phoneno: req.body['phoneno'],
            specialisation: req.body['specialisation'],
            image: req.body['image'],
            email: req.body['email'],
            password: req.body['password']
        });
        DoctorController.AddDoctor(req, res, next)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({
            message: err,
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
            name: request.body['name'],
            birthday: request.body['birthday'],
            gender: request.body['gender'],
            address: request.body['address'],
            phoneno: request.body['phoneno'],
            specialisation: request.body['specialisation'],
            image: request.body['image'].toString(),
            email: request.body['email'],
        });
        DoctorController.EditDoctor(request, response, next)
    } catch (err) {
        response.status(400).json({
            message: err['details'][0]['message'],
        });
    }
})

module.exports = router;