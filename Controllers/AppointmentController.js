


const { body } = require('express-validator')
const Appointment = require('../Models/AppointmentModel')



exports.getAppointmentsByDoctorId = async (request,response)=>{

    try{
        let body = request.body
        let appointments = await Appointment.find({doctor_id:body.doctor_id,date:{$gte:body.date}}).sort({date:1})
        if(appointments.length > 0){
            return response.status(200).send({message:"OK",data:appointments})
        }
        else{
            return response.status(400).send({error:"No data"})
        }
    }
    catch(err){
        return response.status(400).send({error:"No data"})
    }
}
// ممكن تمسحها
exports.getAppointmentsByClinicLocation = async (request,response)=>{
    
    try{
        let body = request.body
        let appointments = await Appointment.find({doctor_id:body.doctor_id, clinic_location:body.clinic_location, date:{$gte:body.date}}).sort({date:1})
        if(appointments.length > 0){
            return response.status(200).send({message:"OK",data:appointments})
        }
        else{
            return response.status(400).send({error:"No data"})
        }
    }
    catch(err){
        return response.status(400).send({error:"No data"})
    }
}


exports.createAppointment = async (request,response)=>{


    try{
        let body = request.body
        let appointment = new Appointment({
            patient_id:body.patient_id,
            Patinet_name:body.Patinet_name,
            doctor_id:body.doctor_id,
            doctor_name:body.doctor_name,
            date:body.date,
            clinic_location:body.clinic_location
        })

        let newAppointment = await appointment.save()

        if(newAppointment){
            return response.status(200).send({ message: "OK" });
        }
        else{
            return response.status(400).send({ error: "Faild to save the appointment" });
        }
    }
    catch(err){
        return response.status(400).send({ error: "Invalid Date" });
    }
}


exports.editAppointment = async (request,response)=>{


    
}