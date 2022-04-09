const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string()
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
  birthday: Joi.date().min('1-1-1900')
    .raw()
    .required(),
  gender: Joi.string().valid('m', 'M', 'f', 'F'),
  address: Joi.string()
    .min(8)
    .max(50)
    .required(),
  phoneno: Joi.string().length(11).regex(/^\d+$/),
  image:Joi
  .string()
  .custom((value, helper) => {
      const values=['jpg','jpeg','jfif','pjpeg','pjp','png','webp','svg']
      let isImage=false;
      for(let i=0;i<value.length;i++){
        if(value.split('.')[1]===values[i]){
          isImage=true;
        }
      }
      if (isImage) {
        return true
      } else {
        return helper.message(`Not an Image`)
      }
  })
,
  specialisation: Joi.string()
    .min(3)
    .max(30)
    .custom((value,helper)=>{
      for(let i=0;i<value.length;i++){
        if(value[i]-'0'<=9&&value[i]-'0'>=0&&value[i]!=' '){
          return helper.message(`specialisation doesn't allow numbers`)
        }
      }
    })
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().min(8).alphanum().required()
});
