import { LatLngExpression } from "leaflet";
import React, { useEffect, useState } from "react";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import CustomMapMarker from "./custom-map-marker";
import { useLocationContext } from "../../context/LocationContext";
import VectorTileLayer from "react-leaflet-vector-tile-layer";

interface MapViewProps {
  className?: string;
}

const MapView: React.FC<MapViewProps> = ({ className }) => {
  const { locations } = useLocationContext();
  const [markers, setMarkers] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (locations) {
      // Sort locations by date
      const sortedLocations = locations.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

      // Map each location to CustomMapMarker with order number
      const mapMarkers = sortedLocations.map((location, index) => {
        const position: LatLngExpression = [
          location.latitude,
          location.longitude,
        ];
        return (
          <CustomMapMarker
            key={index}
            position={position}
            number={index + 1}
            date={location.date}
          />
        );
      });

      setMarkers(mapMarkers);
    }
  }, [locations]);
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <MapContainer
        center={[36.5339, 3.6596]}
        zoom={10}
        className="h-full w-full"
      >
        <VectorTileLayer styleUrl="http://localhost:8080/styles/basic-preview/style.json" />

        {markers}
        {locations && locations.length > 1 && (
          <Polyline
            positions={locations.map((location) => [
              location.latitude,
              location.longitude,
            ])}
            color="red"
          />
        )}
      </MapContainer>
    </div>
  );
};
export default MapView;
