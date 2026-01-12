import { useContext } from "react"
import UserContext from "../../context/UserContext"
import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
export default function OrganiserDashboard(props){
    const {user}=useContext(UserContext) 
    const navigate=useNavigate()
    const {data}=useSelector((state)=>{
        return state.events;
    })
    const {users}=useSelector((state)=>{
        return state.users;
    })
    const {totalTickets:tickets,loading}=useSelector((state)=>{
        return state.tickets;
    })

    if(!user){
        return <p>Loading...</p>
    }
    return(
        <div className="dashboard-container">
             <h2 className="dashboard-header">Organiser Dashboard</h2>
              <p className="dashborad-header">Welcome,<strong>{user.name}</strong></p>
                <div className="stats-container">
                <div className="dashboard-card events">
                    <h3>Total Events</h3>
                    <p>{data.length}</p>
                    <button className="dashboard-btn" onClick={()=>{
                        navigate("/organiser/events")
                    }}>View Events</button> 
                   
                </div>
                 <div className="dashboard-card pending">
                    <h3>Pending Events</h3>
                    <p>{data.filter(event=>event.status==="pending").length}</p>
                    <button className="dashboard-btn" onClick={()=>{
                        navigate("/organiser/events?status=pending")
                    }}>View Events</button>
                </div>
                <div className="dashboard-card approved">
                    <h3>Approved Events</h3>
                    <p>{data.filter(event=>event.status==="approved").length}</p>
                    <button className="dashboard-btn" onClick={()=>{
                        navigate("/organiser/events?status=approved")
                    }}>View Events</button>
                </div>
                <div className="dashboard-card rejected">
                    <h3>Rejected Events</h3>
                    <p>{data.filter(event=>event.status==="rejected").length}</p>
                    <button className="dashboard-btn" onClick={()=>{
                        navigate("/organiser/events?status=rejected")
                    }}>View Events</button>
                </div>
                <div className="dashboard-card create">
                    <h3>Create New Event</h3>
                       <div className="dashboard-actions">
                        <button className="dashboard-btn create-btn" onClick={() => navigate("/create-event")}>+Add Events</button>

                       </div>

                </div>
               <div className="dashboard-card users">
                    <h3>Total Users</h3>
                    <p>{users.length}</p>
                    <button className="dashboard-btn">View Users</button>

                </div>
               
                
                <div className="dashboard-card">
                    <h3>Total Tickets</h3>
                    <p>{loading ? "Loading..." : tickets}</p>
                    <button className="dashboard-btn" onClick={()=>navigate("/organiser/bookings")}>View Tickets</button>     
                </div>

                <button className="dashboard-btn" onClick={() => navigate("/organiser/scan-qr")}>Scan QR</button>

           </div>
        
        </div>
      
    )
}