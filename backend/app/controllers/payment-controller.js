const Payment=require('../models/payment-model')
const {paymentValidationSchmea}=require('../validations/payment-validation')
// const paymentCltr={}
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


const razorpay = require("../../config/razorpay")
const crypto = require("crypto")
const paymentCltr={}
// CREATE ORDER
paymentCltr.createOrder = async (req, res) => {
  try {
    const { amount } = req.body // amount in rupees

    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      receipt: "event_booking_" + Date.now()
    })

    res.status(200).json(order)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// VERIFY PAYMENT
paymentCltr.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body

    const sign = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex")

    if (expectedSign === razorpay_signature) {
      return res.status(200).json({ success: true })
    } else {
      return res.status(400).json({ success: false })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}



module.exports=paymentCltr