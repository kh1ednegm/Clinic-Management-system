const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")


const LoginRoute = require('./Routes/LoginRoute')
const DoctorRoute = require('./Routes/DoctorRoute')
const AppointmentRoute = require('./Routes/AppointmentRoute')
const EmployeeRoute = require('./Routes/EmployeeRoute')
const PatinetRoute = require('./Routes/PatientRoute')

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

mongoose.Promise=global.Promise;

server.use(morgan(":url :method"))
server.use(bodyParser.json())


server.use('',LoginRoute)


server.use('/api',DoctorRoute);

server.use('/appointment',AppointmentRoute)

server.use('/employee',EmployeeRoute)

server.use('/patient',PatinetRoute)



server.use((error,request,response,next)=>{

    error.status = error.status || 500
    response.status(error.status).send(""+error.message)
})