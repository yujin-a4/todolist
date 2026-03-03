import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateGeminiJson } from "@/lib/gemini";

type PriorityResponse = { top3: string[]; reason: string };

export async function POST(request: NextRequest) {
  const { userId } = await request.json();
  if (!userId) return NextResponse.json({ error: "userId is required" }, { status: 400 });

  const today = new Date();
  const start = new Date(today);
  start.setHours(0, 0, 0, 0);
  const end = new Date(today);
  end.setHours(23, 59, 59, 999);

  const [todayTodos, overdueTodos, projects] = await Promise.all([
    prisma.todo.findMany({ where: { userId, dueDate: { gte: start, lte: end } }, include: { project: true } }),
    prisma.todo.findMany({ where: { userId, status: { not: "done" }, dueDate: { lt: start } }, include: { project: true } }),
    prisma.project.findMany({ where: { userId }, include: { todos: true } }),
  ]);

  const prompt = `오늘 우선순위 TOP3를 추천해줘.
오늘 날짜: ${today.toISOString().slice(0, 10)}
오늘 투두: ${JSON.stringify(todayTodos)}
어제까지 미완료 투두: ${JSON.stringify(overdueTodos)}
프로젝트 상태: ${JSON.stringify(
    projects.map((p) => ({
      name: p.name,
      deadline: p.deadline,
      completionRate: p.todos.length ? p.todos.filter((t) => t.status === "done").length / p.todos.length : 0,
    }))
  )}`;

  const data = await generateGeminiJson<PriorityResponse>(prompt);
  return NextResponse.json(data);
}
