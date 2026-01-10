import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const { referenceId, eventTitle, amount } = location.state || {};

  // Safety check (direct URL access)
  if (!referenceId) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Invalid Access</h2>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "30px",
        borderRadius: "10px",
        background: "#e8f5e9",
        textAlign: "center"
      }}
    >
      <h2>🎉 Payment Successful</h2>

      <p><strong>Event:</strong> {eventTitle}</p>
      <p><strong>Amount Paid:</strong> ₹{amount}</p>

      <p style={{ marginTop: "20px" }}>
        <strong>Payment Reference ID</strong>
      </p>
      <p
        style={{
          background: "#fff",
          padding: "10px",
          borderRadius: "6px",
          fontWeight: "bold"
        }}
      >
        {referenceId}
      </p>

      <button
        style={{ marginTop: "20px" }}
        onClick={() => navigate("/my-tickets")}
      >
        View My Tickets
      </button>
    </div>
  );
}
