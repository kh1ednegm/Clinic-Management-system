const mongoose = require('mongoose')



const Doctor = new mongoose.Schema({
    doctorName:{type:String,required:true},
    doctorBirthDate:{type:Date,required:true},
    doctorGender:{type:String,enum:["Male","Female"],required:true},
    doctorAddress:{type:String},
    doctorPhoneNumber:{type:String,required:true},
    doctorSpecialization:{type:String,required:true},
    doctorImage:{type:String}
})


module.exports = mongoose.model("Doctor",Doctor)