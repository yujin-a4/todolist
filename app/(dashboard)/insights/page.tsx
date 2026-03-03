"use client";

import { useEffect, useState } from "react";
import { InsightCard } from "@/components/ai/InsightCard";

type Insight = { type: string; title: string; description: string; icon: string };

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([]);

  const load = async () => {
    const res = await fetch("/api/ai/insights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "demo-user" }),
    });
    const data = await res.json();
    setInsights(data.insights ?? []);
  };

  useEffect(() => {
    void load();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">인사이트</h2>
        <button onClick={load} className="rounded bg-indigo-600 px-3 py-2 text-sm text-white">분석 새로고침</button>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {insights.map((item) => (
          <InsightCard key={item.type} {...item} />
        ))}
      </div>
      <div className="rounded border bg-white p-4 text-sm text-gray-600">완료율 트렌드 / 요일별 바 차트 영역</div>
    </div>
  );
}
