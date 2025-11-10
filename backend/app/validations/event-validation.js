const Joi=require('joi')
const eventValidationSchema=Joi.object({
    title:Joi.string().trim().required(),
    description:Joi.string().trim().required(),
    category:Joi.string().trim().required(),
    datetime:Joi.date().required(),
    venue:Joi.string().trim().required(),
    organiserId:Joi.number(),
    location:Joi.object({
    type: Joi.string().valid('Point').required(),
    coordinates: Joi.array().items(
      Joi.number().required()
    ).length(2).required()
  }).required(),
    price:Joi.number().required().min(1),
    totalTickets:Joi.number().required(),
    soldTickets:Joi.number().required(),
    image:Joi.array().required(),
})
module.exports={eventValidationSchema}