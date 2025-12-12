import { useContext } from "react"
import UserContext from "../../context/UserContext"
import {  useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


export default function AdminDashboard(props){
    const navigate=useNavigate()
    const {data}=useSelector((state)=>{
        return state.users;
    })
    const {data:events}=useSelector((state)=>{
        return state.events;
    })
    const {user}=useContext(UserContext)
    if(!user){
        return <p>Loading...</p>
    }
    return(
        <div className="dashbord-content">
            <h2 className="page-title">Admin Dashboard</h2>
            <p>Name--{user.name}</p>
            <div className="stats-container">
                <div className="stat-card">
                    <h3>Total Organisers</h3>
                    <p>{data.length}</p>
                    <button className="view-btn" onClick={()=>navigate("/organiserList")}>View Organiser</button>
                </div>

            </div>

            <div className="stats-container">
                <div className="stat-card">
                    <h3>Total Events</h3>
                    <p>{events.length}</p>
                    <button className="view-btn" onClick={()=>{
                        navigate("/organiser/events")
                    }}>View Events</button>

                </div>

            </div>

             <div className="stats-container">
                <div className="stat-card">
                    <h3>Total Users</h3>
                    <p>{data.length}</p>
                    <button className="view-btn" onClick={()=>{
                        navigate("/usersList")
                    }}>View Users</button>

                </div>

            </div>
        </div>
    )
}