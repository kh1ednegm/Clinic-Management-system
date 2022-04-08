const Joi = require('joi');
const Service = require('../Models/ServiceModel')

module.exports = Joi.object({
    patient_id: Joi.string().required(),
    Patinet_name: Joi.string()
    .min(3)
    .max(30)
    .custom((value,helper)=>{
      for(let i=0;i<value.length;i++){
        if(value[i]-'0'<=9&&value[i]-'0'>=0&&value[i]!=' '){
          return helper.message(`Name doesn't allow numbers`)
        }
      }
    })
    .required(),
  doctor_id:Joi.string().required(),
  doctor_name:Joi.string()
  .min(3)
  .max(30)
  .custom((value,helper)=>{
    for(let i=0;i<value.length;i++){
      if(value[i]-'0'<=9&&value[i]-'0'>=0&&value[i]!=' '){
        return helper.message(`Name doesn't allow numbers`)
      }
    }
  })
  .required(),
  date: Joi.date().min('1-1-1900')
    .raw()
    .required(),
  clinic_location: Joi.string().required(),
  service_id: Joi.string()
  .custom(async(value,helper)=>{
    const serviceData=await Service.findById(value);
    if(!serviceData){
        return helper.message(`There's no service id with such ID={${value}}`)
    }
  })
  .required()
});
