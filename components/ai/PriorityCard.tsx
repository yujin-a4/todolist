"use client";

import { useEffect, useState } from "react";

type PriorityData = { top3: string[]; reason: string };

export function PriorityCard({ userId }: { userId: string }) {
  const [data, setData] = useState<PriorityData | null>(null);

  const load = async () => {
    const res = await fetch("/api/ai/priority", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    setData(await res.json());
  };

  useEffect(() => {
    void load();
  }, []);

  return (
    <section className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-semibold">✨ AI 추천 오늘의 TOP 3</h2>
        <button onClick={load} className="rounded bg-indigo-600 px-2 py-1 text-sm text-white">다시 추천받기</button>
      </div>
      <ul className="list-disc pl-5 text-sm">
        {data?.top3?.map((todoId) => <li key={todoId}>{todoId}</li>)}
      </ul>
      <p className="mt-2 text-sm text-gray-600">{data?.reason}</p>
    </section>
  );
}
