import { useDispatch } from "react-redux"
import { approveEvent, deleteEvent, rejectEvent, } from "../../slices/eventSlice"
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";


export default function EventCard({ event }) {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const {user}=useContext(UserContext)
    const isPrivilegedUser = user?.role === "admin" || user?.role === "organiser";


    const handleEdit = () => {
       navigate(`/create-event/${event._id}`);
    };
  

  const handleApprove=()=>{
    dispatch(approveEvent(event._id))
  }

  const handleReject=()=>{
    dispatch(rejectEvent(event._id))
  }

  const handleDelete=()=>{
    dispatch(deleteEvent(event._id))
  }
  return (
    
    <div style={{
      border: "1px solid #ddd",
      padding: "15px",
      borderRadius: "10px",
      marginBottom: "25px",
      width: "400px"
    }}>
      <h2><strong>Event:{event.title}</strong></h2>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Date & Time:</strong> {new Date(event.datetime).toLocaleString()}</p>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Price:</strong> ₹{event.price}</p>

      {isPrivilegedUser&&(
        <><p><strong>Category:</strong> {event.category}</p>
      <p><strong>Total Tickets:</strong> {event.totalTickets}</p>
      <p><strong>Sold Tickets:</strong> {event.soldTickets}</p></>)}

      <p><strong>Status:</strong> {event.status}</p>

      <p><strong>Organiser Name:</strong> {event.organiserId?.name|| "N/A"}</p>

      {event.image?.length > 0 && (
        <img 
          src={event.image[0]}
          alt="Event Poster"
          style={{ width: "100%", marginTop: "10px" }}
        />
      )}
      
      {event.location?.coordinates && (
        <div style={{ marginTop: "10px" }}>
          <strong>Location:</strong>
          <p>Latitude: {event.location.coordinates[1]}</p>
          <p>Longitude: {event.location.coordinates[0]}</p>
        </div>
      )}

      {user?.role==="admin" && event.status==="pending" &&(
        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <button onClick={handleApprove}
              style={{
            backgroundColor: "green",
            color: "white",
            padding: "8px 12px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
           }}>
            Approve
           </button>


           <button
            onClick={handleReject}
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "8px 12px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Reject
          </button>


           <button
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "8px 12px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
            onClick={handleDelete}
          >
            DELETE
          </button>
        </div>
      )}


      {user?.role === "organiser" && event.status === "pending" && (
        <div style={{ marginTop: "12px" }}>
          <button
            onClick={handleEdit}
            style={{
              backgroundColor: "orange",
              color: "white",
              padding: "8px 12px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Edit
          </button>
        </div>
      )}

     {user?.role === "attendee" && event.status === "approved" && (
    <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
    <button
      onClick={() => navigate(`/events/${event._id}`)}
      style={{
        backgroundColor: "#6a1b9a",
        color: "white",
        padding: "8px 12px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
      }}
    >
      View
    </button>

    <button
      onClick={() => navigate(`/events/${event._id}/book`)}
      style={{
        backgroundColor: "purple",
        color: "white",
        padding: "8px 12px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
      }}
    >
      Book
    </button>
  </div>
)}



     


  </div>
  
  );
}
