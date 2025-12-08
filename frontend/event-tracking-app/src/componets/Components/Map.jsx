
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

function LocationPicker({ setFieldValue, lat, lng }) {
  function ClickHandler() {
    useMapEvents({
      click(e) {
        setFieldValue("latitude", e.latlng.lat);
        setFieldValue("longitude", e.latlng.lng);
      }
    });
    return null;
  }

  return (
    <MapContainer
      center={[lat || 20.5937, lng || 78.9629]} 
      zoom={5}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <ClickHandler />

      {lat && lng && <Marker position={[lat, lng]} />}
    </MapContainer>
  );
}

export default LocationPicker;
