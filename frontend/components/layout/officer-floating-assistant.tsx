import Link from "next/link";

export function OfficerFloatingAssistant() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="/officer/assistant"
        title="Buka AI Assistant"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0B1F3A] text-white shadow-lg hover:bg-[#142d52] hover:shadow-xl transition-all duration-200 text-sm font-semibold tracking-tight"
      >
        AI
      </Link>
    </div>
  );
}
