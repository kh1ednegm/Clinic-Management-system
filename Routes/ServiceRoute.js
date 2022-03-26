const express = require('express')
const router = express.Router()


const ServiceController = require('../Controllers/ServiceController')


router.post('/add',ServiceController.AddService)


router.get('/all',ServiceController.GetAllServices)

router.get('/doctor', ServiceController.GetServicesByDoctorId)

router.put('/edit',ServiceController.EditService)

router.delete('/delete',ServiceController.DeleteService)



module.exports = router