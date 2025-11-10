const Review=require('../models/review-model')
const reviewCltr={}
reviewCltr.create=async(req,res)=>{
    const body=req.body
    try{
        const review=await Review.create(body)
        res.json(review)
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}

reviewCltr.list=async(req,res)=>{
    try{
        const review=await Review.find()
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
        const review=await Review.findByIdAndUpdate(id,body,{new:true})
        res.json(review)
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}

reviewCltr.remove=async(req,res)=>{
    const id=req.params.id
    try{
        const review=await Review.findByIdAndDelete(id)
        res.json(review)
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}

module.exports=reviewCltr