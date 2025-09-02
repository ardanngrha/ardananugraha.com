'use client';
import { useEffect, useState } from 'react';
import { ViewCounterProps } from '@/types/shared';
import { getIcon } from '@/lib/icons';

export function ViewCounter({ slug, type, className }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/views/${type}/${slug}`, {
          method: 'POST',
        });
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
    <div className={`flex items-center gap-1 ${className || ''}`}>
      {getIcon('Eye', 'w-4 h-4')}
      <span>{views === null ? '—' : views}</span>
      <span>Views</span>
    </div>
  );
}
