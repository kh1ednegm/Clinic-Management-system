const express = require('express')
const router = express.Router()

const ServiceController = require('../Controllers/ServiceController')
const ServiceValidator=require('../Validations/ServiceValidation')


router.post('/add',async (request, response, next) =>{
    try{
        console.log(request.body)
        await ServiceValidator.validateAsync({
            name:request.body['name'],
            price:request.body['price'],
            doctor_id:request.body['doctor_id']
        });
        ServiceController.AddService(request, response, next);
    }catch(err){
        response.status(400).json({
            message: 'Validation error!',
            error: err,
        });
    }
})


router.get('/all',ServiceController.GetAllServices)

router.get('/doctor', ServiceController.GetServicesByDoctorId)

router.put('/edit',async (request, response, next) =>{
    try{
        console.log(request.body)
        await ServiceValidator.validateAsync({
            name:request.body['name'],
            price:request.body['price'],
            doctor_id:request.body['doctor_id']
        });
        ServiceController.EditService(request, response, next);
    }catch(err){
        response.status(400).json({
            message: 'Validation error!',
            error: err,
        });
    }
})


router.delete('/delete',ServiceController.DeleteService)



module.exports = router