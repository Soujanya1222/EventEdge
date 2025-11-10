const Ticket=require('../models/ticket-model')
const ticketCltr={}
ticketCltr.create=async(req,res)=>{
    const body=req.body
    try{
        const ticket=await Ticket.create(body)
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
        res.status(500).json(err)
    }
}

ticketCltr.update=async(req,res)=>{
    const id=req.params.id
    const body=req.body
    try{
        const ticket=await Ticket.findByIdAndUpdate(id,body,{new:true})
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