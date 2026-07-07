import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import {
  HistoryHeaderBar,
  HistoryStatusSummary,
  FilterSummaryBar,
  HistoryKpiGrid,
  MainHistoryTable,
  ValidationAndTimeline,
  NotesAndActions,
  QuickNavigation
} from "@/components/officer/history/history-components";

export default function OfficerHistoryPage() {
  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto space-y-10 pb-12">
        <HistoryHeaderBar />
        <HistoryStatusSummary />
        <FilterSummaryBar />
        <HistoryKpiGrid />
        <MainHistoryTable />
        <ValidationAndTimeline />
        <NotesAndActions />
        <QuickNavigation />
      </div>
    </OfficerPageShell>
  );
}
