export default function EventCard({ event }) {
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
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Date & Time:</strong> {new Date(event.datetime).toLocaleString()}</p>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Price:</strong> ₹{event.price}</p>
      <p><strong>Total Tickets:</strong> {event.totalTickets}</p>
      <p><strong>Sold Tickets:</strong> {event.soldTickets}</p>

      <p><strong>Status:</strong> {event.status}</p>

      <p><strong>Organiser Name:</strong> {event.organiserId.name}</p>

      {event.image?.length > 0 && (
        <img 
          src={event.image[0]}
          alt="Event Poster"
          style={{ width: "100%", marginTop: "10px" }}
        />
      )}
    </div>
  );
}
