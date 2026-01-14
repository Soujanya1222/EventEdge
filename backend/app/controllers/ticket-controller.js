const Ticket=require('../models/ticket-model')
const Payment = require('../models/payment-model')
const Coupon = require('../models/coupon-model')
const Event = require('../models/event-model')
const QRCode = require('qrcode')
const mongoose=require('mongoose')

const{ticketValidationSchema}=require('../validations/ticket-validation')
const ticketCltr={}

ticketCltr.book = async (req, res) => {
  const body = req.body
  const { error, value } = ticketValidationSchema.validate(body, { abortEarly: true })
  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const attendeeId = req.userId

    const event = await Event.findById(value.eventId)
    if (!event) {
      return res.status(404).json({ error: "Event not found" })
    }
    if (event.soldTickets >= event.totalTickets) {
      return res.status(400).json({ error: "Tickets sold out" })
    }



    const existing = await Ticket.findOne({ attendeeId, eventId: value.eventId })
    if (existing) {
      return res.status(400).json({ error: "Ticket already booked" })
    }

    const paymentId = value.paymentId || body.paymentId
    const payment = await Payment.findById(paymentId)
    if (!payment || payment.status !== "success") {
      return res.status(400).json({ error: "Payment not verified" })
    }

    const qrData = `USER:${attendeeId}|EVENT:${value.eventId}`
    const qrImage = await QRCode.toDataURL(qrData)

    const ticket = await Ticket.create({
      attendeeId,
      eventId: value.eventId,
      paymentId,
      qrCode: qrImage
    })

    event.soldTickets += 1
    await event.save()

    res.status(201).json({
      message: "Ticket booked Successfully",
      ticket
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: "Something went wrong" })
  }
}

ticketCltr.myTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ attendeeId: req.userId })
      .populate("eventId", ["title", "datetime"])
      .populate("attendeeId",["name","email"])

    res.json(tickets)
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" })
  }
}


ticketCltr.totalTickets = async (req, res) => {
  try {
    const organiserId = req.userId;

   
    const events = await Event.find({ organiserId }).select("_id");

    if (events.length === 0) {
      return res.json({ total: 0 });
    }

    const eventIds = events.map(e => e._id);

 
    const total = await Ticket.countDocuments({
      eventId: { $in: eventIds }
    });

    res.json({ total });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};


ticketCltr.cancel = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id, attendeeId: req.userId })

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" })
    }

    const event = await Event.findById(ticket.eventId)

    if (event) {
      event.soldTickets = Math.max(0,event.soldTickets-1)
      await event.save()
    }

    await ticket.deleteOne()
    res.json({ message: "Ticket cancelled successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Something went wrong" })
  }
};



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
            return res.status(400).json({status:"invalid",message:"Invalid QR format"})
        }
        const ticket=await Ticket.findOne({
            attendeeId:userId,
            eventId:eventId
        })
        if(!ticket){
            return res.status(404).json({status:"invalid",message:"Ticket not found"})
        }
        if(ticket.checkedIn){
            return res.status(400).json({ status: "expired",message: "Ticket already used for entry"})
        }
        ticket.checkedIn=true;
        ticket.status="completed";
        await ticket.save();
        return res.json({
          status:"success",
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
        const organiserId = req.userId

        if(req.role!=="organiser"){
            return res.status(403).json({error: "Only organisers can access organiser bookings" });
        }
          if (!mongoose.Types.ObjectId.isValid(organiserId)) {
            return res.status(400).json({
                error: "Invalid organiser ID format"
            });
        }

         if (req.userId !== organiserId) {
            return res.status(403).json({
                error: "The organiser token does not match this organiser. You cannot access another organiser’s data."
            });
        }
        const events = await Event.find({ organiserId }).select("_id");
         if (events.length === 0) {
            return res.status(404).json({
                error: "No events found for this organiser"
            });
        }
        const organiserEvents=await Event.find({organiserId}).select("_id")
        const eventIds=organiserEvents.map(event=>event._id);
        const booking=await Ticket.find({eventId:{$in:eventIds}}).populate("attendeeId","name email").populate("eventId","title date")
        res.json(booking)
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"});
    }
}

ticketCltr.ticketsPerEvent = async (req, res) => {
  try {
    if (req.role !== "organiser") {
      return res.status(403).json({ error: "Access denied" });
    }

    const organiserId = req.userId;

    const events = await Event.find({ organiserId }).select("title soldTickets");

    const result = events.map(event => ({
      eventId: event._id,
      title: event.title,
      ticketsSold: event.soldTickets
    }));

    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};



module.exports=ticketCltr




