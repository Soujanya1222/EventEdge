const Joi=require('joi')
const couponValidationSchema=Joi.object({
    code:Joi.string().trim().uppercase().min(3).max(20).required(),
    discount:Joi.number().positive().required(),
    expiry:Joi.date().greater('now').required(),
    organiserId:Joi.string(),
    usedBy:Joi.array().items(Joi.string().length(24)),
    EventId:Joi.string()
})
module.exports={couponValidationSchema}