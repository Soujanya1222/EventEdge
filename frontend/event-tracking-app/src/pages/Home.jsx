import { Link } from "react-router-dom";
import "../styles/home.css";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Home() {
  const{isLoggedIn, handleLogout}=useContext(UserContext)
  return (
    <div className="home-container">
      
      <header className="home-header">
        <h2>Event Tracking App</h2>
        {(!isLoggedIn && !localStorage.getItem('token')) ? (
          <nav>
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </nav>
        ) : (
          <nav>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/account">Account</Link>
            <button className="home-logout-btn" onClick={handleLogout}>Logout</button>
          </nav>
        )}
      </header>

      <main className="home-main">
        <div className="home-card">
          <h1>Event Tracking App</h1>
          <p>
            Create events, manage bookings, and track attendees seamlessly.
          </p>

        </div>
      </main>
    </div>
  );
}
