const Joi = require('joi')

const ticketValidationSchema = Joi.object({
  attendeeId: Joi.string().hex().length(24).required(),
  eventId: Joi.string().length(24).required(),
  paymentId:Joi.string().required(),
  qrCode: Joi.string().trim().required(),
  bookedAt: Joi.date()
})
module.exports={ticketValidationSchema}