import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function OrganiserList() {
  const navigate = useNavigate();

  const { organisers = [] } = useSelector((state) => state.users);
  return (
    <div>
      <button onClick={() => navigate("/dashboard")} className="back-btn">
        ← Back to Dashboard
      </button>

      <table className="border border-black border-collapse">
        <thead>
          <tr>
            <th className="border border-black p-3">Organiser Name</th>
            <th className="border border-black p-3">Organiser Email</th>
            <th className="border border-black p-3">Events Organised</th>
            <th className="border border-black p-3">Tickets Sold</th>
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
                <td className="border border-black p-3">{ele.ticketsSold}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
