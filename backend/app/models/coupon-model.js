const mongoose=require('mongoose')
const couponSchema=new mongoose.Schema({
    code:{
        type:String,
        required:true
    },

    discount:{
        type:Number,
        required:true},
    expiry:{
        type:Date,
        required:true},
    organiserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    usedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",required:true
    }
})
const Coupon=mongoose.model('Coupon',couponSchema)
module.exports=Coupon