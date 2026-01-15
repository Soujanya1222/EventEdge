const Coupon=require('../models/coupon-model')
const Event=require('../models/event-model')
const {couponValidationSchema}=require('../validations/coupon-validation')
const couponCltr={}

//organiser to create a coupon
couponCltr.create=async(req,res)=>{
    const body=req.body;
    const {error,value}=couponValidationSchema.validate(body,{abortEarly:true})
    if(error){
        return res.status(400).json({error:error.message})
    }
    try{
        const coupon=new Coupon({...value,organiserId:req.userId})
        const couponExist=await Coupon.findOne({code:value.code,organiserId:req.userId})
        if(couponExist){
            return res.status(400).json({error:"Coupon already exists"})
        }
          const event = await Event.findById(value.eventId);
            if (!event) {
            return res.status(404).json({ err: "Event not found" });
        }
             if (event.organiserId.toString() !== req.userId) {
            return res.status(403).json({ err: "You cannot create coupon for another organiser event" });
        }
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
        const coupon=await Coupon.find().populate('organiserId',['_id','name']).populate('eventId',['_id','title'])
        res.json(coupon)
    }catch(err){
         console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}

//Attendee can use the coupon
couponCltr.applyCoupon = async (req, res) => {
    const { code, eventId } = req.body;

    try {
        const coupon = await Coupon.findOne({ code });

        if (!coupon) {
            return res.status(400).json({ error: "Invalid coupon" });
        }

        if (new Date() > coupon.expiry) {
            return res.status(400).json({ error: "Coupon expired" });
        }

        if (coupon.eventId.toString() !== eventId) {
            return res.status(400).json({ error: "Coupon not valid for this event" });
        }

        if (coupon.usedBy.includes(req.userId)) {
            return res.status(400).json({ error: "Coupon already used" });
        }

        res.json({
            message: "Coupon applied",
            discount: coupon.discount,
            couponId: coupon._id
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Something went wrong" });
    }
};




couponCltr.update=async(req,res)=>{
    const id=req.params.id
    const body=req.body
    const {error,value}=couponValidationSchema.validate(body,{abortEarly:true})
    if(error){
        return res.status(400).json({error:error.details})
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
        if (!mongoose.isValidObjectId(id)) {
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

couponCltr.markUsed = async (attendeeId, couponId) => {
  const coupon = await Coupon.findById(couponId);

  if (!coupon) {
    throw new Error("Coupon not found");
  }

  // prevent reuse by same attendee
  if (coupon.usedBy.includes(attendeeId)) {
    throw new Error("Coupon already used");
  }

  coupon.usedBy.push(attendeeId);
  coupon.isUsed = true;

  await coupon.save();
};


module.exports=couponCltr

