


const { body } = require('express-validator')
const Appointment = require('../Models/AppointmentModel')



exports.getAppointmentsByDoctorId = async (request,response,next)=>{

    try{
        let body = request.body
        let f = new Date(body.date)
        f.setHours(26)
        let appointments = await Appointment.find({doctor_id:body.doctor_id,date:{$gte:body.date,$lte:new Date(f).toISOString()}}).sort({date:1})
        // if(appointments.length > 0){
        return response.status(200).send({message:"OK",data:appointments})
        // }
        // else{
        //     const err = new Error("No Appointments")
        //     console.log("no appointment")
        //     err.status = 400
        //     next(err)
        // }
    }
    catch (err) {
        return response.status(400).send({error:err.message})
    }
}

exports.checkMonthAppointmentsByDoctorId = async (request,response,next)=>{
    try{
        let body = request.body
        let monthDays = body.monthDays
        for (let day = 0; day < monthDays.length; day++) {
            let dayNformat=new Date(Date.parse(monthDays[day].date)).toLocaleDateString("en-CA", { year: 'numeric', month: 'numeric', day: 'numeric' })
            let f = new Date(dayNformat)
            f.setHours(26)
            monthDays[day].status = await Appointment.exists({doctor_id:body.doctor_id,date:{$gte:dayNformat,$lte:new Date(f).toISOString()}})
        }
        return response.status(200).send({message:"OK",data:monthDays})
    }
    catch (err) {
        console.log("errrrr")
        return response.status(400).send({error:err.message})
    }
}


exports.createAppointment = async (request,response,next)=>{


    try{
        let body = request.body

        let oldAppointment = await Appointment.findOne({
            doctor_id:body.doctor_id,
            data:body.date
        })

        if(oldAppointment){
            return response.status(200).send({error:"Can't assign more than one appointment for a doctor at the same time"})
        }
        else{
            let newAppointment = await Appointment.create({
                patient_id:body.patient_id,
                Patinet_name:body.Patinet_name,
                doctor_id:body.doctor_id,
                doctor_name:body.doctor_name,
                date:body.date,
                clinic_location:body.clinic_location,
                service_id:body.service_id
            })
    
            if(newAppointment){
                return response.status(200).send({ message: "OK" });
            }
            else{
                const err = new Error("Faild to save the appointment")
                err.status = 400
                next(err)
                
            }
        }
    }
    catch(err){
        return response.status(400).send({ error: "Invalid Date" });
    }
}


exports.editAppointment = async (request,response,next)=>{

    let body = request.body
    try{
        let appointment = await Appointment.findOneAndUpdate({_id:body._id},{
            patient_id : body.patient_id,
            Patinet_name : body.Patinet_name,
            doctor_id : body.doctor_id,
            doctor_name : body.doctor_name,
            date : body.date,
            clinic_location : body.clinic_location
        })
        
        if(appointment){
            response.status(200).send({message:"OK"})
        }
        else{
            const err = new Error("Appointment is Not Found")
            err.status = 200
            next(err)
        }
    }
    catch(err){
        response.status(400).send({error:err.message})
    }
}

exports.DeleteAppointment = async (request,response,next)=>{


    try {
        let body = request.body

        let appointment = await Appointment.findOneAndDelete({_id:body._id})
        if(appointment){
            response.status(200).send({message:"OK"})
        }
        else{
            response.status(200).send({message:"Appointment is Not Found"})
        }

    } catch (err) {
        response.status(400).send({error:err.message})
    }
}