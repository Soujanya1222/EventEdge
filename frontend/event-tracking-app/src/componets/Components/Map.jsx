
import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

function LocationPicker({ setFieldValue, lat, lng }) {
  const [position,setPosition]=useState([lat||20.5937,lng||78.9629])
  function ClickHandler() {
    useMapEvents({
      click(e) {
        const {lat,lng}=e.latlng;
       setFieldValue("location", {
      type: "Point",
      coordinates: [Number(lng), Number(lat)] 
    });
      setPosition([lat,lng])
      }
    });
    return null;
  }

  return (
    <MapContainer
      center={position}
      zoom={5}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <ClickHandler />

      {lat && lng && <Marker position={position} />}
    </MapContainer>
  );
}

export default LocationPicker;
