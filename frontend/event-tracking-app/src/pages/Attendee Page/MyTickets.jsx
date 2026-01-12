import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMyTickets,cancelTicket } from "../../slices/ticketSlice"
import "../../styles/myTicket.css"
import { useNavigate } from "react-router-dom"
import UserContext from "../../context/UserContext"

export default function MyTickets() {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const{user}=useContext(UserContext)
  const { myTickets, loading } = useSelector(state => state.tickets)

  useEffect(() => {
    dispatch(fetchMyTickets())
  }, [dispatch])

  if (loading)
    return (
      <div className="loading-container">
        <p>Loading tickets...</p>
      </div>
    )

  return (
    <div className="tickets-wrapper">
      <h2 className="tickets-title">My Tickets</h2>
       <button onClick={() => navigate("/dashboard")} className="back-btn">
                ← Back to Dashboard
            </button>

      {myTickets.length === 0 && (
        <p className="no-tickets">No tickets booked yet.</p>
      )}

      <div className="tickets-grid">
        {myTickets.map(ticket => (
          <div key={ticket._id} className="ticket-card">
            <h3 className="ticket-event">{ticket.eventId.title}</h3>
            <p className="ticket-date">Date: {ticket.eventId.date}</p>

            <img
              src={ticket.qrCode}
              alt="QR Code"
              className="ticket-qr"
            />

            <p
              className={`ticket-status ${
                ticket.checkedIn ? "used" : "active"
              }`}
            >
              {ticket.checkedIn ? "Used" : "Active"}

            </p>
             {!ticket.checkedIn && (
                <button
                    className="cancel-ticket-btn"
                    onClick={() => dispatch(cancelTicket(ticket._id))}
                    disabled={ticket.checkedIn}
                >
                    Cancel Ticket
                </button>
                )}

                {user.role === "organiser" && (
                <button className="verify-qr-btn" onClick={() => dispatch(verifyQR(ticket.qrCode))}>
                    Verify QR
                </button>
                )}
          </div>
        ))}
      </div>
    </div>
  )
}
