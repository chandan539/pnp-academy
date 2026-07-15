import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-development-only';
const encodedSecret = new TextEncoder().encode(JWT_SECRET);

export async function GET(request: Request) {
  try {
    // Auth check
    const token = request.headers.get('cookie')?.split('auth_token=')[1]?.split(';')[0];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { payload } = await jwtVerify(token, encodedSecret);

    // Fetch tasks where assignee matches or tasks created by the user
    const tasks = await prisma.task.findMany({
      where: {
        assigneeId: payload.sub as string
      },
      include: {
        assignee: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get('cookie')?.split('auth_token=')[1]?.split(';')[0];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { payload } = await jwtVerify(token, encodedSecret);

    const body = await request.json();
    
    const task = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        status: 'TODO',
        priority: body.priority || 'MEDIUM',
        authorId: body.authorId,
        assigneeId: body.assigneeId
      }
    });

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
