import { useContext } from "react"
import UserContext from "../../context/UserContext"
import {useSelector} from "react-redux"

export default function OrganiserDashboard(props){
    const {user}=useContext(UserContext)
    const {data}=useSelector((state)=>{
        return state.events;
    })
    if(!user){
        return <p>Loading...</p>
    }
    return(
        <div>
            <h2>Organiser Dashboard</h2>
            <p>Name--{user.name}</p>
            <>
            <div>Total Events:{data.length}</div>
            <div>Ticket Sold:</div>
            </>
        </div>
    )
}