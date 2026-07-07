import { ViolationRisk } from "@/lib/status";

export interface ViolationReportItem {
  id: string;
  timestamp: string;
  location: string;
  violation_type: string;
  vehicle_type?: string;
  plate_number?: string;
  risk_level: ViolationRisk;
  status: "Diproses" | "Selesai" | "Menunggu";
}

export interface ReportSummary {
  total_violations: number;
  dominant_violation: string;
  risk_status: ViolationRisk;
  date_range: {
    start: string;
    end: string;
  };
}
