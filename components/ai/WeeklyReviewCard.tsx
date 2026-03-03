"use client";

import { useState } from "react";

export function WeeklyReviewCard({ userId }: { userId: string }) {
  const [content, setContent] = useState("");

  const load = async () => {
    const res = await fetch("/api/ai/weekly-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    const data = await res.json();
    setContent(data.content ?? "");
  };

  return (
    <section className="rounded-xl border bg-white p-4">
      <div className="mb-2 flex gap-2">
        <h3 className="font-semibold">주간 리뷰</h3>
        <button onClick={load} className="rounded bg-indigo-600 px-2 py-1 text-sm text-white">지난 주 리뷰 생성</button>
      </div>
      <pre className="whitespace-pre-wrap text-sm">{content}</pre>
    </section>
  );
}
