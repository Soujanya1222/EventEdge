import { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventReviews, createReview } from "../slices/reviewSlice";
import { useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import "../styles/review.css";

export default function ReviewPage() {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);

  const { reviews, isLoading, errors } = useSelector(
    (state) => state.reviews
  );

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (eventId) {
      dispatch(fetchEventReviews(eventId));
    }
  }, [dispatch, eventId]);


  const hasReviewed = useMemo(() => {
    if (!user || user.role !== "attendee") return false;
    return reviews.some(
      (review) => review.attendeeId?._id === user._id
    );
  }, [reviews, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReview({ eventId, rating, comment }))
      .unwrap()
      .then(() => {
        setComment("");
        setRating(5);
      });
  };

  return (
    <div className="review-page">
      <h2>Event Reviews</h2>

      {isLoading && <p>Loading reviews...</p>}
      {errors && <p className="error-text">{errors}</p>}

      {user?.role === "attendee" && !hasReviewed && (
        <form className="review-form" onSubmit={handleSubmit}>
          <h3>Write a Review</h3>

          <label>Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} ⭐
              </option>
            ))}
          </select>

          <label>Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            placeholder="Share your experience..."
          />

          <button type="submit">Submit Review</button>
        </form>
      )}

      {user?.role === "attendee" && hasReviewed && (
        <p className="info-text">
          You have already reviewed this event.
        </p>
      )}

      {!isLoading && reviews.length === 0 && (
        <p>No reviews yet.</p>
      )}

      {reviews.map((review) => {
        const isMyReview =
          user?.role === "attendee" &&
          review.attendeeId?._id === user._id;

        const isOrganiserEvent =
          user?.role === "organiser" &&
          review.eventId?.organiserId === user._id;

        return (
          <div key={review._id} className="review-card">
            <div className="review-header">
              <strong>{review.attendeeId?.name}</strong>

              <div className="review-badges">
                {isMyReview && (
                  <span className="badge my-review">Your Review</span>
                )}
                {isOrganiserEvent && (
                  <span className="badge organiser-view">
                    Review for Your Event
                  </span>
                )}
              </div>
            </div>

            <div className="review-rating">
               {review.rating} / 5
            </div>

            <p className="review-comment">{review.comment}</p>
          </div>
        );
      })}
    </div>
  );
}
