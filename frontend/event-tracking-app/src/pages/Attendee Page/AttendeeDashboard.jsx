import { useContext, useEffect } from "react"
import UserContext from "../../context/UserContext"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { fetchSingleEvent, fetchUserEvents } from "../../slices/eventSlice"
import NearbyEventsMap from "../../componets/NearbyEventMap/NearByEventMap"

export default function AttendeeDashboard(props){
    const {user}=useContext(UserContext)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    

    const {data:events,isLoading,singleEvent}=useSelector((state)=>{
        return state.events;
    })

    useEffect(()=>{
        if(user?.role==="attendee"){
            dispatch(fetchUserEvents())
            
        }
    },[user,dispatch])

    if(!user){
        return <p>Loading...</p>
    }


    const approvedEvents = events.filter(e => e.status === "approved")
    const upcomingEvents = approvedEvents.filter(e => new Date(e.datetime) > new Date())
    const completedEvents = approvedEvents.filter(e => new Date(e.datetime) < new Date())
    return(
        <div className="dashboard-container">
            <h1 className="dashboard-header"><strong>Attendee Dashboard</strong></h1>
            <div className="stats-container">
                {isLoading && <p>Loading...</p>}
                {!isLoading && approvedEvents.length === 0 && (<p>No events available</p>)}

                {approvedEvents.map(event => (
                <div key={event._id} className="dashboard-card events">
                    <h3>{event.title}</h3>
                    <p>{event.venue}</p>
                    <p>₹{event.price}</p>

                    <button
                    className="dashboard-btn"
                    onClick={() => navigate(`/events/${event._id}`)}
                    >
                    View & Book
                    </button>
                </div>
                ))}
            </div>

  
            <div className="stats-container" style={{ marginTop: "40px" }}>
                <div className="dashboard-card organiser">
                <h3>My Bookings</h3>
                <p>Coming soon 🚧</p>
                </div>
            </div>

        <div className="stats-container" style={{ marginTop: "40px" }}>
            {upcomingEvents.length === 0 ? (
            <div className="dashboard-card approved">
                <h3>Upcoming Events</h3>
                <p>None</p>
            </div>
            ) : (
            upcomingEvents.map(event => (
                <div key={event._id} className="dashboard-card approved">
                <h3>{event.title}</h3>
                <p>{new Date(event.datetime).toLocaleDateString()}</p>
                </div>
            ))
            )}
        </div>

        <div className="stats-container" style={{ marginTop: "40px" }}>
            {completedEvents.length === 0 ? (
            <div className="dashboard-card rejected">
                <h3>Completed Events</h3>
                <p>None</p>
            </div>
            ) : (
            completedEvents.map(event => (
                <div key={event._id} className="dashboard-card rejected">
                <h3>{event.title}</h3>
                </div>
            ))
            )}
        </div>
            <NearbyEventsMap/>

        </div>
    )
}