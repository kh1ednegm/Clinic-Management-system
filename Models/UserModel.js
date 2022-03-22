const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')


const User = new mongoose.Schema({
    email:{type:String,require:true,unique:true},
    password:{type:String,required:true},
    userType:{type:String, enum:["admin", "doctor","receptionist"],required:true},
    UserID:{type:ObjectId,required:true},
})



module.exports = mongoose.model("User",User)