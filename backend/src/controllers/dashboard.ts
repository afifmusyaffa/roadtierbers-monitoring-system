import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';
import { RequestHandler } from 'express';

const adapter = new PrismaBetterSqlite3({ url: 'dev.db' });
const prisma = new PrismaClient({ adapter });

export const getDashboardSummary: RequestHandler = async (req, res) => {
  try {
    // In a real scenario, this would query the DB
    // For now, let's return some realistic data based on the schema
    const totalDetections = await prisma.trafficDetection.count();
    const totalViolations = await prisma.violationReport.count();

    // We'll return mock data for now, combined with real counts if any
    res.status(200).json({
      system_status: "Normal", // "Normal", "Gangguan", "Maintenance"
      traffic_condition: "Sedang", // "Lancar", "Sedang", "Padat"
      violation_risk: "Sedang",
      total_detections_today: totalDetections > 0 ? totalDetections : 14250,
      total_violations_today: totalViolations > 0 ? totalViolations : 342,
      total_vehicles: 12540,
      dominant_violation: "Tidak Menggunakan Helm",
      smart_insight: "Terjadi peningkatan volume kendaraan di area Sudirman. Disarankan untuk memantau titik persimpangan SKA."
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
