import "../../styles/event.css";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { fetchEvents } from "../../slices/eventSlice";
import EventCard from "./EventCard";

export default function UserEventList() {
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);

  const { data: events, isLoading } = useSelector(state => state.events);

  useEffect(() => {
    if (user?.role === "attendee") {
      dispatch(fetchEvents());
    }
  }, [user, dispatch]);

  return (
    <div>
      <h1>Your Events</h1>

      {isLoading && <p>Loading...</p>}

      {!isLoading &&
        events.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
    </div>
  );
}
