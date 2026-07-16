"use client";

import { MapContainer, TileLayer, Polyline, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface TrafficMapProps {
  totalVehicles: number;
  lastUpdate: string | null;
}

export default function TrafficMap({ totalVehicles, lastUpdate }: TrafficMapProps) {
  // Center of Pekanbaru (around Simpang SKA)
  const center: [number, number] = [0.470, 101.417];

  // Coordinates for the road (e.g., Jl. Soekarno Hatta)
  const roadCoordinates: [number, number][] = [
    [0.485, 101.417], // Simpang SKA
    [0.450, 101.417], // Going South
  ];

  // Determine line color based on vehicles
  let lineColor = "#22c55e"; // green
  let statusText = "Lancar";
  if (totalVehicles > 15) {
    lineColor = "#ef4444"; // red
    statusText = "Padat";
  } else if (totalVehicles > 5) {
    lineColor = "#eab308"; // yellow
    statusText = "Sedang";
  } else if (totalVehicles === 0 && !lastUpdate) {
    lineColor = "#64748b"; // slate, no data yet
    statusText = "Menunggu Data";
  }

  // Use a dark mode map tile like CartoDB Dark Matter to match the screenshot aesthetic
  const tileUrl = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
  const tileAttribution = '&copy; <a href="https://carto.com/attributions">CARTO</a>';

  return (
    <div style={{ height: "450px", width: "100%", borderRadius: "1rem", overflow: "hidden", zIndex: 10, position: "relative" }}>
      <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%", zIndex: 10 }}>
        <TileLayer url={tileUrl} attribution={tileAttribution} />
        
        <Polyline key={lineColor} positions={roadCoordinates} color={lineColor} weight={8} opacity={0.8}>
          <Tooltip sticky direction="top">
            <div className="text-sm font-medium">
              <p>Area: Jl. Soekarno Hatta</p>
              <p>Status: {statusText} ({totalVehicles} Kendaraan)</p>
              <p className="text-xs text-slate-500 mt-1">Waktu Deteksi: {lastUpdate || "-"}</p>
            </div>
          </Tooltip>
        </Polyline>
      </MapContainer>
    </div>
  );
}
