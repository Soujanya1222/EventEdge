const Joi=require('joi')
const couponValidationSchema=Joi.object({
    code:Joi.string().trim().required(),
    discount:Joi.number().required(),
    expiry:Joi.number().required(),
    organiserId:Joi.number(),
    usedBy:Joi.number(),
    EventId:Joi.number()
})
module.exports={couponValidationSchema}