import { WeeklyReviewCard } from "@/components/ai/WeeklyReviewCard";

export default function HistoryPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">히스토리</h2>
      <div className="rounded border bg-white p-4 text-sm text-gray-600">날짜 피커 / 히트맵 / 최근 4주 차트 영역</div>
      <WeeklyReviewCard userId="demo-user" />
    </div>
  );
}
