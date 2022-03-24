const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')


const EmployeeController = require('../Controllers/EmployeeController')


const storage = multer.diskStorage({
    destination:(request,file,cd)=>{
        cd(null,"images")
    },
    filename: (request,file,cd)=>{
       let fname = Date.now() + path.extname(file.originalname)
       cd(null,fname)

       request.body.image = fname
    }

})

const upload = multer({storage:storage})

router.post('/add', upload.single('image'),(request,response,next)=>{
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