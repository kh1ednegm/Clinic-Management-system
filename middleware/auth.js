const user = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

exports.checkAdmin = async (request, response,next)=>{

    try{
        let token = await request.get("Authorization").replace("Bearer ", "")
        let payload = jwt.verify(await token, "jwttoken");

        if(payload.userType != "admin"){
            return response.status(400).send({error:"Unauthorized request"})
        }
    }
    catch(err){
        return response.status(400).send({error:"Authorization header isn't set"})
    }

    next()
}

exports.checkReception = async (request, response,next)=>{
    try{
        let token = await request.get("Authorization").replace("Bearer ", "")
        let payload = jwt.verify(await token, "jwttoken");

        if(payload.userType != "reception"){
            return response.status(400).send({error:"Unauthorized request"})
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
        let payload = jwt.verify(await token, "jwttoken");

        if(payload.userType != "doctor"){
            return response.status(400).send({error:"Unauthorized request"})
        }
    }
    catch(err){
        return response.status(400).send({error:"Authorization header isn't set"})
    }

    next()
}