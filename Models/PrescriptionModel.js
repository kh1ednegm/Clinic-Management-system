const mongoose = require('mongoose')
const { stringify } = require('nodemon/lib/utils')


const Prescription = new mongoose.Schema({

    patient_id:{type:String,required:true},
    doctor_id:{type:String,required:true},
    diagnosis: { type: String},
    date:{type:Date},
    medication:[{
        _id:false,
        name:{type:String}, 
    }]
})



module.exports = mongoose.model("Prescription",Prescription)