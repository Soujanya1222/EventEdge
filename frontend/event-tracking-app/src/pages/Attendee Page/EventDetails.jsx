export default function EventDetails({ data }) {
  return (
    <div className="event-card">
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      <p>Date: {new Date(data.date).toLocaleDateString()}</p>
      <p>Location: {data.location}</p>
      <p>Status: {data.status}</p>
    </div>
  );
}