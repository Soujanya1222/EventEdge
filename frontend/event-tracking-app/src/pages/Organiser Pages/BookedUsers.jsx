import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookedUsers } from "../../slices/ticketSlice"

export default function BookedUsers() {
  const dispatch = useDispatch();
  const { bookedUsersList, loading } = useSelector(state => state.tickets);

  useEffect(() => {
    dispatch(bookedUsers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="booked-users">
      <h2>👥 Booked Users</h2>

      {bookedUsersList.map(user => (
        <div key={user._id} className="user-card">
          <p><strong>{user.userId.name}</strong></p>
          <p>{user.userId.email}</p>
          <p>Event: {user.eventId.title}</p>
          <p>Status: {user.checkedIn ? "Checked In" : "Not Checked In"}</p>
        </div>
      ))}
    </div>
  );
}
