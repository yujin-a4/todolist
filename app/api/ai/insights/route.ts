import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateGeminiJson } from "@/lib/gemini";

type InsightsResponse = {
  insights: { type: string; title: string; description: string; icon: string }[];
};

export async function POST(request: NextRequest) {
  const { userId } = await request.json();
  if (!userId) return NextResponse.json({ error: "userId is required" }, { status: 400 });

  const since = new Date();
  since.setDate(since.getDate() - 30);

  const todos = await prisma.todo.findMany({
    where: { userId, createdAt: { gte: since } },
    include: { project: true },
  });

  const byWeekday = todos.reduce<Record<string, number>>((acc, t) => {
    if (!t.completedAt) return acc;
    const key = t.completedAt.getDay().toString();
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const prompt = `업무 패턴 인사이트 3개를 만들어줘.\n최근 30일 투두: ${JSON.stringify(todos)}\n요일별 완료 집계: ${JSON.stringify(byWeekday)}`;
  const data = await generateGeminiJson<InsightsResponse>(prompt);

  return NextResponse.json({ ...data, aggregates: { byWeekday } });
}
