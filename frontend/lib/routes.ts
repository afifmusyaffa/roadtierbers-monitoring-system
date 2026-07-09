export const PUBLIC_ROUTES = [
  { label: "Beranda", path: "/" },
  { label: "Pantauan Lalu Lintas", path: "/traffic-overview" },
  { label: "Edukasi Rambu", path: "/traffic-sign-education" },
  { label: "Tentang Sistem", path: "/about" },
];

// These remain accessible via CTAs but are not shown in main navbar
export const PUBLIC_SECONDARY_ROUTES = [
  { label: "Prediksi Kemacetan", path: "/congestion-prediction" },
  { label: "Rekomendasi Keberangkatan", path: "/departure-recommendation" },
];

export type OfficerRouteGroup = {
  groupLabel: string;
  routes: { label: string; path: string }[];
};

export const OFFICER_ROUTE_GROUPS: OfficerRouteGroup[] = [
  {
    groupLabel: "Ringkasan Operasional",
    routes: [
      { label: "Dashboard Monitoring", path: "/officer/dashboard" },
    ],
  },
  {
    groupLabel: "Monitoring Lapangan",
    routes: [
      { label: "Pusat Deteksi AI", path: "/officer/ai-detection" },
      { label: "Monitoring Pelanggaran", path: "/officer/violation-monitoring" },
      { label: "Kendaraan & Plat", path: "/officer/vehicle-plate" },
    ],
  },
  {
    groupLabel: "Analisis & Prediksi",
    routes: [
      { label: "Forecasting", path: "/officer/forecasting" },
      { label: "Smart Insight", path: "/officer/smart-insight" },
    ],
  },
  {
    groupLabel: "Arsip & Laporan",
    routes: [
      { label: "Riwayat Deteksi", path: "/officer/history" },
      { label: "Laporan Petugas", path: "/officer/report" },
    ],
  },
  {
    groupLabel: "Bantuan",
    routes: [
      { label: "Asisten AI", path: "/officer/assistant" },
    ],
  },
];

// Flat list for topbar title lookup
export const OFFICER_ROUTES = OFFICER_ROUTE_GROUPS.flatMap((g) => g.routes);

export const AUTH_ROUTE = "/login";

