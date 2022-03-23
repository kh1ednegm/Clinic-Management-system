const mongoose = require('mongoose')



const Patient = new mongoose.Schema({
    name:{type:String,required:true},
    birthday:{type:Date,required:true},
    gender:{type:String,enum:["m","f"],required:true},
    address:{type:String},
    phoneno:{type:Number,required:true},
    email:{type:String},
    medication:[{
        prescription_id:{type:mongoose.Types.ObjectId}
    }]
})


/*

get patient info
add prescrtions / edit patient data
get daily appoiments

*/

module.exports = mongoose.model("Patient",Patient)