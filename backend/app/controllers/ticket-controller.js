const Ticket=require('../models/ticket-model')
const Payment = require('../models/payment-model')
const Coupon = require('../models/coupon-model')
const Event = require('../models/event-model')
const QRCode = require('qrcode')

const{ticketValidationSchema}=require('../validations/ticket-validation')
const ticketCltr={}
ticketCltr.create=async(req,res)=>{
    const body=req.body
    const {error,value}=ticketValidationSchema.validate(body,{abortEarly:true})
    if(error){
        return res.status(400).json({error:error.details})
    }
    try{
        const ticket=new Ticket(value)
        await ticket.save()
        res.json(ticket)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}
ticketCltr.list=async(req,res)=>{
    try{
        const ticket=await Ticket.find()
        res.json(ticket)
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}

ticketCltr.getOne=async(req,res)=>{
  const id=req.params.id
  try{
    const ticket=await Ticket.findById(id)
    res.json(ticket)
  }catch(err){
     console.log(err)
        res.status(500).json(err)
  }
}

ticketCltr.update=async(req,res)=>{
    const id=req.params.id
    const body=req.body
    const {error,value}=ticketValidationSchema.validate(body,{abortEarly:true})
    if(error){
        return res.status(400).json({error:error.details})
    }
    try{
        const ticket=await Ticket.findByIdAndUpdate(id,value,{new:true})
        res.json(ticket)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

ticketCltr.remove=async(req,res)=>{
    const id=req.params.id
    try{
        const ticket=await Ticket.findByIdAndDelete(id)
        res.json(ticket)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}


module.exports=ticketCltr