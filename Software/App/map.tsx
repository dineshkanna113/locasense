"use client";
import { useEffect, useState } from "react";
import { BluetoothDevice } from "@/services/bluetooth";

interface MapProps {
  isLost: boolean;
  bluetoothDevices: BluetoothDevice[];
  thirdPartyLocation: { latitude: number; longitude: number } | null;
}

export const Map: React.FC<MapProps> = ({ isLost, bluetoothDevices, thirdPartyLocation }) => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    // Simulate location update when the item is "lost" or when new bluetooth devices are found
    if (isLost && bluetoothDevices.length > 0) {
      // Simulate a location based on the bluetooth device
      setLocation({
        latitude: 34.0522 + Math.random() * 0.01, // Example latitude near Los Angeles
        longitude: -118.2437 + Math.random() * 0.01, // Example longitude near Los Angeles
      });
    }
  }, [isLost, bluetoothDevices]);

  return (
    <div style={{ width: "100%", height: "400px", position: "relative" }}>
      {thirdPartyLocation ? (
        <>
          <img
            src={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+0000FF(${thirdPartyLocation.longitude},${thirdPartyLocation.latitude})/${thirdPartyLocation.longitude},${thirdPartyLocation.latitude},15,0/600x400?access_token=pk.eyJ1IjoidG9ueXd1MTIzIiwiYSI6ImNsa3lneG9tdzBwbzEzcG1vb2Z4dDJ4N2wifQ.U-S8-dsW49SrfnK5Eeqjkw`}
            alt="Third Party Location"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              backgroundColor: "white",
              padding: "5px",
              borderRadius: "5px",
              zIndex: 1000,
            }}
          >
            Third Party Location: Latitude: {thirdPartyLocation.latitude.toFixed(4)}, Longitude: {thirdPartyLocation.longitude.toFixed(4)}
          </div>
        </>
      ) : location ? (
        <>
          <img
            src={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+FFA500(${location.longitude},${location.latitude})/${location.longitude},${location.latitude},15,0/600x400?access_token=pk.eyJ1IjoidG9ueXd1MTIzIiwiYSI6ImNsa3lneG9tdzBwbzEzcG1vb2Z4dDJ4N2wifQ.U-S8-dsW49SrfnK5Eeqjkw`}
            alt="Location"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              backgroundColor: "white",
              padding: "5px",
              borderRadius: "5px",
              zIndex: 1000,
            }}
          >
            Latitude: {location.latitude.toFixed(4)}, Longitude: {location.longitude.toFixed(4)}
          </div>
        </>
      ) : (
        <p>No location data available.</p>
      )}
    </div>
  );
};
