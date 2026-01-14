import { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventReviews, createReview } from "../slices/reviewSlice";
import { fetchMyTickets } from "../slices/ticketSlice";
import { useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import "../styles/review.css";

export default function ReviewPage() {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);

  const { reviews, isLoading, errors } = useSelector((state) => state.reviews);
  const { myTickets } = useSelector((state) => state.tickets);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    // Fetch tickets when the user changes or when viewing a different event so attendance info is fresh
    if (user?.role === "attendee") dispatch(fetchMyTickets());
  }, [dispatch, user, eventId]);

  useEffect(() => {
    if (eventId) dispatch(fetchEventReviews(eventId));
  }, [dispatch, eventId]);

  // Debug logs to help diagnose why review button may not appear
  useEffect(() => {
    console.debug("ReviewPage: eventId", eventId);
    console.debug("ReviewPage: myTickets", myTickets);
  }, [eventId, myTickets]);

  const hasReviewed = useMemo(() => {
    if (!user || user.role !== "attendee") return false;
    return reviews.some(
      (r) =>
        r.attendeeId?._id === user._id &&
        String(r.eventId?._id || r.eventId) === String(eventId)
    );
  }, [reviews, user, eventId]);

  const hasAttended = useMemo(() => {
    if (!myTickets?.length) return false;

    const now = new Date();
    return myTickets.some((t) => {
      const ticketEventId = t.eventId?._id || t.eventId;
      const eventDate = new Date(t.eventId?.datetime);

      return (
        String(ticketEventId) === String(eventId) &&
        (t.checkedIn === true || eventDate <= now)
      );
    });
  }, [myTickets, eventId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReview({ eventId, rating, comment }))
      .unwrap()
      .then(() => {
        setRating(5);
        setComment("");
      });
  };

  return (
    <div className="review-page">
      <h2>Event Reviews</h2>

      {isLoading && <p>Loading reviews...</p>}
      {errors && <p className="error-text">{errors}</p>}

      {user?.role === "attendee" && hasAttended && !hasReviewed && (
        <form className="review-form" onSubmit={handleSubmit}>
          <h3>Write a Review</h3>

          <label>Rating</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
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
          />

          <button type="submit">Submit Review</button>
        </form>
      )}

      {user?.role === "attendee" && hasReviewed && (
        <p className="info-text">You have already reviewed this event.</p>
      )}

      {!isLoading && reviews.length === 0 && <p>No reviews yet.</p>}

      {reviews.map((review) => (
        <div key={review._id} className="review-card">
          <strong>{review.attendeeId?.name}</strong>
          <div>{review.rating} / 5</div>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
