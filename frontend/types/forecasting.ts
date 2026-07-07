import { TrafficCondition } from "@/lib/status";

export interface ForecastingPoint {
  timestamp: string;
  value: number;
}

export interface ForecastingRoute {
  id: string;
  name: string;
  current_condition: TrafficCondition;
  predicted_duration_minutes: number;
  trend: "meningkat" | "stabil" | "menurun";
  data_points: ForecastingPoint[];
}

export interface ForecastingSummary {
  total_routes: number;
  highest_congestion_route: string;
  average_predicted_duration: number;
}
