import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchNearbyEvents } from "../../slices/eventSlice";
import { defaultIcon } from "./leafletIcon";

export default function NearbyEventsMap() {
  const dispatch = useDispatch();
  const { nearbyEvents, isLoading, errors } = useSelector(state => state.events);

  const [userLocation, setUserLocation] = useState(null); // start as null
  const NEARBY_RADIUS_KM = 5;

  // Get user geolocation
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Geolocation error code:", error.code, "message:", error.message);
        // fallback location if denied
        setUserLocation({ latitude: 20.5937, longitude: 78.9629 }); // India center fallback
      },
      { enableHighAccuracy: true }
    );
  }, []);

  // Fetch nearby events **only if userLocation is set**
  useEffect(() => {
    if (userLocation) {
      dispatch(fetchNearbyEvents({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        distance: NEARBY_RADIUS_KM
      }));
    }
  }, [userLocation, dispatch]);

  if (!userLocation) return <p>Getting your location...</p>;
  if (isLoading) return <p>Loading nearby events...</p>;
  if (errors) return <p>{errors}</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Nearby Events</h2>
      {nearbyEvents.length === 0 && <p>No events nearby within {NEARBY_RADIUS_KM} km</p>}

      <MapContainer
        center={[userLocation.latitude, userLocation.longitude]}
        zoom={12}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* User location */}
        <Marker position={[userLocation.latitude, userLocation.longitude]} icon={defaultIcon} />

        {/* Nearby events */}
        {nearbyEvents.map((event) => (
          <Marker
            key={event._id}
            position={[event.location.coordinates[1], event.location.coordinates[0]]}
            icon={defaultIcon}
            eventHandlers={{
              click: () => window.open(event.directionUrl, "_blank"),
            }}
          />
        ))}

        {/* Circle showing radius */}
        <Circle
          center={[userLocation.latitude, userLocation.longitude]}
          radius={NEARBY_RADIUS_KM * 1000}
          color="blue"
        />
      </MapContainer>
    </div>
  );
}
