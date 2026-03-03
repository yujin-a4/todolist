import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId is required" }, { status: 400 });

  const todos = await prisma.todo.findMany({
    where: { userId },
    include: { project: true },
    orderBy: [{ dueDate: "asc" }, { order: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const todo = await prisma.todo.create({ data: body });
  return NextResponse.json(todo, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  if (!body.id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const todo = await prisma.todo.update({ where: { id: body.id }, data: body });
  return NextResponse.json(todo);
}
