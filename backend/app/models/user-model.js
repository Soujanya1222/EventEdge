const mongoose=require('mongoose');
const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{ type:String,
        require:true,
        unique:true,
        required:true
    },
    password:{ type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","organiser","attendee"],
        default:"attendee"
    },
    isApproved: {
         type: Boolean, 
         default: false
         }
},{timestamps:true})
const User=mongoose.model('User',UserSchema)
module.exports=User