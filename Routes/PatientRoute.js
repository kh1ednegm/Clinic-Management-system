const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const PatientController = require('../Controllers/PatientController')

router.post('/add',(request,response,next)=>{
    PatientController.AddPatient(request,response,next)
})

router.get('/all',(request,response,next)=>{
    PatientController.GetAllPatients(request,response,next)
})


router.get('/byId',(request,response,next)=>{
    PatientController.GetPatientById(request,response,next)
})

router.get('/byName',(request,response,next)=>{
    PatientController.GetPatientsByName(request,response,next)
})

router.put('/edit',(request,response,next)=>{
    PatientController.EditPatient(request,response,next)
})

router.delete('/delete',(request,response,next)=>{
    PatientController.DeletePatient(request,response,next)
})