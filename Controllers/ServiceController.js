

const { response } = require('express')
const Service = require('../Models/ServiceModel')



exports.AddService = async (request,response,next)=>{




    let body = request.body
    let oldService = await Service.findOne({name:body.name,doctor_id:body.doctor_id})

        if (oldService) {
            let err = new Error("Service already exists")
            err.status = 400
            next(err)
        } else {

            try {
                let newService = await Service.create({
                    name:body.name,
                    price:body.price,
                    doctor_id:body.doctor_id
                })

                if (newService) {
                    response.status(200).send({message:"OK"})
                }
            } 
            catch (err) {
                next(err)
            }
        }       
    
}

exports.GetAllServices = async (request, response,next)=>{

    let services = await Service.find({})

    if(services.length > 0){
        response.status(200).send({data:services})
    }
    else{
        response.status(400).send({error:"NO Data"})
    }

}

exports.GetServicesByDoctorId = async (request, response,next)=>{


    let services = await Service.find({doctor_id:request.body.doctor_id})

    if(services.length > 0 ){
        response.status(200).send({data:services})
    }
    else
        response.status(400).send({error:"No services are available"})
}


// For admin
exports.EditService = async (request,response,next)=>{


    let body = request.body
    let service = await Service.findOneAndUpdate({_id:body._id},{
        name:body.name,
        price:body.price,
        doctor_id:body.doctor_id

    },{
        new: true
      })

    if(service){
        response.status(200).send({message:"OK", data:service})
    }
    else{
        response.status(400).send({error:"Faild"})
    }
}

exports.DeleteService = async (request,response,next)=>{

    let service = await Service.findByIdAndDelete(request.body._id)

    if(service){
        response.status(200).send({message:"OK"})
    }
    else{
        response.status(400).send({error:"Faild"})
    }
}