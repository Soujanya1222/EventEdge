import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

export default function EventCard({ event }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <div
      className="event-card"
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        borderRadius: "10px",
        marginBottom: "20px",
        width: "350px"
      }}
    >
      <h3>{event.title}</h3>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Date:</strong> {new Date(event.datetime).toLocaleString()}</p>
      <p><strong>Price:</strong> ₹{event.price}</p>

      {event.image?.length > 0 && (
        <img
          src={event.image[0]}
          alt="event"
          style={{ width: "100%", marginTop: "10px", borderRadius: "8px" }}
        />
      )}

      {user?.role === "attendee" && event.status === "approved" && (
        <button
          style={{
            marginTop: "12px",
            backgroundColor: "purple",
            color: "white",
            padding: "8px 12px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
          onClick={() => navigate(`/events/${event._id}`)}
        >
          View & Book
        </button>
      )}
    </div>
  );
}
