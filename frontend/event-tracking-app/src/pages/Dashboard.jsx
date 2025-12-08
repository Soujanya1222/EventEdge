import { useContext, useEffect } from "react"
import UserContext from "../context/UserContext"
import AttendeeDashboard from "./AttendeeDashboard"
import AdminDashboard from "./AdminDashboard"
import OrganiserDashboard from "./Organiser Pages/OrganiserDashboard"

export default function Dashboard(props){
    const {user,isLoggedIn}=useContext(UserContext)
    if(!isLoggedIn){
        return <p>Please log In to access Dashboard</p>
    }
    if(!user){
        return <p>Loading..</p>
    }
    if(user.role=="admin"){
        return <AdminDashboard/>
    }
     if(user.role=="organiser"){
        return <OrganiserDashboard/>
    }
     if(user.role=="attendee"){
        return <AttendeeDashboard/>
    }
    return   <h2>No role assigned</h2>;
   

}