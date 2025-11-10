const mongoose=require('mongoose')
const reviewSchema=new mongoose.Schema({
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
    rating:{
        type:Number,
        require:true},
    comment:{
        type:String,
        }
},{timestamps:true})
const Review=mongoose.model('Review',reviewSchema)
module.exports=Review