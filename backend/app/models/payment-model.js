const { required } = require('joi')
const mongoose=require('mongoose')
const paymentSchema=new mongoose.Schema({
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
    amount:{
        type:Number,
        required:true
    },
    platformFee:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['success','failed','pending'],
        required:true
    },
    paymentDate:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})
const Payment=mongoose.model('Payment',paymentSchema)
module.exports=Payment