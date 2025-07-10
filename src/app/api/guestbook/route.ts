import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { comments, users } from "@/lib/schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const allComments = await db.query.comments.findMany({
      with: {
        author: true,
      },
      orderBy: [desc(comments.createdAt)],
    });

    return NextResponse.json(allComments);
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await req.json();
    const { name, image, email } = session.user;
    
    // Use email as the primary identifier instead of GitHub ID
    if (!content || !email) {
      return NextResponse.json(
        { error: "Content and email are required" },
        { status: 400 }
      );
    }
    
    console.log('Session user:', session.user);
    console.log('Email:', email);

    // Upsert the user using email instead of githubId
    const [user] = await db
      .insert(users)
      .values({
        githubId: email, // Using email in the githubId field, or you might want to rename this field
        username: name || "Anonymous",
        avatarUrl: image,
      })
      .onConflictDoUpdate({
        target: users.githubId, // This should match your database constraint
        set: { username: name || "Anonymous", avatarUrl: image },
      })
      .returning();

    // Insert the new comment
    await db.insert(comments).values({
      userId: user.id,
      content,
    });

    return NextResponse.json({ message: "Comment added" }, { status: 201 });
  } catch (error) {
    console.error("Failed to post comment:", error);
    return NextResponse.json(
      { error: "Failed to post comment" },
      { status: 500 }
    );
  }
}