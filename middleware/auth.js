const user = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

exports.checkAdmin = async (request, response,next)=>{

    try{
        let token = await request.get("Authorization").replace("Bearer ", "")
        let payload = jwt.verify(await token, "jwttoken");

        if(payload.userType != "admin"){
            return response.status(401).send({error:"Unauthorized request"})
        }
    }
    catch(err){
        return response.status(401).send({error:"Authorization header isn't set"})
    }

    next()
}

exports.checkReception = async (request, response,next)=>{
    try{
        let token = await request.get("Authorization").replace("Bearer ", "")
        let payload = jwt.verify(await token, "jwttoken");

        if(payload.userType != "receptionist"){
            return response.status(401).send({error:"Unauthorized request"})
        }
    }
    catch(err){
        return response.status(400).send({error:"Authorization header isn't set"})
    }

    next()
}

exports.checkDoctor = async (request, response,next)=>{
    try{
        let token = await request.get("Authorization").replace("Bearer ", "")
        let payload = jwt.verify(await token, "jwttoken")

        if(payload.userType != "doctor"){
            return response.status(401).send({error:"Unauthorized request"})
        }
    }
    catch(err){
        return response.status(401).send({error:"Authorization header isn't set"})
    }

    next()
}



exports.checkAdminAndReception = async (request, response,next)=>{

    try {
        let token = await request.get("Authorization").replace("Bearer ","")
        let payload = jwt.verify(await token,"jwttoken")

        if(payload.userType == "admin" || payload.userType == "receptionist"){
            next()
        }
        else{
            return response.status(401).send({error:"Unauthorized request"})
        }
    } catch (err) {
        return response.status(401).send({error:"Unauthorized request"})
    }
}

exports.checkDoctorAndReception = async (request, response,next)=>{

    try {
        let token = await request.get("Authorization").replace("Bearer ","")
        let payload = jwt.verify(await token,"jwttoken")

        if(payload.userType == "doctor" || payload.userType == "receptionist"){
            next()
        }
        else{
            return response.status(401).send({error:"Unauthorized request"})
        }
    } catch (err) {
        return response.status(401).send({error:"Unauthorized request"})
    }
}


exports.checkUser = async (request,response,next)=>{

    try {
        let token = await request.get("Authorization").replace("Bearer ","")
        let payload = jwt.verify(await token,"jwttoken")

        if(payload.userType == "admin" || payload.userType == "receptionist" || payload.userType == "doctor"){
            next()
        }
        else{
            return response.status(401).send({error:"Unauthorized request"})
        }
    } catch (err) {
        return response.status(401).send({error:"Unauthorized request"})
    }
}