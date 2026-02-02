import { useContext, useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleEvent } from "../../slices/eventSlice";
import UserContext from "../../context/UserContext";
import { createOrder,verifyPayment  } from "../../slices/paymentSlice";
import { bookTicket } from "../../slices/ticketSlice";
import { applyCoupon } from "../../slices/couponSlice"
import "../../styles/coupon.css"
import Swal from "sweetalert2";
export default function EventDetails() {
  const { id } = useParams();
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const {user}=useContext(UserContext)
  const [ticketCount, setTicketCount] = useState(1);
  const [payLoading, setPayLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponId, setCouponId] = useState(null);
  const [finalAmount, setFinalAmount] = useState(0);



  const { singleEvent, isLoading, errors } = useSelector(
    state => state.events
  );

  


  useEffect(() => {
    if (id) {
      dispatch(fetchSingleEvent(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (singleEvent?.price) {
      setFinalAmount(singleEvent.price * ticketCount);
    }
  }, [singleEvent, ticketCount]);



  useEffect(() => {
    if (!singleEvent) return;

    const eventDate =
      singleEvent?.datetime ||
      singleEvent?.date ||
      singleEvent?.eventDate;

    if (!eventDate) {
      setIsCompleted(false);
      return;
    }

    const now = new Date();
    setIsCompleted(now.getTime() > new Date(eventDate).getTime());
    }, [singleEvent]);


  if (isLoading) return <p>Loading...</p>;
  if (errors) return <p>{errors}</p>;
  if (!singleEvent?._id) return <p>No event found</p>;



  const handlePayment = async () => {
  try {
    setPayLoading(true);
    const order= await dispatch(createOrder({
      amount: finalAmount,
      eventId: singleEvent._id,
      ticketCount
    })).unwrap();

    
    const options = {
      key: "rzp_test_S0ULiullehOE2g",
      amount: order.amount,
      currency: "INR",
      name: singleEvent.title,
      description: "Event Ticket Booking",
      order_id: order.id,

      handler: async  (response)=> {
        try{
          const payment=await dispatch(verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              attendeeId: user._id,
              eventId: singleEvent._id,
              amount: singleEvent.price,
              platformFee: 20,
              couponId,
              ticketCount
          })).unwrap();

          const ticket=await dispatch(
            bookTicket({
              eventId:singleEvent._id,
              paymentId:payment._id,
              quantity:ticketCount
            })
          ).unwrap();

          navigate("/payment-success",{
            state:{
              ticketId:ticket._id,
              referenceId:response.razorpay_payment_id,
              paymentId:payment._id,
              eventTitle:singleEvent.title,
              amount:finalAmount
            }
          })
        }catch(err){
          alert(err?.error||"Payment verification failed")
        }

      },

      prefill: {
        name: user.name,
        email: user.email
      },

      theme: {
        color: "#6a1b9a"
      }
    };
    new window.Razorpay(options).open();
    setPayLoading(false)
  } catch (error) {
    console.error(error);
    setPayLoading(false);
    alert("Payment failed");
  }
};


const handleApplyCoupon = async () => {
  try {
    const result = await dispatch(
      applyCoupon({
        code: couponCode,
        eventId: singleEvent._id
      })
    ).unwrap();

    setDiscount(result.discount);
    setCouponId(result.couponId);
    const total=singleEvent.price*ticketCount;
    const discountedAmount =
     total-(total*result.discount)/100

    setFinalAmount(discountedAmount);
    Swal.fire({
      title: "Good job!",
      text: "Coupon Applied successFully",
      icon: "success"
    });
 
  } catch (err) {
    alert(err?.error || "Invalid coupon");
  }
};



  return (
    <div className="event-list-container">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>← Back to Dashboard</button>

      <h2>{singleEvent.title}</h2>
      <p>{singleEvent.description}</p>
      <p>{singleEvent.venue}</p>
      <p>₹{singleEvent.price}</p>
      <div style={{ marginTop: "10px" }}>
      <label>Number of Tickets:</label>
      <input
        type="number"
        min="1"
        max={singleEvent.totalTickets - singleEvent.soldTickets}
        value={ticketCount}
        onChange={(e) => setTicketCount(Number(e.target.value))}
        style={{ marginLeft: "10px", width: "60px" }}
      />
    </div>

          <div className="coupon-container">
            <div className="coupon-input-group">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="coupon-input"
              />
              <button onClick={handleApplyCoupon} className="apply-coupon-btn">
                Apply Coupon
              </button>
            </div>

            {discount > 0 && (
              <div className="coupon-info">
                <p className="discount-text">Discount: {discount}%</p>
                <p className="payable-amount">Payable Amount: ₹{finalAmount}</p>
              </div>
            )}
          </div>



      {singleEvent.image?.length > 0 && (
        <img
          src={singleEvent.image[0]}
          alt="event"
          style={{ width: "100%", height:"100%", marginTop: "10px", borderRadius: "8px" }}
        />
      )}


      { user?.role === "attendee" && (
        <button
          onClick={() => navigate(`/review/${singleEvent._id}`)}
          style={{ marginTop: "10px", padding: "10px", background: "blue", color: "white" }}
        >
          Write a Review
        </button>
      )}

      <button
        className="dashboard-btn"
        onClick={handlePayment}
        disabled={payLoading|| isCompleted}
      >
        {isCompleted?"Event Completed":payLoading ? "Processing..." : "Proceed to Book"}
      </button>

    </div>
  );
}
