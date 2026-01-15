import { useDispatch, useSelector } from "react-redux";
import { createCouponAction } from "../../slices/couponSlice";
import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import "../../styles/coupon.css"

export default function CreateCoupon() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.coupon);
  const { id: eventId } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiry, setExpiry] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      createCouponAction({ code, discount, expiry, eventId })
    );

    if (createCouponAction.fulfilled.match(result)) {
      alert("Coupon Created Successfully");
      setCode("");
      setDiscount("");
      setExpiry("");
    } else {
      alert(result.payload?.error || "Something went wrong");
    }
  };

  return (
    <div className="create-coupon-container">
      <div className="create-coupon-card">
        <button onClick={() => navigate("/dashboard")} className="back-btn">
                ← Back to Dashboard
            </button>
        <h2>Create Coupon</h2>
        <form className="coupon-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Coupon Code</label>
            <input
              type="text"
              placeholder="e.g., SAVE20"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              required
            />
          </div>

          <div className="form-group">
            <label>Discount Percentage</label>
            <input
              type="number"
              placeholder="e.g., 20"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              min="0"
              max="100"
              required
            />
          </div>

          <div className="form-group">
            <label>Expiry Date</label>
            <input
              type="date"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              required
            />
          </div>

          {error && <div className="form-error">{error.error}</div>}

          <button className="create-coupon-btn" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Coupon"}
          </button>
        </form>
      </div>
    </div>
  );
}