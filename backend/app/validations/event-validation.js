const Joi=require('joi')
const eventValidationSchema=Joi.object({
    title:Joi.string().trim().required(),
    description:Joi.string().allow(' ').trim().required(),
    category:Joi.string().trim().required(),
    datetime:Joi.date().iso().required(),
    venue:Joi.string().trim().required(),
    organiserId:Joi.string(),
    location:Joi.object({
    type: Joi.string().valid('Point').required(),
    coordinates: Joi.array().items(Joi.number()).length(2).required()
   }).required(),
    price:Joi.number().required().min(1),
    totalTickets:Joi.number().required(),
    soldTickets:Joi.number().required(),
    image:Joi.any().optional()
})
module.exports={eventValidationSchema}