const Joi=require('joi');
const userRegisterValidatorSchema=Joi.object({
    name:Joi.string().trim().required().min(4).max(60),
    email:Joi.string().trim().email().required().lowercase(),
    password:Joi.string().trim().required().min(8).max(30) ,
    role:Joi.string().valid('attendee','organiser','admin').trim().required()
})
const userLoginValidatorSchema=Joi.object({
    email:Joi.string().trim().email().required().lowercase(),
    password:Joi.string().trim().required().min(8).max(130)
})


module.exports={userRegisterValidatorSchema,userLoginValidatorSchema}
  
