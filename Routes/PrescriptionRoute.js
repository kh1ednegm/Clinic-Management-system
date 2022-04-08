const express = require('express')
const router = express.Router()

const PrescriptionsController = require('../Controllers/PrescriptionController')
const PrescriptionsValidator = require('../Validations/PrescriptionValidator')


router.post('/add')

router.post('/add', async (request, response, next) => {
    try {
        console.log(request.body);
        await PrescriptionsValidator.validateAsync({
            patient_id: request.body['patient_id'],
            doctor_id: request.body['doctor_id'],
            diagnosis: request.body['diagnosis'],
            date: request.body['date']
        });
        PrescriptionsController.AddPrescription(request, response, next)
    } catch (err) {
        response.status(400).json({
            message: err['details'][0]['message'],
        });
    }
})

router.get('/byId', (request, response, next) => {
    PrescriptionsController.GetPrescriptionByID(request, response, next)
})

router.put('/edit', async(request, response, next) => {
    try {
        await PrescriptionsValidator.validateAsync({
            patient_id: request.body['patient_id'],
            doctor_id: request.body['doctor_id'],
            diagnosis: request.body['diagnosis'],
            date: request.body['date']
        });
        PrescriptionsController.EditPrescription(request, response, next)
    } catch (err) {
        response.status(400).json({
            message: err['details'][0]['message'],
        });
    }
})

module.exports = router