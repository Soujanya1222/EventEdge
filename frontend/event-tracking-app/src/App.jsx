import {Routes,Route,Link} from "react-router-dom"
import Account from "./pages/Account"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "./App.css"

import "./styles/dashboard.css"
import UsersList from "./pages/Admin Page/UsersList"
import Dashboard from "./pages/Dashboard"
import OrganiserList from "./pages/Admin Page/OrganiserList"
import { useContext,useEffect } from "react"
import UserContext from "./context/UserContext"
import EventList from "./pages/Organiser Pages/EventList"
import EventForm from "./pages/Organiser Pages/EventForm"
import { useDispatch } from "react-redux"
import {  fetchBookedUsers, fetchOrganisers, fetchUsers } from "./slices/userSlice"
import { fetchAdminEvents, fetchEvents, fetchUserEvents } from "./slices/eventSlice"
import EventDetails from "./pages/Attendee Page/EventDetails"
import PaymentSuccess from "./pages/Attendee Page/PaymentSuccess"
export default function App(){
  const {isLoggedIn,handleLogout,user}=useContext(UserContext)

  const dispatch=useDispatch()
  useEffect(() => {
    if (user?.role === "admin") {
      dispatch(fetchAdminEvents())
      dispatch(fetchUsers())
      dispatch(fetchOrganisers())
    }
    if(user?.role==="organiser"){
      dispatch(fetchBookedUsers())
      dispatch(fetchEvents())
    }if(user?.role==="attendee"){
      dispatch(fetchUserEvents())
    }
             
  }, [user])
    
    
  return (
    <div >
      <ul className="nav-link">
         <li><Link to="/">Home</Link></li>

        {(isLoggedIn|| localStorage.getItem("token")) &&(
          <>
           <li> <Link to="/dashboard">Dashboard</Link></li>
          <li> <Link to="/account">Account</Link></li>
            {/* {user?.role==="organiser"&&<li><Link to="/organiser/events">Event List</Link></li>}
            {user?.role === "organiser" && (<li style={{color:"blue"}}><Link to="/create-event">CreateEvent</Link></li>)} */}
           {/* <li style={{color:"blue"}}><Link to="/login" onClick={()=>{
              handleLogout();
            }}>Logout</Link></li> */}
          </>
        )}
           
           
                
          {!isLoggedIn && !localStorage.getItem('token')&&
          (
            <>
             <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>     
               
            </>
          )}
   
  

      </ul>
      <br/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/usersList" element={<UsersList/>}/>
        <Route path="/organiserList" element={<OrganiserList/>}/>
        <Route path="/organiser/events" element={<EventList/>}/>
        <Route path="/create-event" element={<EventForm/>}/>
        <Route path="/create-event/:id" element={<EventForm />} />
        <Route path="/events/:id" element={<EventDetails/>}/>
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>

    </div>
  )
}