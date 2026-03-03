import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId is required" }, { status: 400 });

  const projects = await prisma.project.findMany({
    where: { userId },
    include: { todos: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const project = await prisma.project.create({ data: body });
  return NextResponse.json(project, { status: 201 });
}
