import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Navbar() {
  const{handleLogout}=useContext(UserContext)
  return (
    <div className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/account">Account</NavLink>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}
