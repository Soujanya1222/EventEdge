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
                   
                </div>
                
                <div className="stat-card">
                    <h3>Total Tickets</h3>
                    <p>{data.length}</p>
                    
                </div>
           </div>
        
        </div>
      
    )
}