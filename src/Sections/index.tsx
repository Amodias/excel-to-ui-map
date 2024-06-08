import React from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";

const Wrapper: React.FC = () => {
  const position1: LatLngExpression = [36.502013759781995, 3.771389178733484];
  const position2: LatLngExpression = [36.62005790503921, 3.3625658053548912];

  const positions = [position1, position2];

  return (
    <div>
      <img src="/2b3e1faf89f94a483539.png" alt="" />
      <MapContainer
        center={[28.0339, 1.6596]} // Centered on Algeria
        zoom={10} // Adjusted zoom level to better fit Algeria
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          url="/tiles/{z}-{x}-{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={position1}>
          <Popup>This is the marked location 1.</Popup>
        </Marker>
        <Marker position={position2}>
          <Popup>This is the marked location 2.</Popup>
        </Marker>
        <Polyline positions={positions} color="red" />
      </MapContainer>
    </div>
  );
};

export default Wrapper;
