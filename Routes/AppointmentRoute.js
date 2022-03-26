const express = require('express')
const router =express.Router()

const auth = require('../middleware/auth')
const AppointmentController = require('../Controllers/AppointmentController')
const AppointmentValidator=require('../Validations/AppointmentValidator')

router.post('/add',async(request,response)=>{
    try{
        await AppointmentValidator.validateAsync({
            patient_id:request.body['patient_id'],
            Patinet_name:request.body['Patinet_name'],
            doctor_id:request.body['doctor_id'],
            doctor_name:request.body['doctor_name'],
            date:request.body['date'],
            clinic_location:request.body['clinic_location'],
            service_id:request.body['service_id']
        });
        AppointmentController.createAppointment(request,response)
    }catch(err){
        response.status(400).json({
            message: 'Validation error!',
            error: err,
        });
    }
})

router.post('/forADay',(request,response)=>{
    AppointmentController.getAppointmentsByDoctorId(request,response)
})

router.post('/month',(request,response)=>{
    AppointmentController.checkMonthAppointmentsByDoctorId(request,response)
})

router.get('/appointmentsByLocation',auth.checkDoctor,(request,response)=>{
    AppointmentController.getAppointmentsByClinicLocation(request,response)
})


router.put('/edit',async(request,response)=>{
    try{
        await AppointmentValidator.validateAsync({
            patient_id:request.body['patient_id'],
            Patinet_name:request.body['Patinet_name'],
            doctor_id:request.body['doctor_id'],
            doctor_name:request.body['doctor_name'],
            date:request.body['date'],
            clinic_location:request.body['clinic_location'],
            service_id:request.body['service_id']
        });
        AppointmentController.editAppointment(request,response)
    }catch(err){
        response.status(400).json({
            message: 'Validation error!',
            error: err,
        });
    }
})
router.delete('/delete',AppointmentController.DeleteAppointment)



module.exports = router