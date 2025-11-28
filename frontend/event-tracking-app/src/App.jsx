import {Routes,Route,Link} from "react-router-dom"
import Account from "./pages/Account"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "./App.css"
import UsersList from "./pages/UsersList"
import {  fetchAccount, logout } from "./slices/userSlice"
import { useDispatch,useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Button } from "./componets/ui/button"
import Dashboard from "./pages/Dashboard"
import PrivateRoute from "./context/PrivateRoute"
import { useEffect } from "react"



export default function App(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchAccount());
     }
  }, []);

    const {isAuthenticated,errors,data:user}=useSelector((state)=>{
      return state.users;
    })
    const handleLogout=()=>{
      dispatch(logout())
    }
    
    
  return (
    <div >
      <h2>Event Tracking App</h2><br/>
      <ul className="nav-link">
         <li><Link to="/">Home</Link></li>

        {(isAuthenticated || localStorage.getItem('token')) &&(
          <>
           
            <li> <Link to="/dashboard">Dashboard</Link></li>
             <li> <Link to="/account">Account</Link></li>
             {(user?.role==="admin"||user?.role==="organiser")&&<li><Link to="/usersList">Users List</Link></li>}
            <Button onClick={()=>{
              handleLogout()
              navigate('/login')
            }}>Logout</Button>
          </>
        )}
  
   
  
      {(!isAuthenticated && !localStorage.getItem('token'))&&(
        <>
        {errors && <p>{errors}</p>}
         <li><Link to="/login">SignIn</Link></li>     
        <li><Link to="/register">SignUp</Link></li>
        </>
      ) }


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