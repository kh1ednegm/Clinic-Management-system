const mongoose = require('mongoose')



const Patient = new mongoose.Schema({
    name:{type:String,required:true},
    birthDate:{type:Date,required:true},
    gender:{type:String,enum:["m","f"],required:true},
    address:{type:String},
    phoneNo:{type:String,required:true},
    email:{type:String},
    image: {type: String}
})


/*

get patient info
add prescrtions / edit patient data
get daily appoiments

*/

module.exports = mongoose.model("Patient",Patient)