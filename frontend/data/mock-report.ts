import { VIOLATION_RISK } from "@/lib/status";
import { ReportSummary, ViolationReportItem } from "@/types/report";

export const mockViolationReports: ViolationReportItem[] = [
  {
    id: "RPT-001",
    timestamp: new Date().toISOString(),
    location: "Simpang SKA",
    violation_type: "Tidak Menggunakan Helm",
    vehicle_type: "Motor",
    plate_number: "BM 1234 ABC",
    risk_level: VIOLATION_RISK.SEDANG,
    status: "Diproses",
  },
  {
    id: "RPT-002",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    location: "Sudirman (MTQ)",
    violation_type: "Pajak Mati",
    vehicle_type: "Mobil",
    plate_number: "BM 9999 XYZ",
    risk_level: VIOLATION_RISK.TINGGI,
    status: "Menunggu",
  },
];

export const mockReportSummary: ReportSummary = {
  total_violations: 145,
  dominant_violation: "Tidak Menggunakan Helm",
  risk_status: VIOLATION_RISK.SEDANG,
  date_range: {
    start: new Date(Date.now() - 86400000 * 7).toISOString(),
    end: new Date().toISOString(),
  },
};
