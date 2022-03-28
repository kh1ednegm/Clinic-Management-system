const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const PatientController = require('../Controllers/PatientController')
const PatientValidator = require('../Validations/PatientValidator')

const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: (request, file, cd) => {
        cd(null, "images")
    },
    filename: (request, file, cd) => {
        let fname = Date.now() + path.extname(file.originalname)
        cd(null, fname)

        request.body.image = `images/${fname}`
    }

})

const upload = multer({ storage: storage })


router.post('/add', upload.single('image'), async (request, response, next) => {
    try {
        await PatientValidator.validateAsync({
            name: request.body['name'],
            birthDate: request.body['birthDate'],
            gender: request.body['gender'],
            address: request.body['address'],
            phoneNo: request.body['phoneNo'],
            image: request.body['image'].toString(),
            email: request.body['email'],
        });
        PatientController.AddPatient(request, response, next)
    } catch (err) {
        console.log(err);
        response.status(400).json({
            message: err['details'][0]['message'],
        });
    }
})

router.get('/all', (request, response, next) => {
    PatientController.GetAllPatients(request, response, next)
})


router.get('/byId', (request, response, next) => {
    PatientController.GetPatientById(request, response, next)
})

router.get('/byName', (request, response, next) => {
    PatientController.GetPatientsByName(request, response, next)
})

router.put('/edit', async(request, response, next) => {
    try {
        await PatientValidator.validateAsync({
            name: request.body['name'],
            birthDate: request.body['birthDate'],
            gender: request.body['gender'],
            address: request.body['address'],
            phoneNo: request.body['phoneNo'],
            image: request.body['image'].toString(),
            email: request.body['email'],
        });
        PatientController.EditPatient(request, response, next)
    } catch (err) {
        console.log(err);
        response.status(400).json({
            message: err['details'][0]['message'],
        });
    }
})

router.delete('/delete', (request, response, next) => {
    PatientController.DeletePatient(request, response, next)
})


module.exports = router