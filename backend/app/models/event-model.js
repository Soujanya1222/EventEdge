const { required } = require('joi');
const mongoose=require('mongoose')
const EventSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:
    {type:String,
        required:true
    },
    datetime:{
        type:Date,
        required:true
    },
    venue:{
        type:String,
        required:true
    },
    location: {
        type: {                     
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            index:'2dsphere'  //[lng,lat]
         }
    },
    organiserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    price:{
        type:Number,required:true
    },
    totalTickets:{
        type:Number,
        required:true

    },
    soldTickets:{
        type:Number,
        required:true
    },
    image: {
        type: [String],
        required: true,
},
},{timestamps:true})
EventSchema.index({ location: "2dsphere" }); 
const Event=mongoose.model("Event",EventSchema)
module.exports=Event
