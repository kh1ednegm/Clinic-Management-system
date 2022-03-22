const express = require('express')
const router = express.Router()

const EmployeeController = require('../Controllers/EmployeeController')


router.post('/add',(request,response,next)=>{
    EmployeeController.AddEmployee(request,response,next)
})

router.get('/byId',(request,response,next)=>{
    EmployeeController.GetEmployeeByID(request,response,next)
})

router.get('/all',(request,response,next)=>{
    EmployeeController.GetAllEmployees(request,response,next)
})

router.put('/edit',(request,response,next)=>{
    EmployeeController.EditEmployee(request,response,next)
})

router.delete('/delete',(request,response,next)=>{
    EmployeeController.DeleteEmployee(request,response,next)
})








module.exports= router