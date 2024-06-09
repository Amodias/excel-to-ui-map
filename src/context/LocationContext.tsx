// LocationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Location {
  longitude: number;
  latitude: number;
  date: string;
}

interface LocationContextProps {
  locations: Location[] | null;
  setLocations: React.Dispatch<React.SetStateAction<Location[] | null>>;
}

const LocationContext = createContext<LocationContextProps | undefined>(
  undefined
);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [locations, setLocations] = useState<Location[] | null>(null);

  return (
    <LocationContext.Provider value={{ locations, setLocations }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error(
      "useLocationContext must be used within a LocationProvider"
    );
  }
  return context;
};
