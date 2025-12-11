const User=require('../models/user-model')
const Event=require('../models/event-model')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {userRegisterValidatorSchema,userLoginValidatorSchema}=require('../validations/user-validation')
const adminCltr={}
const userCltr={}
userCltr.register=async(req,res)=>{
    const body=req.body;
    const {error,value}=userRegisterValidatorSchema.validate(body,{abortEarly:false})
    if(error){
        return res.status(400).json({error:error.details[0].message})
    }
    const userEmail=await User.findOne({email:value.email})
    if(userEmail){
        return res.status(400).json({error:"Email already taken"})
    }
    try{
        const user=new User(value)
        const salt=await bcryptjs.genSalt();
        const hash=await bcryptjs.hash(user.password,salt)
        user.password=hash;

        //admin check
        if(user.role==='admin'){
            const adminExist=await User.findOne({role:"admin"})
                if(adminExist){
                    return res.status(403).json({message:"Admin already exists"})
                }
            
        }
        
        await user.save();
        res.status(201).json(user)

    }catch(err){
        console.log(err)
        res.status(500).json("something went wrong")
    }

}


//Login 
userCltr.login=async(req,res)=>{
    const body=req.body;
    const {error,value}=userLoginValidatorSchema.validate(body,{abortEarly:false})
    if(error){
        return res.status(401).json({error:error.details[0].message})
    }
    try{
        const user=await User.findOne({email:value.email})
        if(!user){
            return res.status(401).json({error:"Invalid Email/Password"})
        }
        const isPasswordMatch=await bcryptjs.compare(value.password,user.password)
        if(!isPasswordMatch){
            return res.status(400).json({error:"Invalid Email/Password"})
        }
        const tokenData={userId:user._id,role:user.role}  //isApproved:user.isApproved
        console.log(tokenData)
        const token=jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:'50d'})
        res.json({token:token})
        //res.status(200).json(user)

    }catch(err){
        console.log(err.message)
        res.status(500).json({err:"something went wrong"})

    }

}

userCltr.checkAdmin = async (req, res) => {
    const admin = await User.findOne({ role: "admin" });
    res.json({ adminExists: !!admin });
};


//users Account

userCltr.account=async(req,res)=>{
    try{
        const user=await User.findById(req.userId)
        res.json(user)

    }catch(err){
        res.status(500).json({err:"something went wrong"})
    }
}

adminCltr.getAllUser=async(req,res)=>{
    try{
        const user=await User.find({role:"attendee"});
        res.json(user)
    }catch(err){
        console.log(err)
        res.status(500).json({err:"something went wrong"})
    }
}

adminCltr.getAllOragniser=async(req,res)=>{
    try{
        const user=await User.find({role:"organiser"})
          const result = await Promise.all(
            user.map(async (org) => {
                const events = await Event.find({ organiserId: org._id });

                const totalTicketsSold = events.reduce((sum, ev) => {
                    return sum + (ev.soldTickets || 0);
                }, 0);

                return {
                    _id: org._id,
                    name: org.name,
                    email: org.email,
                    eventsOrganised: events.length,
                    ticketsSold: totalTicketsSold
                };
            })
        );
        res.json(result)
    }catch(err){
        console.log(err)
        res.status(500).json({err:"something went wrong"})
    }
}

adminCltr.getAllEvents=async(req,res)=>{
    try{
        let events;
        if(req.role=="admin"){
            events=await Event.find().populate('organiserId',["name"]);
        }else if(req.role=="organiser"){
            events=await Event.find({organiserId:req.userId}).populate('organiserId',["name"])
        }else{
            return res.status(403).json({error:"Access denied"})
        }
        res.json(events)
    }catch(err){
        console.log(err)
        res.status(500).json({err:"something went wrong"})
    }
}

// adminCltr.approveOrganiser=async(req,res)=>{
//     const id=req.params.id
//     if(req.role!=='admin'){
//         return res.status(403).json({error:"Only admin can approve organiser"})
//     }
//     try{
//         const  user=await User.findById(id)
//         if(!user){
//             return res.status(404).json({err:"User not found"})
//         }
//         if(user.role!=="organiser"){
//             return res.status(400).json({err:"This user is not an organiser"})
//         }
//         user.isApproved=true;
//         await user.save()
//         res.json({message:"Organiser Aprroved ",user})
//     }catch(err){
//         console.log(err)
//          res.status(500).json({err:"something went wrong"})
//     }
// }


adminCltr.changeRole=async(req,res)=>{
    const id = req.params.id;
  const { role } = req.body;
    try{
        if(!['organiser','attendee'].includes(role)){
            return res.status(400).json({err:"Invalid Role"})
        }
        const user=await User.findByIdAndUpdate(id,{role},{new:true})
         if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
        res.json({message:"Role Updated",user})
    }catch(err){
        console.log(err)
         res.status(500).json({err:"something went wrong"})
    }   
}



adminCltr.deleteUser=async(req,res)=>{
    const id=req.params.id
    try{
        const user=await User.findByIdAndDelete(id)
        if(!user){
            return res.status(404).json({err:"User not found"})
        }
        if(user.role==='organiser'){
            await Event.deleteMany({organiserId:user._id})
        }
        res.json({message:"User and related events deleted successfully",user})
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}

adminCltr.accountUpdate=async(req,res)=>{
    const id=req.params.id
    const body=req.body
    
    try{
        const user=await User.findByIdAndUpdate(id,body,{new:true})
        const salt=await bcryptjs.genSalt();
        const hash=await bcryptjs.hash(user.password,salt)
        user.password=hash;
          
        await user.save();
        res.status(201).json(user)

    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})

    }
}


module.exports={adminCltr,userCltr}