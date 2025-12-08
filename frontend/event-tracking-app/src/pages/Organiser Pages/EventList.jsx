import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchEvents } from "../../slices/eventSlice";
import EventCard from "../Organiser Pages/EventCard"

export default function EventList() {
  const dispatch = useDispatch();
  const { data: events, isLoading } = useSelector(state => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  return (
    <div>
      <h1>All Events</h1>

      {isLoading && <p>Loading...</p>}

      {!isLoading && events.map(event => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}
