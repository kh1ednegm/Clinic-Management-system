const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")

const LoginRoute = require('./Routes/LoginRoute')
const DoctorRoute = require('./Routes/DoctorRoute')
const AppointmentRoute = require('./Routes/AppointmentRoute')
const EmployeeRoute = require('./Routes/EmployeeRoute')
const PatinetRoute = require('./Routes/PatientRoute')
const PrescriptionRoute=require('./Routes/PrescriptionRoute')
const SericeRoute = require('./Routes/ServiceRoute')

const cors =require("cors")
const server = express()
const PORT = process.env.PORT || 8080;






mongoose.connect("mongodb://localhost:27017/CMS").then(()=>{
    console.log("Connected to DB")
    server.listen(PORT,()=>{
        console.log(`Im listening to port `+ PORT)
    })
}).catch((error)=>{
    console.log("Conncetion faild")
})

server.use(cors())
mongoose.Promise=global.Promise;

server.use(morgan(":url :method"))
server.use(bodyParser.json())

server.use('',LoginRoute)

server.use('/doctor',DoctorRoute);

server.use('/appointment',AppointmentRoute)

server.use('/employee',EmployeeRoute)

server.use('/patient',PatinetRoute)

server.use('/prescription',PrescriptionRoute)

<<<<<<< HEAD
server.use((error,request,response,next)=>{
    error.status = error.status || 500
    response.status(error.status).send(error.message)
=======
server.use('/service',SericeRoute)

//"623b6bf0b966a872b34e655d"

server.use((error,request,response,next)=>{
    error.status = error.status || 500
    response.status(error.status).send(error.message)
    // console.log("error")
>>>>>>> ef554329513bff619805633294d50049e7d1926a
})