const mongoose = require('mongoose')

const Employee = new mongoose.Schema({
    name:{type:String,required:true},
    birthday:{type:Date,required:true},
    gender:{type:String,enum:["m","f"],required:true},
    address:{type:String},
    phoneno:{type:Number,required:true},
    emop_role:{type:String,enum:['reception', 'worker', 'nurse'],required:true},
})


module.exports = mongoose.model('Employee',Employee)