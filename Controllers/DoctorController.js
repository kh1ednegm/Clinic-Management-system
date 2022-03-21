const mongoose = require('mongoose')

const Doctor=require('../Models/DoctorModel');
const User=require('../Models/UserModel');
const bcrypt=require('bcrypt');



exports.AddDoctor = async (request,response)=>{

    Doctor.create({
        'name':request.body['name'],
        'birthday':request.body['birthday'],
        'gender':request.body['gender'],
        'address':request.body['address'],
        'phoneno':request.body['phoneno'],
        'specialisation':request.body['specialisation']
    }).then(async(doctor)=>{
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(request.body['password'], salt);
        User.create({
            'email':request.body['email'],
            'password':hashedpassword,
            'userType':'doctor',
            'UserID':doctor._id,
        }).then((user)=>{
            if(user){
                response.status(200).send({message:"OK"})
            }
            else{
                response.status(400).send({error:"Faild"})
            }
        });
    });
    
}


