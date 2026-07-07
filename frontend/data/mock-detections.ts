import { DETECTION_STATUS, TRAFFIC_CONDITIONS, VEHICLE_STATUS } from "@/lib/status";
import { TrafficDetectionResult, VehicleDetection } from "@/types/detection";

export const mockTrafficDetections: TrafficDetectionResult[] = [
  {
    id: "DET-001",
    timestamp: new Date().toISOString(),
    location: "Simpang SKA",
    condition: TRAFFIC_CONDITIONS.PADAT,
    vehicle_count: 142,
    image_url: "/sample-cases/simpang-ska.jpg",
    status: DETECTION_STATUS.PERLU_PERHATIAN,
    objects: [
      { id: "OBJ-1", label: "Mobil", confidence: 0.95 },
      { id: "OBJ-2", label: "Motor", confidence: 0.88 },
    ],
  },
  {
    id: "DET-002",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    location: "Sudirman (MTQ)",
    condition: TRAFFIC_CONDITIONS.LANCAR,
    vehicle_count: 45,
    image_url: "/sample-cases/sudirman-mtq.jpg",
    status: DETECTION_STATUS.AMAN,
    objects: [
      { id: "OBJ-3", label: "Mobil", confidence: 0.98 },
    ],
  },
];

export const mockVehicleDetections: VehicleDetection[] = [
  {
    id: "VEH-001",
    timestamp: new Date().toISOString(),
    location: "Harapan Raya",
    plate_number: "BM 1234 ABC",
    vehicle_type: "Motor",
    tax_status: VEHICLE_STATUS.VALID,
    image_url: "/sample-cases/plate-1.jpg",
    confidence: 0.99,
  },
  {
    id: "VEH-002",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    location: "Panam (UNRI)",
    plate_number: "BM 9999 XYZ",
    vehicle_type: "Mobil",
    tax_status: VEHICLE_STATUS.BERMASALAH,
    image_url: "/sample-cases/plate-2.jpg",
    confidence: 0.92,
  },
];
