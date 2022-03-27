

const Patient = require('../Models/PatientModel')


exports.AddPatient = async (request,response,next)=>{

    let body = request.body

    try {
        
        let patient = await Patient.create({
            name:body.name,
            birthDate: body.birthDate,
            gender: body.gender,
            address: body.address,
            phoneNo: body.phoneNo,
            email: body.email,
            image:body.image
        })

        if (patient) {
            response.status(200).send({message:"OK", data:patient})
        } else {
            let err = new Error("Faild")
            err.status = 400
            next(err)
        }
    } catch (err) {
        next(err)
    }
}


exports.GetAllPatients = async (request,response,next)=>{


    let body = request.body

    let patients = await Patient.find({})

    if(patients){
        response.status(200).send({message:"OK",data:patients})
    }
    else{
        let err = new Error("No Patients")
        err.status = 400
        next(err)
    }
}

exports.GetPatientsByName = async (request,response,next)=>{
    let body = request.body

    let patients = await Patient.find({name:body.name})
    
    if (patients) {
        response.status(200).send({message:"OK",data:patients})
    } else {
        let err = new Error("No Patients")
        err.status = 400
        next(err)
    }
}


exports.GetPatientById = async (request,response,next)=>{

    let body = request.body

    let patient = await Patient.findById(body._id)
    
    if (patient) {
        response.status(200).send({message:"OK",data:patient})
    } else {
        let err = new Error("Not Found")
        err.status = 400
        next(err)
    }
}

exports.EditPatient = async (request,response,next)=>{

    let body = request.body


    let patient = await Patient.findByIdAndUpdate(body._id,{
        name:body.name,
        address: body.address,
        phoneno: body.phoneno,
        email: body.email,
    })

    if (patient) {
        response.status(200).send({message:"OK",data:patient})
    } else {
        let err = new Error("Not Found")
        err.status = 400
        next(err)
    }
}


exports.DeletePatient = async (request,response,next)=>{


    let body = request.body

    let patient = await Patient.findByIdAndDelete(body._id)

    if (patient) {
        response.status(200).send({message:"OK",data:patient})
    } else {
        let err = new Error("Not Found")
        err.status = 400
        next(err)
    }
}
