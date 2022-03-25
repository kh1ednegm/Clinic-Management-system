const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const fs = require('fs')

const Doctor = require('../Models/DoctorModel');
const User = require('../Models/UserModel');


//Add Doctor
exports.AddDoctor = async (request, response,next) => {

    
    try {
        

        let doctor = await Doctor.create({
            'name': request.body['name'],
            'birthday': request.body['birthday'],
            'gender': request.body['gender'],
            'address': request.body['address'],
            'phoneno': request.body['phoneno'],
            'specialisation': request.body['specialisation'],
            'image':request.body['image']
        })
        if(doctor){

            let hashedpassword = await bcrypt.hash(request.body.password,await bcrypt.genSalt(10))
            try {
                let user = await User.create({
                    'email': request.body['email'],
                    'password': hashedpassword,
                    'userType': 'doctor',
                    'UserID': doctor._id,
                })

                if (user) {
                    response.status(200).send({ message: "OK" })
                    }

            } catch (e) {
                fs.unlinkSync(`images/${doctor.image}`)
                await Doctor.findByIdAndDelete(doctor._id)
                let err = new Error("Email already exists")
                err.status = 400
                next(err)
            }
        }

    } catch (err) {
        next(err)
    }
}









//Delete Doctor
exports.DeleteDoctor = async (request,response,next)=>{
    try {
        let body = request.body

        let doctor = await Doctor.findByIdAndDelete(body._id)
        if(doctor){
            response.status(200).send({message:"OK"})
        }
        else{
            let err = new Error("Doctor is Not Found")
            err.status = 400
            next(err)
        }

    } catch (err) {
        next(err)
    }
}

// Get Doctor by ID
exports.GetDoctorByID = async (request,response,next)=>{

        let doctor = await Doctor.findById(request.body._id)

        if(doctor){
            response.status(200).send({message:"OK",data:doctor})
        }
        else{
            let err = new Error("Doctor is Not Found")
            err.status = 400
            next(err)
        }

}

// GET all Doctors
exports.GetAllDoctors = async (request,response,next)=>{

        let doctors = await Doctor.find({})
        if(doctors){
            response.status(200).send({message:"OK",data:doctors})
        }
       /* else{
            let err = new Error("There're no doctors")
            err.status = 400
            next(err)
        }*/

} 

// Edit Employee
exports.EditDoctor = async (request,response,next)=>{
    try {
        let doctor = await Doctor.findByIdAndUpdate(request.body._id,{
            'name': request.body['name'],
            'address': request.body['address'],
            'phoneno': request.body['phoneno'],
            'specialisation': request.body['specialisation']
        })
        if (doctor) {
            response.status(200).send({message:"OK"})
        }
        else{
            let err = new Error("Doctor is Not Found")
            err.status = 400
            next(err)
        }
    } catch (err) {
        next(err)
    }
}
