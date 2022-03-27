const Joi = require('joi');
const Doctor = require('../Models/DoctorModel');
module.exports = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .custom((value, helper) => {
            for (let i = 0; i < value.length; i++) {
                if (value[i] - '0' <= 9 && value[i] - '0' >= 0) {
                    return helper.message(`Name doesn't allow numbers`)
                }
            }
        })
        .required(),
    price: Joi.number().custom((value, helper) => {
        let moneyprocess = value.toString().split('.')
        if (moneyprocess.length == 2 && moneyprocess[1].length > 2) {
            return helper.message(`Money is only valid if it's only double number with 2 or less index after . like {25.35} or {25.7}`)
        }
    }).required(),
    doctor_id:Joi.string()
    .custom(async(value,helper)=>{
        let doctor = await Doctor.findById(value)
        if(!doctor){
            return helper.message(`Donctor ID isn't in DataBase`);
        }
    })
    .required()
});
