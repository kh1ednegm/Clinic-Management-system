const express=require('express');
const router=express.Router();
const Doctor=require('../Models/DoctorModel');
const User=require('../Models/UserModel');
const bcrypt=require('bcryptjs');

//Add a new Doctor
router.post('/Doctor',(req,res)=>{
    Doctor.create({
        'name':req.body['name'],
        'birthday':req.body['birthday'],
        'gender':req.body['gender'],
        'address':req.body['address'],
        'phoneno':req.body['phoneno'],
        'specialisation':req.body['specialisation']
    }).then(async(doctor)=>{
        encryptedPassword = await bcrypt.hash(req.body['password'], 10);
        User.create({
            'email':req.body['email'],
            'password':encryptedPassword,
            'userType':'doctor',
            'UserID':doctor._id,
        }).then((user)=>{
            console.log(user);
        });
    });
    res.send('Done');
});

module.exports= router;