const mongoose = require('mongoose')

const Employee = new mongoose.Schema({
    name:{type:String,required:true},
    birthday:{type:Date,required:true},
    gender:{type:String,enum:["m","f"],required:true},
    address:{type:String},
    phoneno:{type:Number,required:true},
    emop_role:{type:String,enum:['receptionist', 'worker', 'nurse'],required:true},
    image:{type:String}
})


module.exports = mongoose.model('Employee',Employee)