import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookedUsers } from "../../slices/ticketSlice";
import "../../styles/bookedUser.css"

export default function BookedUsers() {
  const dispatch = useDispatch();
  const { bookedUsersList, loading, error } = useSelector(
    state => state.tickets
  );

  useEffect(() => {
    dispatch(bookedUsers());
  }, [dispatch]);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="booked-users-container">
      <h2>👥 Event Bookings</h2>

      {bookedUsersList.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <table className="booked-users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Event</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookedUsersList.map((ticket, index) => (
              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td>{ticket.attendeeId?.name}</td>
                <td>{ticket.attendeeId?.email}</td>
                <td>{ticket.eventId?.title}</td>
                <td>
                  {ticket.checkedIn ? (
                    <span className="checked-in">Checked In</span>
                  ) : (
                    <span className="not-checked-in">Not Checked In</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
