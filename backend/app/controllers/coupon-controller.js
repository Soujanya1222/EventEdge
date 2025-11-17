const Coupon=require('../models/coupon-model')
const Event=require('../models/event-model')
const {couponValidationSchema}=require('../validations/coupon-validation')
const couponCltr={}

couponCltr.create=async(req,res)=>{
    const body=req.body;
    const {error,value}=couponValidationSchema.validate(body,{abortEarly:true})
    if(error){
        return res.status(400).json({error:error.message})
    }
    try{
        const couponExist=await Coupon.findOne({code:value.code,organiserId:req.userId})
        if(couponExist){
            return res.status(400).json({err:"already exists"})
        }
        const coupon=new Coupon(value)
        await coupon.save();
        res.json(coupon)
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}

//only for organiser 
couponCltr.list=async(req,res)=>{
    try{
        const coupon=await Coupon.find().populate('organiserId',['_id','name']).populate('EventId',['_id','title'])
        res.json(coupon)
    }catch(err){
         console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}


couponCltr.applyCoupon=async(req,res)=>{
    try{
        const {code,eventId}=req.body;
        if(!coupon){
            return res.status(404).json({err:"Invalid coupon"})
        }
        if(new Date()>coupon.expiry){
            return res.status(400).json({err:"coupon expired"})
        }
        if(coupon.usedBy.includes(req.userId)){
            return res.status(400).json({err:"You already used this coupon"})
        }
        res.json({
            discount:coupon.discount,
            couponId:coupon._id
        })

    }catch(err){
          console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}

couponCltr.getOne=async(req,res)=>{
    const id=req.params.id
    try{
        const coupon=await Coupon.findById(id)
        res.json(coupon)
    }catch(err){
        console.log(err);
        res.status(500).json({err:"Something went wrong"})
    }
}



couponCltr.markUsed=async(userId,couponId)=>{
    await Coupon.findByIdAndUpdate(couponId,
        {$push:{usedBy:userId}
    })
}

couponCltr.update=async(req,res)=>{
    const id=req.params.id
    const body=req.body
    const {error,value}=couponValidationSchema.validate(body,{abortEarly:true})
    if(error){
        return res.status(400).json({error:error.details})
    }
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ err: "Invalid coupon ID" })
    }
    try{
        const coupon=await Coupon.findByIdAndUpdate({_id:id,organiserId:req.userId},value,{new:true})
        res.json(coupon)
     }catch(err){
       console.log(err)
        res.status(500).json({err:"Something went wrong"})
  }
}

couponCltr.remove=async(req,res)=>{
    const id=req.params.id
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ err: "Invalid coupon ID" })
    }
    try{
        const coupon=await Coupon.findByIdAndDelete({_id:id,organiserId:req.userId})
        res.json(coupon)
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}
module.exports=couponCltr

