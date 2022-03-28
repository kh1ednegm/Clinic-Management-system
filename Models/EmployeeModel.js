const mongoose = require('mongoose')

const Employee = new mongoose.Schema({
    empName:{type:String,required:true},
    empBirthDate:{type:Date,required:true},
    empGender:{type:String,enum:["Male","Female"],required:true},
    empAddress:{type:String},
    empPhoneNumber:{type:String,required:true},
    empRole:{type:String,enum:['Receptionist', 'Worker', 'Nurse'],required:true},
    empImage:{type:String}
})


module.exports = mongoose.model('Employee',Employee)