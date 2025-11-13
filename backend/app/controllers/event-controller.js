const Event=require('../models/event-model')
const geolib=require('geolib')
const {eventValidationSchema}=require('../validations/event-validation')
const eventCltr={}
eventCltr.create=async(req,res)=>{
   const body=req.body;
   const {error,value}=eventValidationSchema.validate(body,{abortEarly:true})
   if(error){
    return res.status(400).json({error:error.details})
   }
   try{
    // //const event=await Event.create({...body,organiserId:req.userId})
    const eventInDb=await Event.findOne({title:value.title, organiserId:req.userId})
    if(eventInDb){
        return res.status(400).json({err:"Event already exists"})
    }
    // // if(event){
    // //     return res.status(400).json({err:"Event already exists"})
    // // }

    // const event=await Event(value)
    // event.organiserId=req.userId
    // await event.save()
    // res.status(200).json(event)

    const images = req.files.map((file) => file.path);
    const event=await Event({...value,
      organiserId: req.userId,   
      image: images})
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
    console.log('Fetching events from DB...');
    const events = await Event.find();
    console.log('Events found:', events);
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};



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
        const maxDistance=parseFloat(distance)
        const allEvents=await Event.find();
        const nearbyEvents=allEvents.filter(event=>{
            if(!event.location ||!event.location.coordinates) return false;
            const [eventLng,eventLat]=event.location.coordinates;
            const eventDistance=geolib.getDistance(
                userLocation,
                {latitude:eventLat,longitude:eventLng}
            )
            event._doc.distanceFromUser=eventDistance;
            return eventDistance<=maxDistance
        })
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