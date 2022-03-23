const express = require('express')
const router = express.Router()

const PrescriptionsController = require('../Controllers/PrescriptionController')


router.post('/add')

router.post('/add',(request,response,next)=>{
    PrescriptionsController.AddPrescription(request,response,next)
})

router.get('/byId',(request,response,next)=>{
    PrescriptionsController.GetPrescriptionByID(request,response,next)
})

router.put('/edit',(request,response,next)=>{
    PrescriptionsController.EditPrescription(request,response,next)
})

module.exports = router