const { required } = require('joi');
const mongoose=require('mongoose')
const EventSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true},
    description:{
        type:String,
        require:true},
    category:
    {type:String,
        require:true},
    datetime:{
        type:Date,
        require:true
    },
    venue:{
        type:String,
        require:true
    },
    location: {
        type: {                     
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
         }
    },
    organiserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    price:{
        type:Number,require:true},
    totalTickets:{type:Number,require:true},
    soldTickets:{type:Number,require:true},
    image: {
        type: [String],
        required: true,
},
},{timestamps:true})
EventSchema.index({ location: "2dsphere" }); // Create geospatial index on location field
const Event=mongoose.model("Event",EventSchema)
module.exports=Event


/* "location": {
  "type": "Point",
  "coordinates": [-74.0060, 40.7128]  // [longitude, latitude]
}*/