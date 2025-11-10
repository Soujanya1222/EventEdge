const Payment=require('../models/payment-model')
const paymentCltr={}
paymentCltr.create=async(req,res)=>{
   const body=req.body
   try{
    const payment=await Payment.create(body)
    res.json(payment)
   }catch(err){
    console.log(err)
    res.status(500).json({err:"Something Went wrong"})
   }
}

paymentCltr.list=async(req,res)=>{
    try{
        const payment=await Payment.find()
        res.json(payment)

    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}

paymentCltr.update=async(req,res)=>{
    const id=req.params.id
    const body=req.body
    try{
        const payment=await Payment.findByIdAndUpdate(id,body,{new:true})
        res.json(payment)

    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}


paymentCltr.remove=async(req,res)=>{
    const id=req.params.id
    
    try{
        const payment=await Payment.findByIdAndDelete(id)
        res.json(payment)

    }catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
}


module.exports=paymentCltr