import { useContext } from "react"
import UserContext from "../../context/UserContext"

export default function AttendeeDashboard(props){
    const {user}=useContext(UserContext)
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
        }}>Attendee Dashboard</h2>

        </div>
    )
}