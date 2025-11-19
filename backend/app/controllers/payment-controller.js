const Payment=require('../models/payment-model')
const {paymentValidationSchmea}=require('../validations/payment-validation')
const paymentCltr={}
// paymentCltr.create=async(req,res)=>{
//    const body=req.body
//    const {error,value}=paymentValidationSchmea.validate(body,{abortEarly:true})
//    if(error){
//         return res.status(400).json({error:error.details})
//     }
//    try{
//     const payment=new Payment(value)
//     await payment.save()
//     res.json(payment)
//    }catch(err){
//     console.log(err)
//     res.status(500).json({err:"Something Went wrong"})
//    }
// }

// paymentCltr.list=async(req,res)=>{
//     try{
//         const payment=await Payment.find()
//         res.json(payment)

//     }catch(err){
//         console.log(err)
//         res.status(500).json({err:"Something went wrong"})
//     }
// }

// paymentCltr.getOne=async(req,res)=>{
//     const id=req.params.id
//     try{
//         const payment=await Payment.findById(id)
//         res.json(payment)
//     }catch(err){
//         console.log(err)
//         res.status(500).json({err:"Something went wrong"})
//     }
// }

// paymentCltr.update=async(req,res)=>{
//     const id=req.params.id
//     const body=req.body
//     const {error,value}=paymentValidationSchmea.validate(body,{abortEarly:true})
//     if(error){
//         return res.status(400).json({error:error.details})
//     }
//     try{
//         const payment=await Payment.findByIdAndUpdate({_id:id},value,{new:true})
//         res.json(payment)

//     }catch(err){
//         console.log(err)
//         res.status(500).json({err:"Something went wrong"})
//     }
// }


// paymentCltr.remove=async(req,res)=>{
//     const id=req.params.id
//     try{
//         const payment=await Payment.findByIdAndDelete(id)
//         res.json(payment)

//     }catch(err){
//         console.log(err)
//         res.status(500).json({err:"Something went wrong"})
//     }
// }





module.exports=paymentCltr