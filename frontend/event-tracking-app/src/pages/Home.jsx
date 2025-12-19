import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home-container">
      {/* Top Heading */}
      <header className="home-header">
        <h2>Event Tracking App</h2>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>

      {/* Center Card */}
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
