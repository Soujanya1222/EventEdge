import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCouponAction, fetchCouponsAction } from "../../slices/couponSlice";
import "../../styles/coupon.css";
import { useNavigate } from "react-router-dom";

export default function CouponList() {
  const dispatch = useDispatch();
  const { data: coupons, loading, error } = useSelector(
    (state) => state.coupon
  );
  const navigate=useNavigate()

  useEffect(() => {
    dispatch(fetchCouponsAction());
  }, [dispatch]);


  const handleDelete=async(id)=>{
    const confirmDelete=window.confirm("Are you sure you want to delete this coupon?")
    if(!confirmDelete) return;
    const result=await dispatch(deleteCouponAction(id))
    if(deleteCouponAction.rejected.match(result)){
      alert(result.payload?.error || "Failed to delete coupon")
    }
  }
  if (loading) return <div className="loading-text">Loading coupons...</div>;

  return (
    <div className="coupon-list-container">
      {error && (
        <div className="error-message">{error.error || "Error loading coupons"}</div>
      )}

      <button onClick={() => navigate("/dashboard")} className="back-btn">
                ← Back to Dashboard
            </button>

      <div className="coupon-list-header">
        <h2>Coupons</h2>
      </div>

      {coupons?.length === 0 ? (
        <div className="no-coupons">
          <p>No coupons found</p>
        </div>
      ) : (
        <div className="coupons-grid">
          {coupons?.map((coupon) => (
            <div key={coupon._id} className="coupon-card">
              <div className="coupon-code">{coupon.code}</div>
              
              <div className="coupon-details">
                <div className="coupon-detail-row">
                  <span className="coupon-label">Discount</span>
                  <span className="coupon-value coupon-discount">{coupon.discount}%</span>
                </div>

                <div className="coupon-detail-row">
                  <span className="coupon-label">Expiry</span>
                  <span className="coupon-value coupon-expiry">
                    {new Date(coupon.expiry).toLocaleDateString()}
                  </span>
                </div>

                <div className="coupon-detail-row">
                  <span className="coupon-label">Event</span>
                  <span className="coupon-value coupon-event">{coupon.eventId?.title}</span>
                </div>

                <div className="coupon-detail-row">
                  <span className="coupon-label">Organiser</span>
                  <span className="coupon-value">{coupon.organiserId?.name}</span>
                </div>

                <div className="coupon-detail-row">
                  <span className="coupon-label">Times Used</span>
                  <span className="coupon-value coupon-usage">{coupon.usedBy?.length || 0}</span>
                </div>
              </div>
              <div className="coupon-actions">
                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(`/organiser/events/${coupon.eventId?._id}/create-coupon`, {
                      state: { couponId: coupon._id } 
                    })
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(coupon._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}