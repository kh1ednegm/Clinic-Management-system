const mongoose = require('mongoose')

const Doctor = require('../Models/DoctorModel');
const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');


//Add Doctor
exports.AddDoctor = async (request, response) => {
    try {
        console.log("Iam here")
        let doctor = await Doctor.create({
            'name': request.body['name'],
            'birthday': request.body['birthday'],
            'gender': request.body['gender'],
            'address': request.body['address'],
            'phoneno': request.body['phoneno'],
            'specialisation': request.body['specialisation']
        })
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(request.body['password'], salt);
        let user = await User.create({
            'email': request.body['email'],
            'password': hashedpassword,
            'userType': 'doctor',
            'UserID': doctor._id,
        })
        if (user) {
            response.status(200).send({ message: "OK" })
        }
        else {
            response.status(400).send({ error: "Faild" })
        }
    } catch (err) {
        response.status(400).send({ error: "Faild" })
    }
}

//Delete Doctor
exports.DeleteDoctor = async (request,response)=>{
    try {
        let body = request.body

        let doctor = await Doctor.findByIdAndDelete(body._id)
        if(doctor){
            response.status(200).send({message:"OK"})
        }
        else{
            response.status(400).send({error:"Doctor is Not Found"})
        }

    } catch (err) {
        response.status(400).send({error:"Failed"})
    }
}

// Get Doctor by ID
exports.GetDoctorByID = async (request,response)=>{
    try {
        let doctor = await Doctor.findById(request.body._id)
        if(doctor){
            response.status(200).send({message:"OK",data:doctor})
        }
        else{
            response.status(400).send({error:"Doctor is Not Found"})
        }
    } catch (err) {
        response.status(400).send({error:"Failed"})
    }
}

// GET all Doctors
exports.GetAllDoctors = async (request,response)=>{
    try {
        let doctors = await Doctor.find({})
        if(doctors){
            response.status(200).send({message:"OK",data:doctors})
        }
        else{
            response.status(400).send({error:"Doctors Not Found"})
        }
    } catch (err) {
        response.status(400).send({error:"Failed"})
    }
} 

// Edit Employee
exports.EditDoctor = async (request,response)=>{
    try {
        let doctor = await Doctor.findByIdAndUpdate({_id:request.body._id},{
            'name': request.body['name'],
            'birthday': request.body['birthday'],
            'gender': request.body['gender'],
            'address': request.body['address'],
            'phoneno': request.body['phoneno'],
            'specialisation': request.body['specialisation']
        })
        if (doctor) {
            response.status(200).send({message:"OK",data:doctor})
        }
        else{
            response.status(400).send({error:"Doctors Not Found"})
        }
    } catch (err) {
        response.status(400).send({error:"Failed"})
    }
}
