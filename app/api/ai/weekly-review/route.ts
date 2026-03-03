import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { geminiPro } from "@/lib/gemini";

function getWeekStart(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day + 6) % 7;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function POST(request: NextRequest) {
  const { userId, weekStart } = await request.json();
  if (!userId) return NextResponse.json({ error: "userId is required" }, { status: 400 });

  const start = weekStart ? new Date(weekStart) : getWeekStart(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  const existing = await prisma.weeklyReview.findUnique({ where: { userId_weekStart: { userId, weekStart: start } } });
  if (existing) return NextResponse.json(existing);

  const todos = await prisma.todo.findMany({ where: { userId, createdAt: { gte: start, lte: end } }, include: { project: true } });
  const completed = todos.filter((t) => t.status === "done").length;
  const stats = {
    totalTodos: todos.length,
    completedTodos: completed,
    completionRate: todos.length ? Math.round((completed / todos.length) * 100) : 0,
    topProject: "N/A",
  };

  const prompt = `아래 데이터로 주간 리뷰 마크다운을 작성해줘.\n기간: ${start.toISOString().slice(0, 10)} ~ ${end
    .toISOString()
    .slice(0, 10)}\n투두 데이터: ${JSON.stringify(todos)}\n통계: ${JSON.stringify(stats)}`;
  const result = await geminiPro.generateContent(prompt);
  const content = result.response.text();

  const review = await prisma.weeklyReview.create({ data: { userId, weekStart: start, content, stats } });
  return NextResponse.json(review);
}
