"use client";

import { useState } from "react";

type GeneratedTodo = { title: string; priority: "high" | "medium" | "low"; dueDate: string; description?: string };

export function DecomposeModal({ projectId }: { projectId: string }) {
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [teamSize, setTeamSize] = useState("혼자");
  const [todos, setTodos] = useState<GeneratedTodo[]>([]);

  const generate = async () => {
    const res = await fetch("/api/ai/decompose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId, goal, deadline, teamSize }),
    });
    const data = await res.json();
    setTodos(data.todos ?? []);
  };

  return (
    <section className="rounded-xl border bg-white p-4">
      <h3 className="mb-2 font-semibold">AI로 할 일 생성</h3>
      <div className="grid gap-2">
        <textarea value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="프로젝트 목표" className="rounded border p-2" />
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="rounded border p-2" />
        <select value={teamSize} onChange={(e) => setTeamSize(e.target.value)} className="rounded border p-2">
          <option>혼자</option><option>2~5명</option><option>그 이상</option>
        </select>
        <button onClick={generate} className="rounded bg-indigo-600 px-3 py-2 text-white">생성</button>
      </div>
      <ul className="mt-3 space-y-2 text-sm">
        {todos.map((todo) => <li key={todo.title} className="rounded border p-2">{todo.title} / {todo.priority} / {todo.dueDate}</li>)}
      </ul>
    </section>
  );
}
