import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Sidebar() {
  const {user,handleLogout}=useContext(UserContext)
  return (
    <div className="sidebar">
      <h2>Event Track</h2>
      <nav>
        <Link to="/dashboard" activeclassname="active">Dashboard</Link>
        <Link to="/organiser/events" activeclassname="active">Events</Link>
        {user?.role==="admin"&&<Link to="/organiserList" activeclassname="active">Organiser</Link>}
        {user?.role==="admin"&&<Link to="/usersList" activeclassname="active">Users</Link>}
        {user?.role==="attendee" && <Link to="/my-tickets" activeclassname="active"> Tickets</Link>}
        {user?.role==="organiser" && <Link to="/organiser/bookings">Booked Users</ Link>}
        {user?.role==="organiser" && <Link to="/tickets">Tickets Details</Link>}
        {user?.role==="organiser" && <Link to="/organiser/reviews">Review</Link>}

        
      </nav>
      <div className="profile-section">
        <Link to="/account">My Profile</Link>
        <br></br>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
