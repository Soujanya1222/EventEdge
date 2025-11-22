const Event=require('../models/event-model')
const geolib=require('geolib')
const {eventValidationSchema}=require('../validations/event-validation')
const eventCltr={}
const {deleteOldImages}=require('../middlewares/cloudinary')



eventCltr.create=async(req,res)=>{
   const body=req.body;
   const {error,value}=eventValidationSchema.validate(body,{abortEarly:true})
   if(error){
    return res.status(400).json({error:error.details})
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
    const events = await Event.find();
    // console.log('Events found:', events);
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};


eventCltr.getOne=async(req,res)=>{
  const id=req.params.id;
  try{
    const events=await Event.findById(id);
    res.status(200).json(events);
  }catch(err){
    console.log(err);
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
      const event=await Event.findById(id)
       if(!event){
        return res.status(404).json({error:"Event not found"})
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

module.exports=eventCltr