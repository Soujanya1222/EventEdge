import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganiserReviews } from "../../slices/reviewSlice";
import "../../styles/review.css";

export default function OrganiserReviews() {
  const dispatch = useDispatch();
  const { reviews, isLoading } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchOrganiserReviews());
  }, [dispatch]);

  return (
    <div className="review-page">
      <h2>Reviews for My Events</h2>

      {isLoading && <p>Loading reviews...</p>}

      {reviews.length === 0 && (
        <p>No reviews yet for your events.</p>
      )}

      {reviews.map((review) => (
        <div key={review._id} className="review-card">
          <div className="review-header">
            <strong>{review.attendeeId?.name}</strong>
            <span className="badge organiser-view">
              {review.eventId?.title}
            </span>
          </div>

          <div className="review-rating">
            ⭐ {review.rating} / 5
          </div>

          <p className="review-comment">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
