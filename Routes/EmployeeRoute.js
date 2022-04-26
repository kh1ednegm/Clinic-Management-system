const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')


const EmployeeController = require('../Controllers/EmployeeController')
const EmployeeValidator = require('../Validations/EmployeeValidator')

const storage = multer.diskStorage({
    destination: (request, file, cd) => {
        cd(null, "images")
    },
    filename: (request, file, cd) => {
        let fname = Date.now() + path.extname(file.originalname)
        cd(null, fname)

        request.body.image = fname
    }

})

const upload = multer({ storage: storage })

router.post('/add', upload.single('image'), async (request, response, next) => {
    try {
        if (request.body['emop_role']==='receptionist') {
            if(!request.body['password']){
                request.body['password']='';
            }
            await EmployeeValidator.validateAsync({
                name: request.body['name'],
                birthday: request.body['birthday'],
                gender: request.body['gender'],
                address: request.body['address'],
                phoneno: request.body['phoneno'],
                emop_role: request.body['emop_role'],
                image: request.body['image'].toString(),
                email: request.body['email'],
                password: request.body['password']
            });
        } else {
            await EmployeeValidator.validateAsync({
                name: request.body['name'],
                birthday: request.body['birthday'],
                gender: request.body['gender'],
                address: request.body['address'],
                phoneno: request.body['phoneno'],
                emop_role: request.body['emop_role'],
                image: request.body['image'],
                email: request.body['email'],
            });
        }
        EmployeeController.AddEmployee(request, response, next)
    } catch (err) {
        response.status(400).json({
            message: err['details'][0]['message'],
        });
    }
})

router.get('/byId', (request, response, next) => {
    EmployeeController.GetEmployeeByID(request, response, next)
})

router.get('/all', (request, response, next) => {
    EmployeeController.GetAllEmployees(request, response, next)
})

router.put('/edit', async(request, response, next) => {
    console.log(request.body);
    try {
        if (request.body['emop_role'] === 'receptionist') {
            await EmployeeValidator.validateAsync({
                name: request.body['name'],
                birthday: request.body['birthday'],
                gender: request.body['gender'],
                address: request.body['address'],
                phoneno: request.body['phoneno'],
                emop_role: request.body['emop_role'],
                image: request.body['image'].toString(),
                email: request.body['email'],
            });
        } else {
            await EmployeeValidator.validateAsync({
                name: request.body['name'],
                birthday: request.body['birthday'],
                gender: request.body['gender'],
                address: request.body['address'],
                phoneno: request.body['phoneno'],
                emop_role: request.body['emop_role'],
                image: request.body['image'].toString(),
            });
        }
        EmployeeController.EditEmployee(request, response, next)
    } catch (err) {
        console.log(err);
        response.status(400).json({
            message: err['details'][0]['message'],
        });
    }
})

router.delete('/delete', (request, response, next) => {
    EmployeeController.DeleteEmployee(request, response, next)
})

module.exports = router