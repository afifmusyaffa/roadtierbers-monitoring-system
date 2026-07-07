import { TRAFFIC_CONDITIONS } from "@/lib/status";
import { ForecastingRoute, ForecastingSummary } from "@/types/forecasting";

export const mockForecastingRoutes: ForecastingRoute[] = [
  {
    id: "RTE-1",
    name: "Pandau → Simpang Tiga",
    current_condition: TRAFFIC_CONDITIONS.SEDANG,
    predicted_duration_minutes: 25,
    trend: "meningkat",
    data_points: [
      { timestamp: "08:00", value: 120 },
      { timestamp: "09:00", value: 150 },
      { timestamp: "10:00", value: 180 },
    ],
  },
  {
    id: "RTE-2",
    name: "Simpang SKA → Bandara SSK II",
    current_condition: TRAFFIC_CONDITIONS.LANCAR,
    predicted_duration_minutes: 15,
    trend: "stabil",
    data_points: [
      { timestamp: "08:00", value: 80 },
      { timestamp: "09:00", value: 85 },
      { timestamp: "10:00", value: 82 },
    ],
  },
];

export const mockForecastingSummary: ForecastingSummary = {
  total_routes: 6,
  highest_congestion_route: "Pasar Pusat → Rumbai",
  average_predicted_duration: 32,
};
