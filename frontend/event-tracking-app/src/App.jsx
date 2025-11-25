import {Routes,Route,Link} from "react-router-dom"
import Account from "./pages/Account"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "./App.css"

export default function App(){
  return (
    <div>
      <h2>Event Tracking App</h2><br/>
      <ul className="nav-link">
     <li><Link to="/">Home</Link></li>
     <li> <Link to="/account">Account</Link></li>
     <li> <Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/login">SignIn</Link></li>
      <li><Link to="/register">SignUp</Link></li>
     <li> <Link to="/logout">Logout</Link></li>
      </ul>
      <br/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      <br/>
    </div>
  )
}