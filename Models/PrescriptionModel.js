const mongoose = require('mongoose')
const { stringify } = require('nodemon/lib/utils')


const Prescription = new mongoose.Schema({

    patient_id:{type:string,required:true},
    doctor_id:{type:string,required:true},
    complaint: { type: String},
    notes:{type:string},
    date:{type:Date},
    medication:[{
        _id:false,
        medicine_name:{type:String},
        days:{type:Number},
        quantity:{type:Number}
    }]
})



module.exports = mongoose.model("Prescription",Prescription)