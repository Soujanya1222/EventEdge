const mongoose=require('mongoose')
const reviewSchema=new mongoose.Schema({
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
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        }
},{timestamps:true})
const Review=mongoose.model('Review',reviewSchema)
module.exports=Review