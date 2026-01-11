import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { totalTickets, ticketsPerEvent } from "../../slices/ticketSlice";
import "../../styles/myTicket.css"
export default function Tickets(){
     const dispatch = useDispatch();

useEffect(() => {
  dispatch(totalTickets());
  dispatch(ticketsPerEvent());
}, [dispatch]);
const { totalTickets: ticketsCount, ticketsPerEventList, loading } = useSelector(
  (state) => state.tickets
);
    return (
        <div>
       
<div className="dashboard-card total-tickets">
  <h3>🎟️ Total Tickets Sold</h3>
  <p>{loading ? "Loading..." : ticketsCount}</p>
</div>
<div className="dashboard-card tickets-per-event">
  <h3>Tickets Sold Per Event</h3>

  {ticketsPerEventList.length === 0 ? (
    <p>No events found</p>
  ) : (
    <table>
      <thead>
        <tr>
          <th>Event</th>
          <th>Tickets Sold</th>
        </tr>
      </thead>
      <tbody>
        {ticketsPerEventList.map((event) => (
          <tr key={event.eventId}>
            <td>{event.title}</td>
            <td>{event.ticketsSold}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

</div>
        
    )
}
