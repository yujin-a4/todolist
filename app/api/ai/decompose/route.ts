import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateGeminiJson } from "@/lib/gemini";

type DecomposeResponse = {
  todos: { title: string; priority: "high" | "medium" | "low"; dueDate: string; description?: string }[];
};

export async function POST(request: NextRequest) {
  const { projectId, goal, deadline, teamSize } = await request.json();
  if (!projectId || !goal || !deadline || !teamSize) {
    return NextResponse.json({ error: "projectId, goal, deadline, teamSize are required" }, { status: 400 });
  }

  const existingTodos = await prisma.todo.findMany({ where: { projectId }, select: { title: true } });
  const prompt = `프로젝트 자동 분해를 해줘.
입력: ${JSON.stringify({ goal, deadline, teamSize })}
기존 투두(중복 방지): ${JSON.stringify(existingTodos)}`;

  const data = await generateGeminiJson<DecomposeResponse>(prompt);
  return NextResponse.json(data);
}
