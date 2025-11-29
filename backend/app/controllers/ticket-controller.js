const Ticket=require('../models/ticket-model')
const Payment = require('../models/payment-model')
const Coupon = require('../models/coupon-model')
const Event = require('../models/event-model')
const QRCode = require('qrcode')
const mongoose=require('mongoose')

const{ticketValidationSchema}=require('../validations/ticket-validation')
const ticketCltr={}

ticketCltr.book=async(req,res)=>{
    const body=req.body
    const {error,value}=ticketValidationSchema.validate(body,{abortEarly:true})
    if(error){
        return res.status(400).json({error:error.details[0].message})
    }
    try{
       const attendeeId=req.userId;
        const event=await Event.findById(value.eventId);
        if(!event){
            return res.status(404).json({error:"Event not found"})
        }
       const existing=await Ticket.findOne({
        attendeeId,
        eventId:value.eventId
       })
       if(existing){
        return res.status(400).json({error:"Ticket already booked"})
       }
       const qrData=`USER:${attendeeId}|EVENT:${value.eventId}`
       const qrImage=await QRCode.toDataURL(qrData)

       const ticket=await Ticket.create({
        attendeeId,
        eventId:value.eventId,
        paymentId:value.paymentId,
        qrCode:qrImage
       })

       res.status(201).json({
        message:"Ticket booked Successfully",
        ticket
       })
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}

ticketCltr.list=async(req,res)=>{
    try{
        const ticket=await Ticket.find().populate("eventId",["title"]).populate("attendeeId",["name"])
        res.status(201).json(ticket)
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}

ticketCltr.cancel=async(req,res)=>{
    try{
        const ticketId=req.params.id;
        const attendeeId=req.userId;
        const ticket=await Ticket.findOne({_id:ticketId,attendeeId})
        if(!ticket){
            return res.status(404).json({error:"Ticket not found"})
        }
        await Ticket.deleteOne({_id:ticketId})
        res.json({message:"Ticket cancelled Successfully"})
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}


ticketCltr.verifyQR=async(req,res)=>{
    const{qrData}=req.body
    try{
        const parts=qrData.split("|")
        let userId,eventId;
        parts.forEach(part => {
            const [key,val]=part.split(":");
            if(key==="USER") userId=val;
            if(key==="EVENT") eventId=val;
        });
        if(!userId||!eventId){
            return res.status(400).json({error:"invalid QR format"})
        }
        const ticket=await Ticket.findOne({
            attendeeId:userId,
            eventId:eventId
        })
        if(!ticket){
            return res.status(404).json({error:"Ticket not found"})
        }
        if(ticket.checkedIn){
            return res.status(400).json({error:"Ticket already used for entry"})
        }
        ticket.checkedIn=true;
        await ticket.save();
        return res.json({
            message:"Ticket verified successfully",
            ticket
        })

    }catch(err){
        console.log(err)
        res.status(500).json({error:"Something went wrong"})
    }
}


ticketCltr.bookedUsers=async(req,res)=>{
    try{
        if(req.role!=="organiser"){
            return res.status(403).json({error: "Only organisers can access organiser bookings" });
        }
         const organiserId = req.params.organiserId;
          if (!mongoose.Types.ObjectId.isValid(organiserId)) {
            return res.status(400).json({
                error: "Invalid organiser ID format"
            });
        }

         if (req._id !== organiserId) {
            return res.status(403).json({
                error: "The organiser token does not match this organiser. You cannot access another organiser’s data."
            });
        }
        const events = await Event.find({ organiserId });
         if (events.length === 0) {
            return res.status(404).json({
                error: "No events found for this organiser"
            });
        }
        const organiserEvents=await Event.find({organiserId:req.params.organiserId}).select("_id")
        const eventIds=organiserEvents.map(event=>event._id);
        const booking=await Ticket.find({eventId:{$in:eventIds}}).populate("attendeeId","name email").populate("eventId","title date")
        res.json(booking)
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"});
    }
}


module.exports=ticketCltr




//check payment
//   const payment = await Payment.findById(body.paymentId)
//         if (!payment || payment.status !== "success") {
//             return res.status(400).json({ error: "Payment not verified" })
//         }