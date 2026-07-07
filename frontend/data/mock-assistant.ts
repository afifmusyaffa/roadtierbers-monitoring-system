import { AssistantMessage } from "@/types/assistant";

export const mockAssistantMessages: AssistantMessage[] = [
  {
    id: "MSG-001",
    role: "assistant",
    content:
      "Halo Petugas, saya adalah AI Assistant RoadTierbers. Kondisi lalu lintas saat ini terpantau sedang. Ada yang bisa saya bantu analisis?",
    timestamp: new Date(Date.now() - 60000).toISOString(),
  },
  {
    id: "MSG-002",
    role: "user",
    content: "Tolong rangkumkan pelanggaran tertinggi hari ini.",
    timestamp: new Date(Date.now() - 30000).toISOString(),
  },
  {
    id: "MSG-003",
    role: "assistant",
    content:
      "Berdasarkan data pemantauan hari ini, pelanggaran tertinggi adalah **Tidak Menggunakan Helm** dengan total 142 kejadian, berpusat mayoritas di area **Simpang SKA**. Risiko saat ini berada di tingkat Sedang.",
    timestamp: new Date().toISOString(),
  },
];
