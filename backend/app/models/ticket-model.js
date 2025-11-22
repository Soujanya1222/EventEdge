const mongoose=require('mongoose')
const ticketSchema=new mongoose.Schema({
    attendeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
        required:true
    },
    paymentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Payment",
        required:true
    },
    qrCode:{
        type:String,
    },
    bookedAt:{
        type:Date,
        default:Date.now,
        required:true
    },
    checkedIn:{
        type:Boolean,
        default:false
    }
},{timestamps:true})
const Ticket=mongoose.model('Ticket',ticketSchema)
module.exports=Ticket