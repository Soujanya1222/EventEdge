const Event=require('../models/event-model')
const geolib=require('geolib')
const {eventValidationSchema}=require('../validations/event-validation')
const eventCltr={}
const {deleteOldImages}=require('../middlewares/cloudinary')

eventCltr.create=async(req,res)=>{

   const body={
      ...req.body,
      location: req.body.location ? JSON.parse(req.body.location) : undefined
    };
   const {error,value}=eventValidationSchema.validate(body,{abortEarly:true})
   if(error){
    return res.status(400).json({error:error.details[0].message})
   }
   try{
    const eventInDb=await Event.findOne({title:value.title, organiserId:req.userId})
    if(eventInDb){
        return res.status(400).json({err:"Event already exists"})
    }

    const images = req.files.map((file) => file.path);
    const event=await Event({...value,
      organiserId: req.userId,   
      image: images
    })
      await event.save();
      res.status(201).json({
      message: "Event created successfully",
      event,
    });
   }catch(err){
    console.log(err)
    res.status(500).json({err:"Something went wrong"})
   }
}

eventCltr.list = async (req, res) => {
  try {
    const events = await Event.find({status:"approved"}) .select("title  description image venue price location status")
    // console.log('Events found:', events);
    res.json(events);
  } catch (err) {
    console.log('Error fetching events:', err);
    res.status(500).json({ err: 'Something went wrong' });
  }
}


eventCltr.getOne=async(req,res)=>{   
  const eventId=req.params.id;
  const userId=req.userId;
  try{
    const event=await Event.findById(eventId);
    if(!event){
      return res.status(404).json({error:"Event does not exist"})
    }
    if(req.role==="admin"){
      return res.status(200).json(event)
    }
    if(req.role==="organiser"){
      if(event.organiserId.toString()!==userId){
        return res.status(403).json({error:"Access denied. Its not your event"})
      }
      return res.status(200).json(event)
    }
    
    if(req.role==="attendee"){
      if(event.status!=="approved"){
        return res.status(403).json({error:"event not approved yet"})
      }
      return res.status(200).json(event)
    }

  }catch(err){
    console.log(err);
    res.status(500).json({err:"Something went wrong"})
  }
}

eventCltr.update=async(req,res)=>{
    const id=req.params.id
     const body = {
    ...req.body,
    location: req.body.location ? JSON.parse(req.body.location) : undefined
  };
    const {error,value}=eventValidationSchema.validate(body,{abortEarly:true})
    if(error){
        return res.status(400).json({error:error.details})
    }
    try{
      const event=await Event.findById(id)
       if(!event){
        return res.status(404).json({error:"Event not found"})
      }
      if (event.organiserId.toString() !== req.userId) {
      return res.status(403).json({ error: "You are not allowed to update this event" });
    }
      let updateData={...value}
      if(req.files && req.files.length>0){
        if(event.image&&event.image.length>0){
          await deleteOldImages(event.image);
        }
        const newImages=req.files.map((file)=>file.path);
        updateData.image=newImages;
      }
      const updated=await Event.findByIdAndUpdate(id,updateData,{new:true,runValidators:true})
      res.json(updated)
    }catch(err){
      console.log(err)
      res.status(500).json({err:"Something went wrong"})
    }
}

eventCltr.remove=async(req,res)=>{
     const eventId = req.params.id;
      if (req.role !== "admin") {
        return res.status(403).json({ error: "Only admin can delete events" });
    }
    try{
        const event=await Event.findById(eventId)
        if(!event){
            return res.status(404).json({error:"Event Not Found"})
        }
         if (req.role === "admin") {
            await event.deleteOne();
            return res.json({ message: "Event deleted by admin" });
        }
        if (event.organiserId.toString() !== req.userId) {
         return res.status(403).json({ error: "You are not allowed to Delete this event" });
        }
        await Event.findByIdAndDelete(eventId);
        res.json({message:"Event deleted succefully"},event)
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}

eventCltr.nearby=async (req, res) => {
    try{
        const { latitude, longitude, distance } = req.query;

        if (!latitude || !longitude || !distance) {
            return res.status(400).json({ error: "Please provide latitude, longitude, and distance parameters." });
        }
      const userLocation={
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      }
        const maxDistance=parseFloat(distance)*1000
        const allEvents=await Event.find();
        const nearbyEvents=allEvents.filter(event=>{
            if(!event.location ||!event.location.coordinates) return false;
            const [eventLng,eventLat]=event.location.coordinates;
            const eventDistance=geolib.getDistance(
                userLocation,
                {latitude:eventLat,longitude:eventLng}
            )
            event._doc.distanceFromUser=eventDistance;
            if (eventDistance>maxDistance) return null;
            return {
              ...event._doc,
              getDistanceFromUser:eventDistance,
              googleMapsUrl: `https://www.google.com/maps?q=${eventLat},${eventLng}`,
              directionUrl: `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${eventLat},${eventLng}`
            }
        }).filter(Boolean);


        res.json({
            userLocation,
            count:nearbyEvents.length,
            events:nearbyEvents
        })
        
    }catch(err){
        console.log(err)
        res.status(500).json({ err: "Something went wrong" });
    }
}

eventCltr.approve=async(req,res)=>{
  const id=req.params.id;
  try{
    const event=await Event.findByIdAndUpdate(id,{status:"approved"},{new:true})
    if(!event){
      return res.status(404).json({error:"Record not Found"})
    }
    res.json({message:"Event approved",event})
  }catch(err){
    console.log(err)
    res.status(500).json({error:"Something went wrong"})
  }
}

eventCltr.reject=async(req,res)=>{
  const id=req.params.id;
  try{
    const event=await Event.findByIdAndUpdate(id,{status:"rejected"},{new:true})
    if(!event){
      return res.status(404).json({error:"Record not Found"})
    }
    res.json({message:"Event rejected",event})

  }catch(err){
    console.log(err)
    res.status(500).json({err:"Something went wrong"})
  }
}


module.exports=eventCltr




