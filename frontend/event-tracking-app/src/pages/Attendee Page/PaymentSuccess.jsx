import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../../styles/paymentSuccess.css"
export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const { referenceId, eventTitle, amount } = location.state || {};

  useEffect(() => {
    if (referenceId) {
      const timer = setTimeout(() => {
        navigate("/my-tickets");
      }, 3000);

      return () => clearTimeout(timer); 
    }
  }, [referenceId, navigate]);
 
  if (!referenceId) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Invalid Access</h2>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div >
       <button onClick={() => navigate("/dashboard")} className="back-btn">
                ← Back to Dashboard
            </button>
       <div className="payment-success-container">
        <div className="payment-success-card">
          
          <h1 className="payment-success-title">Payment Successful</h1>
            <p className="payment-success-message">
                        Thank you for your payment. Your transcation was Successful!
            </p>{referenceId && (<p className="payment-success-reference">
                <strong>Refernce ID:</strong>{referenceId}
            </p>
            )}
            <p className="payment-success-message"><strong>Event:</strong> {eventTitle}</p> 
            <p className="payment-success-message"><strong>Amount Paid:</strong> ₹{amount}</p>
           <button onClick={() => navigate("/my-tickets")}>View My Tickets</button>
          </div>
      </div>

     
    </div>
  );
}


