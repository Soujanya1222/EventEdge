const mongoose=require('mongoose')
const ticketSchema=new mongoose.Schema({
    attendeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
        require:true
    },
    paymentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Payment",
        require:true
    },
    qrCode:{
        type:String,
        require:true},
    bookedAt:{
        type:Date,
        default:Date.now,
        require:true
    }
},{timestamps:true})
const Ticket=mongoose.model('Ticket',ticketSchema)
module.exports=Ticket