import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchAccount } from "../slices/userSlice";
import AdminDashboard from "./AdminDashboard";
import OrganiserDashboard from "./OrganiserDashboard";
import AttendeeDashboard from "./AttendeeDashboard";

export default function Dashboard(props){
//     const dispatch=useDispatch()
//    const {data:user,isAuthenticated,isloading}=useSelector(state=>state.users);
   
//    useEffect(()=>{
//     if(!user && localStorage.getItem("token")){
//         dispatch(fetchAccount())
//     }
//    },[user,dispatch])
//     if(isloading){
//         return <p>Loading...</p>
//     }
//     if(!isAuthenticated|| !user){
//         return <p>You are not logged in.</p> 
        
//     }

    // switch(user.role){
    //     case "admin":
    //         return <AdminDashboard/>
    //     case "organiser":
    //         return <OrganiserDashboard/>
    //     case "attendee":
    //         return <AttendeeDashboard/>
    //     default :
    //     return <p>Unkonown role</p>
    // }
    return(
        <div>
             <h3>Dashboard</h3>
        </div>
    )
   

}