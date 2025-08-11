import { NextResponse, NextRequest } from "next/server";
import { db } from "@/database/drizzle";
import { contentViews } from "@/database/schema";
import { eq, and, sql } from "drizzle-orm";

/**
 * NOTE (Next.js 15): dynamic route handlers receive
 * second arg: { params: Promise<Record<string,string>> }
 * so we must await params before destructuring.
 */

type ViewParams = { type: string; slug: string };

// Optional: restrict allowed types at runtime
function normalizeType(t: string): "project" | "writing" {
  return t === "project" ? "project" : "writing";
}

// GET current view count
export async function GET(
  _req: NextRequest,
  context: { params: Promise<ViewParams> }
) {
  const { type, slug } = await context.params;
  const safeType = normalizeType(type);

  const row = await db.query.contentViews.findFirst({
    where: and(eq(contentViews.type, safeType), eq(contentViews.slug, slug)),
  });

  return NextResponse.json({
    type: safeType,
    slug,
    views: row?.count ?? 0,
    lastViewedAt: row?.lastViewedAt ?? null,
  });
}

// Increment + return
export async function POST(
  _req: NextRequest,
  context: { params: Promise<ViewParams> }
) {
  const { type, slug } = await context.params;
  const safeType = normalizeType(type);

  const inserted = await db
    .insert(contentViews)
    .values({ type: safeType, slug, count: 1 })
    .onConflictDoUpdate({
      target: [contentViews.type, contentViews.slug],
      set: {
        count: sql`${contentViews.count} + 1`,
        lastViewedAt: new Date(),
      },
    })
    .returning({
      count: contentViews.count,
      lastViewedAt: contentViews.lastViewedAt,
    });

  const { count, lastViewedAt } = inserted[0];
  return NextResponse.json({
    type: safeType,
    slug,
    views: count,
    lastViewedAt,
  });
}