const mongoose = require('mongoose')


const Appointment = new mongoose.Schema({
    patient_id:{type:String,required:true},
    Patinet_name:{type:String,required:true},
    doctor_id:{type:string,required:true},
    doctor_name:{type:string,required:true},
    date:{type:Date,required:true,unique:true},
    clinic_location:{type:string,required:true}
})



module.exports = mongoose.model("Appointment",Appointment)