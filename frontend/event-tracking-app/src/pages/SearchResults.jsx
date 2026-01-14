import { useMemo } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/search.css"

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const q = (searchParams.get("q") || "").trim().toLowerCase();

  const { data: events = [] } = useSelector((state) => state.events);
  const { organisers = [], users = [] } = useSelector((state) => state.users);

  const results = useMemo(() => {
    if (!q) return { events: [], organisers: [], users: [] };

    const eventMatches = events.filter((e) => {
      return (
        (e.title && e.title.toLowerCase().includes(q)) ||
        (e.description && e.description.toLowerCase().includes(q)) ||
        (e.venue && e.venue.toLowerCase().includes(q))
      );
    });

    const organiserMatches = organisers.filter((o) => {
      return (
        (o.name && o.name.toLowerCase().includes(q)) ||
        (o.email && o.email.toLowerCase().includes(q))
      );
    });

    const userMatches = users.filter((u) => {
      return (
        (u.name && u.name.toLowerCase().includes(q)) ||
        (u.email && u.email.toLowerCase().includes(q))
      );
    });

    return {
      events: eventMatches,
      organisers: organiserMatches,
      users: userMatches,
    };
  }, [q, events, organisers, users]);

  const navigate = useNavigate();

  if (!q) {
    return (
      <div>
        <h2>Search</h2>
        <p>Type a query in the search bar and press Enter to find events, organisers or users.</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <button className="back-btn" onClick={() => navigate('/dashboard')}>← Back to Dashboard</button>
      <h2 className="search-title">Search results for "{q}"</h2>

      <section className="search-section">
        <h3>Events ({results.events.length})</h3>
        {results.events.length === 0 ? (
          <p className="no-results">No matching events.</p>
        ) : (
          <ul className="search-list">
            {results.events.map((e) => (
              <li key={e._id} className="search-item">
                <Link to={`/events/${e._id}`}><strong>{e.title}</strong></Link>
                <div className="meta">{e.venue} • {new Date(e.datetime).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
        <p className="search-links"><Link to="/organiser/events" >View all events</Link></p>
      </section>

      <section className="search-section">
        <h3>Organisers ({results.organisers.length})</h3>
        {results.organisers.length === 0 ? (
          <p className="no-results">No matching organisers.</p>
        ) : (
          <ul className="search-list">
            {results.organisers.map((o) => (
              <li key={o._id} className="search-item">
                <Link to={`/organiser/${o._id}`} className="item-title"><strong>{o.name}</strong></Link>  {o.email}
              </li>
            ))}
          </ul>
        )}
        <p className="search-links"><Link to="/organiserList">View all organisers</Link></p>
      </section>

      <section className="search-section">
        <h3>Users ({results.users.length})</h3>
        {results.users.length === 0 ? (
          <p className="no-results">No matching users.</p>
        ) : (
          <ul className="search-list">
            {results.users.map((u) => (
              <li key={u._id} className="search-item">
                <Link to={`/user/${u._id}`}><strong>{u.name}</strong></Link> — {u.email}
              </li>
            ))}
          </ul>
        )}
        <p className="search-links"><Link to="/usersList">View all users</Link></p>
      </section>
    </div>
  );
}