export const TRAFFIC_CONDITIONS = {
  LANCAR: "Lancar",
  SEDANG: "Sedang",
  PADAT: "Padat",
} as const;

export const VIOLATION_RISK = {
  RENDAH: "Rendah",
  SEDANG: "Sedang",
  TINGGI: "Tinggi",
} as const;

export const SYSTEM_STATUS = {
  NORMAL: "Normal",
  WASPADA: "Waspada",
  KRITIS: "Kritis",
} as const;

export const VEHICLE_STATUS = {
  VALID: "Valid",
  PERLU_PEMERIKSAAN: "Perlu Pemeriksaan",
  BERMASALAH: "Bermasalah",
} as const;

export const DETECTION_STATUS = {
  AMAN: "Aman",
  PERLU_PERHATIAN: "Perlu Perhatian",
  PELANGGARAN_TERDETEKSI: "Pelanggaran Terdeteksi",
  RISIKO_TINGGI: "Risiko Tinggi",
} as const;

export type TrafficCondition =
  (typeof TRAFFIC_CONDITIONS)[keyof typeof TRAFFIC_CONDITIONS];
export type ViolationRisk =
  (typeof VIOLATION_RISK)[keyof typeof VIOLATION_RISK];
export type SystemStatus = (typeof SYSTEM_STATUS)[keyof typeof SYSTEM_STATUS];
export type VehicleStatus =
  (typeof VEHICLE_STATUS)[keyof typeof VEHICLE_STATUS];
export type DetectionStatus =
  (typeof DETECTION_STATUS)[keyof typeof DETECTION_STATUS];
