const mongoose = require('mongoose')



const Doctor = new mongoose.Schema({
    name:{type:String,required:true},
    birthday:{type:Date,required:true},
    gender:{type:String,enum:["m","f"],required:true},
    address:{type:String},
    phoneno:{type:String,required:true},
    specialisation:{type:String,required:true},
    image:{type:String}
})


module.exports = mongoose.model("Doctor",Doctor)