const razorpay=require("../razorpay/razorpay")
const crypto=require("crypto")
const Payment=require("../models/payment-model")
const couponCltr=require("./coupon-controller")
const paymentCltr={}

paymentCltr.createOrder=async (req, res) => {
  try {
    const { amount, eventId } = req.body;
    const shortEventId = eventId.toString().slice(-6);
    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: `event_${shortEventId}_${Date.now().toString().slice(-6)}`
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

 paymentCltr.verifyPayment=async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      attendeeId,
      eventId,
      amount,
      platformFee,
      couponId   
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Payment verification failed" });
    }
    const payment = await Payment.create({
      attendeeId,
      eventId,
      amount,
      platformFee,
      status: "success"
    });

    if (couponId) {
      await couponCltr.markUsed(attendeeId, couponId);
    }
    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      payment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports=paymentCltr