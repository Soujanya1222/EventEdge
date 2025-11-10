const Coupon=require('../models/coupon-model')
const couponCltr={}
couponCltr.create=async(req,res)=>{
    const body=req.body;
    try{
        const coupon=await Coupon.create(body)
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
  try{
   const coupon=await Coupon.findByIdAndUpdate(id,body,{new:true})
    res.json(coupon)
  }catch(err){
       console.log(err)
        res.status(500).json({err:"Something went wrong"})
  }
}

couponCltr.remove=async(req,res)=>{
    const id=req.params.id
    try{
        const coupon=await Coupon.findByIdAndDelete(id)
        res.json(coupon)
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}
module.exports=couponCltr