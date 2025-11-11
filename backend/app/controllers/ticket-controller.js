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

ticketCltr.bookTicket = async (req, res) => {
  try {
    const { eventId, couponCode } = req.body
    const attendeeId = req.userId

    // 1️⃣ Validate event
    const event = await Event.findById(eventId)
    if (!event) return res.status(404).json({ error: 'Event not found' })

    // 2️⃣ Calculate base price
    let finalAmount = event.price
    let appliedCoupon = null

    // 3️⃣ Check and apply coupon (if any)
    if (couponCode) {
      appliedCoupon = await Coupon.findOne({ code: couponCode, organiserId: event.organiserId })
      if (!appliedCoupon) return res.status(400).json({ error: 'Invalid coupon' })

      if (appliedCoupon.expiry < new Date()) return res.status(400).json({ error: 'Coupon expired' })

      if (appliedCoupon.usedBy.includes(attendeeId)) {
        return res.status(400).json({ error: 'Coupon already used by this user' })
      }

      // apply discount
      finalAmount = finalAmount - (event.price * (appliedCoupon.discount / 100))
    }

    // 4️⃣ Create Payment record
    const platformFee = finalAmount * 0.1 // example 10% fee
    const payment = new Payment({
      attendeeId,
      eventId,
      amount: finalAmount,
      platformFee,
      status: 'success', // later link to Stripe
      paymentDate: new Date()
    })
    await payment.save()

    // 5️⃣ Generate QR code for ticket
    const qrData = `${attendeeId}-${eventId}-${payment._id}`
    const qrCode = await QRCode.toDataURL(qrData)

    // 6️⃣ Create ticket
    const ticket = new Ticket({
      attendeeId,
      eventId,
      qrCode,
      bookedAt: new Date()
    })
    await ticket.save()

    // 7️⃣ Mark coupon as used
    if (appliedCoupon) {
      appliedCoupon.usedBy.push(attendeeId)
      await appliedCoupon.save()
    }

    // 8️⃣ Update event ticket count
    event.soldTickets += 1
    await event.save()

    // 9️⃣ Send response
    res.status(201).json({
      message: 'Ticket booked successfully',
      ticket,
      payment,
      appliedCoupon: appliedCoupon ? appliedCoupon.code : null
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

module.exports=ticketCltr