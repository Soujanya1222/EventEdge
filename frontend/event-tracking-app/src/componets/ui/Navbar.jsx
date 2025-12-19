import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/account">Account</NavLink>
      <NavLink to="/logout" className="logout-link">Logout</NavLink>
    </div>
  );
}
