const Joi=require('joi')
const paymentValidationSchmea=Joi.object({
    attendeeId:Joi.string(),
    eventId:Joi.string().required(),
    amount:Joi.number().required(),
    platformFee:Joi.number().required(),
   status: Joi.string().valid('success', 'failed', 'pending').required().trim().required(),
   paymentDate: Joi.date()
})
module.exports={paymentValidationSchmea}