import { useDispatch, useSelector } from "react-redux";
import EventCard from "../Organiser Pages/EventCard"
import { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { fetchAdminEvents, fetchEvents } from "../../slices/eventSlice";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  },[user,dispatch])

  const filteredEvents = status
    ? events.filter(event => event.status === status)
    : events
  return (
    <div>
      <button onClick={() => navigate("/dashboard")} className="mb-3 px-4 py-2 border border-black">
                ← Back to Dashboard
            </button>
      <h1>
        {status ? `${status.toUpperCase()} EVENTS` : "All Events"}
      </h1>

      {isLoading && <p>Loading...</p>}

      {!isLoading &&
        filteredEvents.map(event => (
          <EventCard key={event._id} event={event} />
        ))
      }
    </div>
  );
}
