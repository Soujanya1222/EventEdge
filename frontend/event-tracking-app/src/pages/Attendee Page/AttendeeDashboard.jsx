import { useContext, useEffect } from "react"
import UserContext from "../../context/UserContext"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {  fetchUserEvents } from "../../slices/eventSlice"
import NearbyEventsMap from "../../componets/NearbyEventMap/NearByEventMap"
import { fetchMyTickets } from "../../slices/ticketSlice"

export default function AttendeeDashboard(props){
    const {user}=useContext(UserContext)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {myTickets}=useSelector((state=>state.tickets))

    const {data:events,isLoading,singleEvent}=useSelector((state)=>{
        return state.events;
    })

    useEffect(()=>{
        if(user?.role==="attendee"){
            dispatch(fetchUserEvents())
            dispatch(fetchMyTickets())
            
        }
    },[user,dispatch])

    if(!user){
        return <p>Loading...</p>
    }
    

    const approvedEvents = events.filter(e => e.status === "approved")
    const completedEvents = myTickets.filter(t => t.status === "completed");
    const missedEvents=myTickets.filter(t=>t.status==="missed")
    const upcomingEvents = myTickets.filter(t=>t.status=="active"||t.status=="used")
    return(
        <div className="dashboard-container">
            <h1 className="dashboard-header"><strong>Attendee Dashboard</strong></h1>
              <p className="dashborad-header">Welcome,<strong>{user.name}</strong></p>

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
            {upcomingEvents.length === 0 ? (
            <div className="dashboard-card approved">
                <h3>Upcoming Events</h3>
                <p>None</p>
            </div>
            ) : (
            upcomingEvents.map(ticket => (
                <div key={ticket._id} className="dashboard-card approved">
                <h3>{ticket.eventId.title}</h3>
                <p>{new Date(ticket.eventId.datetime).toLocaleDateString()}</p>
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
            completedEvents.map(ticket  => (
                <div key={ticket ._id} className="dashboard-card approved">
                <h3>{ticket.eventId.title}</h3>
                <p>
                {ticket.eventId?.datetime
                    ? new Date(ticket.eventId.datetime).toLocaleDateString()
                    : "Date unavailable"}
                </p>
                <span className="completed-badge">Completed</span>
                
                </div>
            ))
            )}
            <div className="stats-container" style={{ marginTop: "40px" }}>
                {missedEvents.length === 0 ? (
                    <div className="dashboard-card rejected">
                    <h3>Missed Events</h3>
                    <p>None</p>
            </div>
            ) : (
            missedEvents.map(ticket => (
            <div key={ticket._id} className="dashboard-card missed">
                <h3>{ticket.eventId.title}</h3>
                <p>{new Date(ticket.eventId.datetime).toLocaleDateString()}</p>
                <span className="badge missed">Missed</span>
            </div>
            ))
        )}
        </div>

        </div>
            <NearbyEventsMap/>

        </div>
    )
}