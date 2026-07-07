import {
  DetectionStatus,
  TrafficCondition,
  VehicleStatus,
} from "@/lib/status";

export interface BoundingBox {
  x_min: number;
  y_min: number;
  x_max: number;
  y_max: number;
}

export interface DetectionObject {
  id: string;
  label: string;
  confidence: number;
  bbox?: BoundingBox;
}

export interface TrafficDetectionResult {
  id: string;
  timestamp: string;
  location: string;
  condition: TrafficCondition;
  vehicle_count: number;
  objects: DetectionObject[];
  image_url: string;
  status: DetectionStatus;
}

export interface VehicleDetection {
  id: string;
  timestamp: string;
  location: string;
  plate_number: string;
  vehicle_type: string;
  tax_status: VehicleStatus;
  image_url: string;
  confidence: number;
}
