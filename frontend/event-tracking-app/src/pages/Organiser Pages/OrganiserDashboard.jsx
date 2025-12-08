import { useContext } from "react"
import UserContext from "../../context/UserContext"

export default function OrganiserDashboard(props){
    const {user}=useContext(UserContext)
    if(!user){
        return <p>Loading...</p>
    }
    return(
        <div>
            <h2>Organiser Dashboard</h2>
            <p>Name--{user.name}</p>
            <>
            <div>Total Events:</div>
            <div>Ticket Sold:</div>
            </>
        </div>
    )
}