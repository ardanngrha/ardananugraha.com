"use client";
import { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";

interface ViewCounterProps {
  slug: string;
  type: "project" | "writing";
  className?: string;
}

export function ViewCounter({ slug, type, className }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/views/${type}/${slug}`, { method: "POST" });
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (!cancelled) setViews(data.views ?? 0);
      } catch {
        if (!cancelled) setViews(0);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, type]);

  return (
    <div className={`flex items-center gap-1 ${className || ""}`}>
      <FiEye className="w-4 h-4" aria-hidden="true" />
      <span>{views === null ? "—" : views}</span>
      <span>Views</span>
    </div>
  );
}