const Joi = require('joi')

const ticketValidationSchema = Joi.object({
  attendeeId: Joi.string().hex().length(24),
  eventId: Joi.string().hex().length(24).required(),
  paymentId:Joi.string().hex().length(24).required(),
  qrCode: Joi.string().trim(),
  bookedAt: Joi.date(),
  completedAt:Joi.date(),
  checkedIn:Joi.boolean().default(false),
  status: Joi.string().valid("active", "used", "completed", "missed").default("active")
})
module.exports={ticketValidationSchema}