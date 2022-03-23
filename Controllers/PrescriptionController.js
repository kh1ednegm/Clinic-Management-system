

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

// Edit Prescription
exports.EditPrescription = async (request,response,next)=>{
    let body = request.body

    try {
        
        let prescription = await Prescription.findByIdAndUpdate({_id:body._id},{
            patient_id:body.patient_id,
            doctor_id:body.doctor_id,
            diagnosis: body.diagnosis,
            date: body.date,
            medication: body.medication
        })

        if (prescription) {
            response.status(200).send({message:"OK",data:prescription})
        }
        else{

            const err = new Error("Faild")
            err.status = 400
            next(err)
        }
    } catch (err) {
        next(err)
    }
}

//Get Prescription By ID
exports.GetPrescriptionByID = async (request,response,next)=>{
    try {
        let body = request.body
        let prescription = await Prescription.findById(body._id)

        if(prescription){
            response.status(200).send({message:"OK",data:prescription})
        }
        else{
            const err = new Error("Prescription is Not Found")
            err.status = 400
            next(err)
        }
    } catch (err) {
        next(err)
    }
}
