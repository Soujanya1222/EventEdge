import { useContext, useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleEvent } from "../../slices/eventSlice";
import UserContext from "../../context/UserContext";
import axios from "../../config/axios";

export default function EventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {user}=useContext(UserContext)
  const [payLoading, setPayLoading] = useState(false);

  const { singleEvent, isLoading, errors } = useSelector(
    state => state.events
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleEvent(id));
    }
  }, [id, dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (errors) return <p>{errors}</p>;
  if (!singleEvent?._id) return <p>No event found</p>;



  const handlePayment = async () => {
  try {
    setPayLoading(true);

    // 1️⃣ Create Razorpay Order
    const orderRes = await axios.post(
      "/payment/create-order",
      {
        amount: singleEvent.price,
        eventId: singleEvent._id
      }
    );

    const { order } = orderRes.data;

    // 2️⃣ Razorpay Checkout Options
    const options = {
      key: "rzp_test_S0ULiullehOE2g",
      amount: order.amount,
      currency: "INR",
      name: singleEvent.title,
      description: "Event Ticket Booking",
      order_id: order.id,

      handler: async function (response) {
        // 3️⃣ Verify payment
        await axios.post(
          "/payments/verify-payment",
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            attendeeId: user._id,
            eventId: singleEvent._id,
            amount: singleEvent.price,
            platformFee: 20
          }
        );
        navigate("/payment-success", {
    state: {
      referenceId: response.razorpay_payment_id,
      eventTitle: singleEvent.title,
      amount: singleEvent.price
    }
  });

        alert("Payment successful 🎉");
      },

      prefill: {
        name: user.name,
        email: user.email
      },

      theme: {
        color: "#6a1b9a"
      }
    };

    // 4️⃣ Open Razorpay
    const rzp = new window.Razorpay(options);
    rzp.open();

    setPayLoading(false);
  } catch (error) {
    console.error(error);
    setPayLoading(false);
    alert("Payment failed");
  }
};


  return (
    <div className="event-list-container">
      <h2>{singleEvent.title}</h2>
      <p>{singleEvent.description}</p>
      <p>{singleEvent.venue}</p>
      <p>₹{singleEvent.price}</p>

      {singleEvent.image?.length > 0 && (
        <img
          src={singleEvent.image[0]}
          alt="event"
          style={{ width: "100%", height:"100%", marginTop: "10px", borderRadius: "8px" }}
        />
      )}

      <button
        className="dashboard-btn"
        onClick={handlePayment}
        disabled={payLoading}
      >
        {payLoading ? "Processing..." : "Proceed to Book"}
      </button>

    </div>
  );
}
