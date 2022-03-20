const mongoose = require('mongoose')


const User = new mongoose.Schema({
    email:{type:String,require:true,unique:true},
    password:{type:String,required:true},
    userType:{type:String, enum:["admin", "doctor","reception"],required:true},
    UserID:{type:Number,required:true},
})



module.exports = mongoose.model("User",User)