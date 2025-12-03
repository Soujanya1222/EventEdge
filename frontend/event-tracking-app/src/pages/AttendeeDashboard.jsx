import { useContext } from "react"
import UserContext from "../context/UserContext"

export default function AttendeeDashboard(props){
    const {user}=useContext(UserContext)
    if(!user){
        return <p>Loading...</p>
    }
    return(
        <div>
            <h2>Attendee Dashboard</h2>
            <p>Name--{user.name}</p>
        </div>
    )
}