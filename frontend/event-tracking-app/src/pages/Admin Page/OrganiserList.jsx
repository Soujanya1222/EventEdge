import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function OrganiserList() {
  const navigate = useNavigate();

  const { organisers = [] } = useSelector((state) => state.users);
  return (
    <div className="admin-table-container">
      <button onClick={() => navigate("/dashboard")} className="back-btn">
        ← Back to Dashboard
      </button>

      <table className="border border-black border-collapse w-full mt-4">
        <thead>
          <tr>
            <th className="border border-black p-3">Organiser Name</th>
            <th className="border border-black p-3">Organiser Email</th>
            <th className="border border-black p-3">Events Organised</th>
            <th className="border border-black p-3">Events & Tickets Sold</th>
          </tr>
        </thead>

        <tbody>
          {organisers.length === 0 ? (
            <tr>
              <td colSpan="4" className="border p-3 text-center">
                No organisers found
              </td>
            </tr>
          ) : (
            organisers.map((ele) => (
              <tr key={ele._id}>
                <td className="border border-black p-3">{ele.name}</td>
                <td className="border border-black p-3">{ele.email}</td>
                <td className="border border-black p-3">{ele.eventsOrganised}</td>
                <td className="border border-black p-3">
                  {ele.events && ele.events.length > 0 ? (
                    <ul className="organiser-events-list" style={{margin:0,paddingLeft:18}}>
                      {ele.events.map((ev) => (
                        <li key={ev._id}>
                          <strong>{ev.title}</strong>: {ev.ticketsSold}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>No events</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
