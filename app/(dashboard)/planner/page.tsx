export default function PlannerPage() {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">플래너 (주간 기본)</h2>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div key={day} className="min-h-40 rounded border bg-white p-2">
            <p className="text-sm font-semibold">{day}</p>
          </div>
        ))}
      </div>
      <aside className="rounded border bg-white p-3 text-sm text-gray-600">백로그 패널 (날짜 없는 투두)</aside>
    </div>
  );
}
