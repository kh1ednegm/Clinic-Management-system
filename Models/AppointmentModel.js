const mongoose = require('mongoose')


const Appointment = new mongoose.Schema({
    patient_id:{type:String,required:true},
    Patinet_name:{type:String,required:true},
    doctor_id:{type:String,required:true},
    doctor_name:{type:String,required:true},
    date:{type:Date,required:true},
    clinic_location:{type:String,required:true}
})



module.exports = mongoose.model("Appointment",Appointment)