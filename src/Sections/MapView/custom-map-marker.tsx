import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LatLngExpression, divIcon } from "leaflet";
import React from "react";
import { renderToString } from "react-dom/server";
import { Marker, Popup } from "react-leaflet";
import formatDate from "../../utils/dateFormatter";

const MarkerIcon: React.FC<{ number: number }> = ({ number }) => (
  <div style={{ position: "relative", display: "inline-block" }}>
    <FontAwesomeIcon icon={faLocationPin} size={"3x"} />
    <span
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "white",
        fontSize: "14px",
        fontWeight: "bold",
      }}
    >
      {number}
    </span>
  </div>
);

const CustomMapMarker: React.FC<{
  position: LatLngExpression;
  number: number;
  date: string; // Adding date prop
}> = ({ position, number, date }) => {
  const icon2HTML = renderToString(<MarkerIcon number={number} />);

  const customMarkerIcon = divIcon({
    html: icon2HTML,
    className: "custom-marker-icon",
  });
  return (
    <Marker position={position} icon={customMarkerIcon}>
      {/* Include the date inside the Popup */}
      <Popup>
        <div>
          <p>This is the marked location {number}.</p>
          <p>Date: {formatDate(date)}</p>
        </div>
      </Popup>
    </Marker>
  );
};

export default CustomMapMarker;
