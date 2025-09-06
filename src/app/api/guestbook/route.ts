import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database/drizzle';
import { comments, users } from '@/database/schema';
import { getSession } from '@/lib/auth';
import { asc, eq } from 'drizzle-orm';

export async function GET() {
  try {
    const allComments = await db.query.comments.findMany({
      with: {
        author: true,
      },
      orderBy: [asc(comments.createdAt)],
    });

    return NextResponse.json(allComments, {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-cache',
        },
      },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content } = await req.json();
    const { id: userId, username } = session.user;

    if (!content || !userId || !username) {
      return NextResponse.json(
        { error: 'Content and user identifiers are required' },
        { status: 400 },
      );
    }

    const [user] = await db.select().from(users).where(eq(users.id, userId));

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await db.insert(comments).values({
      userId: user.id,
      content,
    });

    return NextResponse.json(
      { message: 'Comment added' },
      {
        status: 201,
        headers: {
          'Cache-Control': 'no-cache',
        },
      },
    );
  } catch (error) {
    console.error('Failed to post comment:', error);
    return NextResponse.json(
      { error: 'Failed to post comment' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-cache',
        },
      },
    );
  }
}
