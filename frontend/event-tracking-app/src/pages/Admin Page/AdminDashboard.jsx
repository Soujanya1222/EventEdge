import { useContext,  } from "react"
import UserContext from "../../context/UserContext"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"




export default function AdminDashboard(props){
    const navigate=useNavigate()
    const {users,organisers}=useSelector((state)=>{
        return state.users;
    })
    const {data:events}=useSelector((state)=>{
        return state.events;
    })
  
       

    const approvedEvents = events.filter(
         event => event.status === "approved"
    );

    const pendingEvents = events.filter(
    event => event.status === "pending"
    );

     const rejectedEvents = events.filter(
    event => event.status === "rejected"
    );

    const approvedCount = approvedEvents.length;
    const pendingCount = pendingEvents.length;
    const rejectedCount=rejectedEvents.length;


    const {user}=useContext(UserContext)
    if(!user){
        return <p>Loading...</p>
    }
    return(
        <div className="dashboard-container">
            <h1 className="dashboard-header"><strong>Admin Dashboard</strong></h1>
            <p className="dashborad-header">Welcome,<strong>{user.name}</strong></p>
            <div className="stats-container">
                <div className="dashboard-card organiser">
                    <h3>Total Organisers</h3>
                    <p>{organisers.length}</p>
                    <button className="view-btn" onClick={()=>navigate("/organiserList")}>View Organiser</button>
                </div>

                <div className="dashboard-card events">
                    <h3>Total Events</h3>
                    <p>{events.length}</p>
                    <button className="view-btn" onClick={()=>{
                        navigate("/organiser/events")
                    }}>View Events</button>

                </div>

                <div className="dashboard-card users">
                    <h3>Total Users</h3>
                    <p>{users.length}</p>
                    <button className="view-btn" onClick={()=>{
                        navigate("/usersList")
                    }}>View Users</button>

                </div>
                
                <div className="dashboard-card pending">
                <p>Pending Events</p>
                <h2>{pendingCount}</h2>
                 <button className="view-btn" onClick={()=>navigate("/organiser/events?status=pending")}>View pending Events</button>
                </div>
                
                <div className="dashboard-card approved">
                <p>Approved Events</p>
                <h2>{approvedCount}</h2>
                 <button className="view-btn" onClick={()=>navigate("/organiser/events?status=approved")}>View Approved Evets</button>
                </div>


                 <div className="dashboard-card rejected">
                <p>Rejected Events</p>
                <h2>{rejectedCount}</h2>
                 <button className="view-btn" onClick={()=>navigate("/organiser/events?status=rejected")}>View Rejected Events</button>
                </div>

            </div>
        </div>
    )
}