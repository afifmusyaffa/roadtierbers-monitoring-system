import { DETECTION_STATUS } from "@/lib/status";

export const mockDetectionHistory = [
  {
    id: "HST-001",
    timestamp: new Date().toISOString(),
    model_type: "YOLOv8 - Helm",
    input_source: "preloaded case",
    violation_type: "Tidak Menggunakan Helm",
    count: 2,
    avg_confidence: 0.89,
    status: DETECTION_STATUS.PELANGGARAN_TERDETEKSI,
  },
  {
    id: "HST-002",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    model_type: "YOLOv8 - Kendaraan",
    input_source: "sample pemantauan",
    violation_type: "Normal",
    count: 15,
    avg_confidence: 0.94,
    status: DETECTION_STATUS.AMAN,
  },
];
