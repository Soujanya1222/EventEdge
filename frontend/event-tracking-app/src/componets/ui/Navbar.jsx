import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Navbar() {
  const { handleLogout } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = search.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setSearch("");
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/account">Account</NavLink>
      </div>

      <form className="nav-search" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search events, organisers, users..."
          aria-label="Search"
        />
        <button type="submit">Search</button>
      </form>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
