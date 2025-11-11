const Coupon=require('../models/coupon-model')
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
couponCltr.list=async(req,res)=>{
    try{
        const coupon=await Coupon.find().populate('organiserId',['_id','name']).populate('EventId',['_id','title'])
        res.json(coupon)
    }catch(err){
         console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
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

