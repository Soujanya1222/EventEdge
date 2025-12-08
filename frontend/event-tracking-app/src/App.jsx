import {Routes,Route,Link, useNavigate} from "react-router-dom"
import Account from "./pages/Account"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "./App.css"
import UsersList from "./pages/UsersList"
import Dashboard from "./pages/Dashboard"
import { useContext,useEffect } from "react"
import UserContext from "./context/UserContext"
import EventList from "./pages/Organiser Pages/EventList"
import EventForm from "./pages/Organiser Pages/EventForm"
import { fetchEvents } from "./slices/eventSlice"
import { useDispatch } from "react-redux"
import { Button } from "./componets/ui/button"
export default function App(){
  const {isLoggedIn,handleLogout,user}=useContext(UserContext)
  const dispatch=useDispatch()
   useEffect(()=>{
        dispatch(fetchEvents())
    },[])
    
  return (
    <div >
      <h2>Event Tracking App</h2><br/>
      <ul className="nav-link">
         <li><Link to="/">Home</Link></li>

        {(isLoggedIn|| localStorage.getItem("token")) &&(
          <>
           <li> <Link to="/dashboard">Dashboard</Link></li>
             <li> <Link to="/account">Account</Link></li>
             {(user?.role==="admin"||user?.role==="organiser")&&<li><Link to="/usersList">Users List</Link></li>}
            {(user?.role==="admin"||user?.role==="organiser")&&<li><Link to="/organiser/events">Event List</Link></li>}
            {user?.role === "organiser" && (<li style={{color:"blue"}}><Link to="/create-event">CreateEvent</Link></li>)}
           <li style={{color:"blue"}}><Link to="/login" onClick={()=>{
              handleLogout();
            }}>Logout</Link></li>
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
        <Route path="/organiser/events" element={<EventList/>}/>
        <Route path="/create-event" element={<EventForm/>}/>
      </Routes>

    </div>
  )
}