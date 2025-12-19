import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Event Track</h2>
      <nav>
        <NavLink to="/dashboard" activeclassname="active">Dashboard</NavLink>
        <NavLink to="/organiser/events" activeclassname="active">Events</NavLink>
        <NavLink to="/organiserList" activeclassname="active">Organiser</NavLink>
        <NavLink to="/usersList" activeclassname="active">Users</NavLink>
        <NavLink to="/settings" activeclassname="active">Settings</NavLink>
      </nav>
      <div className="profile-section">
        <NavLink to="/profile">My Profile</NavLink>
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
}
