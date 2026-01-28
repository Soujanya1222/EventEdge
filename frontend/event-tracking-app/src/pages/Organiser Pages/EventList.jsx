import { useDispatch, useSelector } from "react-redux";
import EventCard from "../Organiser Pages/EventCard"
import { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { fetchAdminEvents, fetchEvents, fetchUserEvents } from "../../slices/eventSlice";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/event.css"


export default function EventList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const status = searchParams.get("status") 
  const dispatch=useDispatch()
  const {user}=useContext(UserContext)
  const { data: events, isLoading } = useSelector(state => state.events);
  useEffect(()=>{
    if(!user) return
    if(user.role==="admin"){
      dispatch(fetchAdminEvents())
    }
    if(user.role==="organiser"){
      dispatch(fetchEvents())
    }
    if(user.role==="attendee"){
      dispatch(fetchUserEvents())
    }
  },[user,dispatch])

  const filteredEvents = status
    ? events.filter(event => event.status === status)
    : events
  return (
    <div className="event-list-container">
      <button onClick={() => navigate("/dashboard")} className="back-btn">
                ← Back to Dashboard
            </button>
      <h1 className="event-list-title">
        {status ? `${status.toUpperCase()} EVENTS` : "All Events"}
      </h1>

      {isLoading && <p className="loading-text">Loading...</p>}
      <div className="event-grid">
        {!isLoading &&
          filteredEvents.map(event => (
            <EventCard
              key={event._id}
              event={{
                ...event,
                organiser: event.organiser || { name: "N/A" }
              }}
            />
          ))
        }
      </div>
     
    </div>
  );
}
