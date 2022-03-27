const Joi = require('joi');
const Patient = require('../Models/PatientModel')
const Doctor = require('../Models/DoctorModel');
module.exports = Joi.object({
    patient_id: Joi.string()
    .custom(async(value,helper)=>{
        const patientData=await Patient.findById(value)
        if(!patientData){
            return helper.message(`No such Patient ID in the DataBase`);
        }
    })
    .required(),
    doctor_id:Joi.string()
    .custom(async(value,helper)=>{
        const doctorData=await Doctor.findById(value)
        if(!doctorData){
            return helper.message(`No such Doctor ID in the DataBase`);
        }
    })
    .required(),
    diagnosis:Joi.string().required(),
    date: Joi.date().min('1-1-1900')
        .raw()
        .required(),
});
