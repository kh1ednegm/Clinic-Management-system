const mongoose = require('mongoose')
const fs = require('fs');
const bcrypt = require('bcrypt');



const Doctor = require('../Models/DoctorModel');
const User = require('../Models/UserModel');


//Add Doctor
exports.AddDoctor = async (request, response) => {
    try {
        var image = fs.readFileSync(request.body.image);
        var encode_image = image.toString('base64');
        // Define a JSONobject for the image attributes for saving to database
  
        var finalImage = {
            contentType: request.file.mimetype,
            image: Buffer(encode_image, 'base64')
        };

        let doctor = await Doctor.create({
            'name': request.body['name'],
            'birthday': request.body['birthday'],
            'gender': request.body['gender'],
            'address': request.body['address'],
            'phoneno': request.body['phoneno'],
            'specialisation': request.body['specialisation'],
            'image':finalImage
        })
        
        if(doctor){
            console.log('saved to database')
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

        }

        else{

            response.status(400).send({ error: "Faild" })
        }
    } catch (err) {
        response.status(401).send({ error: err.message })
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
            doctor['imagePath']=doctor['image'].image.buffer;
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
