import { SYSTEM_STATUS, TRAFFIC_CONDITIONS, VIOLATION_RISK } from "@/lib/status";

export const mockDashboardSummary = {
  system_status: SYSTEM_STATUS.NORMAL,
  traffic_condition: TRAFFIC_CONDITIONS.SEDANG,
  violation_risk: VIOLATION_RISK.SEDANG,
  total_detections_today: 14250,
  total_violations_today: 342,
  total_vehicles: 12540,
  dominant_violation: "Tidak Menggunakan Helm",
  smart_insight:
    "Terjadi peningkatan volume kendaraan di area Sudirman. Disarankan untuk memantau titik persimpangan SKA.",
};
