const Joi=require('joi')
const paymentValidationSchmea=Joi.object({
    attendeeId:Joi.number(),
    eventId:Joi.number().required(),
    amount:Joi.number.required(),
    platformFee:Joi.number().required(),
    status:Joi.string().trim().required(),
    paymentDate:Joi.date().required().greater(new Date())
})
module.exports={paymentValidationSchmea}