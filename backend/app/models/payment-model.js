const mongoose=require('mongoose')
const paymentSchema=new mongoose.Schema({
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
    amount:{
        type:Number,
        require:true},
    platformFee:{
        type:Number,
        require:true},
    status:{
        type:String,
        enum:['success','failed','pending']
    },
    paymentDate:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})
const Payment=mongoose.model('Payment',paymentSchema)
module.exports=Payment