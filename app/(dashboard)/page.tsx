import { PriorityCard } from "@/components/ai/PriorityCard";

export default function DailyPage() {
  const today = new Date().toLocaleDateString("ko-KR", { dateStyle: "full" });
  const userId = "demo-user";

  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-2xl font-bold">오늘의 플래너</h2>
        <p className="text-sm text-gray-600">{today}</p>
      </header>
      <PriorityCard userId={userId} />
      <section className="rounded-xl border bg-white p-4">
        <h3 className="mb-2 font-semibold">오늘의 투두</h3>
        <p className="text-sm text-gray-500">진행바/빠른 입력/프로젝트 뱃지 UI는 API와 연동해 확장 가능합니다.</p>
      </section>
    </div>
  );
}
