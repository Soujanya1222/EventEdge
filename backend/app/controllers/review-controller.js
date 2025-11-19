const Review=require('../models/review-model')
const Event =require('../models/event-model')
const reviewCltr={}
reviewCltr.create=async(req,res)=>{
    const body=req.body;
    try{
        body.attendeeId=req.userId;
        const event=await Event.findById(body.eventId)
        if(!event){
            return res.status(404).json({err:"Record not found"})
        }
        const reviewOnce=await Review.findOne({attendeeId:req.userId,eventId:body.eventId})
        if(reviewOnce){
            return res.status(400).json({error:"You are already reviewed this event"})
        }
        const review=(await Review.create(body))
        //await updateEventRating(body.eventId)
        const populated = await Review.findById(review._id).populate("eventId",["title"]).populate("attendeeId",["name"]);
        res.json(populated);
        
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}

reviewCltr.list=async(req,res)=>{
    try{
        const review=await Review.find().populate("eventId",['_id',"title"])
        res.json(review)
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}

reviewCltr.getOne=async(req,res)=>{
    const id=req.params.id
    try{
        const review=await Review.findById(id)
        res.json(review)
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}
reviewCltr.update=async(req,res)=>{
    const id=req.params.id
    const body=req.body
    try{
        const event=await Event.findById(body.eventId)
        if(!event){
            return res.status(404).json({error:"Record not found"})
        }
        const review=await Review.findByIdAndUpdate(id,body,{new:true}).populate('eventId',["_id","title"])
        if(!review){
            return res.status(400).json({error:"Invalid Review Id"})
        }
        res.json(review)
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}

reviewCltr.remove=async(req,res)=>{
    const id=req.params.id
    try{
         const event=await Event.findById(body.eventId)
        if(!event){
            return res.status(404).json({error:"Record not found"})
        }
        const review=await Review.findByIdAndDelete(id)
         if(!review){
            return res.status(400).json({error:"Invalid Review Id"})
        }
        res.json(review)
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}




// async function updateEventRating(eventId) {
//   const reviews = await Review.find({ eventId });

//   if (reviews.length === 0) {
//     await Event.findByIdAndUpdate(eventId, {
//       rating: 0,
//       totalReviews: 0
//     });
//     return;
//   }

//   const avgRating =
//     reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

//   await Event.findByIdAndUpdate(eventId, {
//     rating: avgRating.toFixed(1),
//     totalReviews: reviews.length
//   });
// }


module.exports=reviewCltr