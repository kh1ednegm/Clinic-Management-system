const express = require('express')
const router =express.Router()

const auth = require('../middleware/auth')
const AppointmentController = require('../Controllers/AppointmentController')

router.get('/appointmentsByDoctor',auth.checkReception,(request,response)=>{
    AppointmentController.getAppointmentsByDoctorId(request,response)
})


router.get('/appointmentsByLocation',auth.checkDoctor,(request,response)=>{
    AppointmentController.getAppointmentsByClinicLocation(request,response)
})


router.put('/update',AppointmentController.editAppointment)
router.delete('/delete',AppointmentController.DeleteAppointment)



module.exports = router