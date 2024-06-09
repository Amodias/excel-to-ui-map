import React from "react";
import "leaflet/dist/leaflet.css";
import "./index.css";
import MapView from "./MapView";
import ExcelReader from "./ExcelReader";
import { LocationProvider } from "../context/LocationContext";

const Wrapper: React.FC = () => {
  return (
    <LocationProvider>
      <div className=" w-screen flex">
        <MapView className="h-screen w-2/3 p-2.5" />
        <div className="w-1/3">
          <ExcelReader className=" w-full h-1/3 border-b" />
        </div>
      </div>
    </LocationProvider>
  );
};

export default Wrapper;
