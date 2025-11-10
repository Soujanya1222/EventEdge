const Event=require('../models/event-model')
const {eventValidationSchema}=require('../validations/event-validation')
const eventCltr={}
eventCltr.create=async(req,res)=>{
   const body=req.body
   const {error,value}=eventValidationSchema.validate(body,{abortEarly:true})
   if(error){
    return res.status(400).json({error:error.details})
   }
   try{
    //const event=await Event.create({...body,organiserId:req.userId})
    const eventInDb=await Event.findOne({title:value.title, organiserId:req.userId})
    if(eventInDb){
        return res.status(400).json({err:"Event already exists"})
    }
    // if(event){
    //     return res.status(400).json({err:"Event already exists"})
    // }

    const event=await Event(value)
    event.organiserId=req.userId
    await event.save()
    res.status(200).json(event)
   }catch(err){
    console.log(err)
    res.status(500).json({err:"Something went wrong"})
   }
}
eventCltr.list=async(req,res)=>{
    try{
        const event=await Event.find({organiserId:req.userId}).populate('organiserId',['_id',"name"])
        res.json(event)
    }catch(err){
      console.log(err)
      res.status(500).json({err:"Something went wrong"})
    }
}

eventCltr.update=async(req,res)=>{
    const id=req.params.id
    const body=req.body
    const {error,value}=eventValidationSchema.validate(body,{abortEarly:true})
    if(error){
        return res.status(400).json({error:error.details})
    }
    try{
        const event=await Event.findByIdAndUpdate({_id:id,organiserId:req.userId},value,{new:true})
         if(!event){
            return res.status(404).json({error:"Record Not Found"})
        }
        res.json(event)
    }catch(err){
      console.log(err)
      res.status(500).json({err:"Something went wrong"})
    }
}

eventCltr.remove=async(req,res)=>{
    const id=req.params.id
    try{
        const event=await Event.findByIdAndDelete({_id:id,organiserId:req.userId})
        if(!event){
            return res.status(404).json({error:"Event Not Found"})
        }
        res.json(event)
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}
module.exports=eventCltr