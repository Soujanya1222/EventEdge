import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleEvent } from "../../slices/eventSlice";

export default function EventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleEvent, isLoading, errors } = useSelector(
    state => state.events
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleEvent(id));
    }
  }, [id, dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (errors) return <p>{errors}</p>;
  if (!singleEvent?._id) return <p>No event found</p>;

  return (
    <div className="event-list-container">
      <h2>{singleEvent.title}</h2>
      <p>{singleEvent.description}</p>
      <p>{singleEvent.venue}</p>
      <p>₹{singleEvent.price}</p>

      {singleEvent.image?.length > 0 && (
        <img
          src={singleEvent.image[0]}
          alt="event"
          style={{ width: "100%", height:"100%", marginTop: "10px", borderRadius: "8px" }}
        />
      )}

      <button className="dashboard-btn">Proceed to Book</button>
    </div>
  );
}
