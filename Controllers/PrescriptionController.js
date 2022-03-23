

const Prescription = require('../Models/PrescriptionModel')



exports.AddPrescription = async (request,response,next)=>{



    let body = request.body

    try {
        
        let newPrescription = await Prescription.create({
            patient_id:body.patient_id,
            doctor_id:body.doctor_id,
            diagnosis: body.diagnosis,
            date: body.date,
            medication: body.medication
        })

        if (newPrescription) {
            response.status(200).send({message:"OK",data:newPrescription})
        } else {
            let err = new Error('Faild')
            err.status = 400
            next(err)
        }
    } catch (err) {
        next(err)
    }
}

exports.GetAllPrescriptions = async (request,response,next)=>{



    let body = request.body

    let prescriptions = await Prescription.find({patient_id:body.patient_id,doctor_id:body.doctor_id},).sort({date:1})

    if (prescriptions.length > 0) {
        
        response.status(200).send({message:"OK",data:prescriptions})
    } else {
        let err = new Error('No prescriptions for that patient')
            err.status = 400
            next(err)
    }
}