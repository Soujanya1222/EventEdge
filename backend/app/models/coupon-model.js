const mongoose=require('mongoose')
const couponSchema=new mongoose.Schema({
    code:{
        type:String,
        require:true
    },

    discount:{
        type:Number,
        require:true},
    expiry:{
        type:Date,
        require:true},
    organiserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    usedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    }],
    EventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",require:true
    }
})
const Coupon=mongoose.model('Coupon',couponSchema)
module.exports=Coupon