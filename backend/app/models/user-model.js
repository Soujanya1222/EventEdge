const mongoose=require('mongoose');
const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{ type:String,
        require:true,
        unique:true,
        require:true
    },
    password:{ type:String,
        require:true},
    role:{
        type:String,
        enum:["admin","organiser","attendee"],
        default:"attendee"
    },
    isApproved: {
         type: Boolean, 
         default: false }
},{timestamps:true})
const User=mongoose.model('User',UserSchema)
module.exports=User