import { useDispatch, useSelector } from "react-redux";
import { createCouponAction,updateCouponAction } from "../../slices/couponSlice";
import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import "../../styles/coupon.css"

export default function CreateCoupon() {
  const dispatch = useDispatch();
  const { loading, error ,data:coupons} = useSelector((state) => state.coupon);
  const { id: eventId,couponId } = useParams();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiry, setExpiry] = useState("");
 

  useEffect(()=>{
    if (couponId && coupons.length > 0) {
    const coupon = coupons.find((c) => c._id === couponId);
    if (coupon) {
      setCode(coupon.code);
      setDiscount(coupon.discount);
      setExpiry(new Date(coupon.expiry).toISOString().slice(0, 10)); 
    }
  }
    
  },[couponId,coupons])

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (couponId) {
   
    const result = await dispatch(
      updateCouponAction({ couponId, code, discount, expiry, eventId })
    );
    if (updateCouponAction.fulfilled.match(result)) {
      alert("Coupon Updated ")
    } else {
      alert(result.payload?.error || "Failed to update coupon");
    }
  } else {
    
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
  }
};


  return (
    <div className="create-coupon-container">
      <div className="create-coupon-card">
        <button onClick={() => navigate("/dashboard")} className="back-btn">
                ← Back to Dashboard
            </button>
        <h2>{couponId ? "Edit Coupon" : "Create Coupon"}</h2>

        <form className="coupon-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Coupon Code</label>
            <input
              type="text"
              placeholder="e.g., SAVE20"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              required
              disabled={!!couponId}
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