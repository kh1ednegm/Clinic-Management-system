const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .custom((value, helper) => {
            console.log((' '-'0'))
            console.log(('0'-'0'))
            for (let i = 0; i < value.length; i++) {
                if (value[i] - '0' <= 9 && value[i] - '0' >= 0&&value[i]!=' ') {
                    return helper.message(`Name doesn't allow numbers`)
                }
            }
        })
        .required(),
    birthday: Joi.date().min('1-1-1900')
        .raw()
        .required(),
    gender: Joi.string().valid('m', 'M', 'f', 'F').required(),
    address: Joi.string()
        .min(8)
        .max(50)
        .required(),
    phoneno: Joi.string().length(10).regex(/^\d+$/),
    image: Joi
        .string()
        .custom((value, helper) => {
            const values = ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'webp', 'svg']
            let isImage = false;
            for (let i = 0; i < value.length; i++) {
                if (value.split('.')[1] === values[i]) {
                    isImage = true;
                }
            }
            if (isImage) {
                return true
            } else {
                return helper.message(`Not an Image`)
            }
        })
    ,
    emop_role: Joi.string().valid('receptionist', 'worker', 'nurse').required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(8).alphanum().optional()
});