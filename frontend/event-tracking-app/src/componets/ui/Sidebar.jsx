import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Sidebar() {
  const {user,handleLogout}=useContext(UserContext)
  return (
    <div className="sidebar">
      <h2>Event Track</h2>
      <nav>
        <NavLink to="/dashboard" activeclassname="active">Dashboard</NavLink>
        <NavLink to="/organiser/events" activeclassname="active">Events</NavLink>
        {user?.role==="admin"&&<NavLink to="/organiserList" activeclassname="active">Organiser</NavLink>}
        {user?.role==="admin"&&<NavLink to="/usersList" activeclassname="active">Users</NavLink>}
        {user?.role==="attendee" && <NavLink to="/my-tickets" activeclassname="active"> Tickets</NavLink>}
        {user?.role==="organiser" && <NavLink to="/organiser/bookings">Booked Users</NavLink>}
        {user?.role==="organiser" && <NavLink to="/tickets">Tickets Details</NavLink>}

        
      </nav>
      <div className="profile-section">
        <NavLink to="/account">My Profile</NavLink>
        <br></br>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
