import {Routes,Route,Link, useNavigate} from "react-router-dom"
import Account from "./pages/Account"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "./App.css"
import UsersList from "./pages/UsersList"
import Dashboard from "./pages/Dashboard"
import { useContext } from "react"
import UserContext from "./context/UserContext"
export default function App(){
  const {handleLogout}=useContext(UserContext)
  const navigate=useNavigate()
    
  return (
    <div >
      <h2>Event Tracking App</h2><br/>
      <ul className="nav-link">
         <li><Link to="/">Home</Link></li>

       
           
            <li> <Link to="/dashboard">Dashboard</Link></li>
             <li> <Link to="/account">Account</Link></li>
             {/* {(user?.role==="admin"||user?.role==="organiser")&&<li><Link to="/usersList">Users List</Link></li>} */}
            <li><Link onClick={()=>{
              handleLogout();
              navigate('/login')
            }}>Logout</Link></li>
        
  
   
  
      
         <li><Link to="/login">SignIn</Link></li>     
        <li><Link to="/register">SignUp</Link></li>
      


      </ul>
      <br/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/usersList" element={<UsersList/>}/>
      </Routes>
      <br/>
    </div>
  )
}