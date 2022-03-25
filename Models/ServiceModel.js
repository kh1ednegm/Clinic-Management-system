const mongoose = require('mongoose')


const Service = new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    doctor_id:{type:mongoose.Types.ObjectId,required:true}
})


module.exports = mongoose.model("Service",Service)