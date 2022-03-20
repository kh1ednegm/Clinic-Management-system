const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")

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

server.use(morgan(":url :method"))
server.use(bodyParser.json())

server.use((error,request,response,next)=>{

    error.status = error.status || 500
    response.status(error.status).send(""+error)
})