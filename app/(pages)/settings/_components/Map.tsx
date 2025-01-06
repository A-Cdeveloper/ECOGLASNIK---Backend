/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic"; // Import dynamic for SSR disabling

// Dynamically import MapContainer and TileLayer with SSR disabled
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false,
  }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  {
    ssr: false,
  }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  {
    ssr: false,
  }
);

import "leaflet/dist/leaflet.css";
import { useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";

// Function to ensure the Leaflet library is available
const useLeaflet = () => {
  const [L, setL] = useState<any>(null); // Local state to store L

  useEffect(() => {
    // Dynamically import Leaflet
    const loadLeaflet = async () => {
      const leaflet = await import("leaflet");
      setL(leaflet); // Set 'L' when Leaflet is loaded
    };

    loadLeaflet(); // Invoke the function to load Leaflet
  }, []); // Only run this once on mount

  return L;
};

const Map = ({
  defaultPosition,
  initialZoom,
  setDefaultPosition,
}: {
  defaultPosition: { lat: number; lng: number };
  initialZoom: number;
  setDefaultPosition: (position: { lat: number; lng: number }) => void;
}) => {
  const L = useLeaflet(); // Use custom hook to load Leaflet

  if (!L) {
    return <div>Loading map...</div>; // Show a loading message until Leaflet is loaded
  }

  return (
    <>
      {MapContainer && TileLayer ? (
        <MapContainer
          style={{ height: "300px", width: "100%", marginBlock: "1rem" }}
          zoom={initialZoom}
          center={[defaultPosition.lat, defaultPosition.lng]}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={[defaultPosition.lat, defaultPosition.lng]}
            icon={
              new L.Icon({
                iconUrl: "/marker-icon.png", // Your custom icon URL
                iconSize: [25, 25],
                iconAnchor: [12, 12],
              })
            }
          />
          <MapClickHandler setDefaultPosition={setDefaultPosition} />
        </MapContainer>
      ) : null}
    </>
  );
};

const MapClickHandler = ({
  setDefaultPosition,
}: {
  setDefaultPosition: (position: { lat: number; lng: number }) => void;
}) => {
  useMapEvents({
    click(e) {
      setDefaultPosition({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });
  return null;
};

export default Map;
