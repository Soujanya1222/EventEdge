import { useContext, useEffect } from "react"
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

    if(!user){
        return <p>Loading...</p>
    }
    return(
        <div>
             <h2 style={{
                marginBottom: "24px",
                fontSize: "24px",
                fontWeight: "600",
                paddingBottom: "12px"
             }}>Organiser Dashboard</h2>
                <div className="stats-container">
               
                <div className="stat-card">
                    <h3>Total Events</h3>
                    <p>{data.length}</p>
                    <button className="view-btn" onClick={()=>{
                        navigate("/organiser/events")
                    }}>View Events</button> 
                   
                </div>
                 <div className="stat-card">
                    <h3>Pending Events</h3>
                    <p>{data.filter(event=>event.status==="pending").length}</p>
                    <button className="view-btn" onClick={()=>{
                        navigate("/organiser/events?status=pending")
                    }}>View Events</button>
                </div>
                <div className="stat-card">
                    <h3>Approved Events</h3>
                    <p>{data.filter(event=>event.status==="approved").length}</p>
                    <button className="view-btn" onClick={()=>{
                        navigate("/organiser/events?status=approved")
                    }}>View Events</button>
                </div>
                <div className="stat-card">
                    <h3>Rejected Events</h3>
                    <p>{data.filter(event=>event.status==="rejected").length}</p>
                    <button className="view-btn" onClick={()=>{
                        navigate("/organiser/events?status=rejected")
                    }}>View Events</button>
                </div>
                <div className="stat-card">
                    <h3>Create New Event</h3>
                        <button className="view-btn" onClick={() => navigate("/create-event")}>+ Add Events</button>

                </div>
               <div className="stat-card">
                    <h3>Total Users</h3>
                    <p>{users.length}</p>
                    <button className="view-btn" onClick={()=>{
                        navigate("/usersList")
                    }}>View Users</button>

                </div>
               
                
                <div className="stat-card">
                    <h3>Total Tickets</h3>
                    <p>{data.length}</p>
                      
                </div>
           </div>
        
        </div>
      
    )
}