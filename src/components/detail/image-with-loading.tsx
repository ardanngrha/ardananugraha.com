'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ImageSkeleton } from './loading-skeletons';
import { ImageWithLoadingProps } from '@/types/shared';

export function ImageWithLoading({
  src,
  alt,
  fill = false,
  width,
  height,
  className,
  aspectRatio = 'aspect-video',
  priority = false,
  sizes,
  onLoad,
  onError,
}: ImageWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  useEffect(() => {
    if (priority) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [src, priority]);

  if (hasError) {
    return (
      <div
        className={cn(
          'relative overflow-hidden rounded-lg bg-muted flex items-center justify-center',
          aspectRatio,
          className,
        )}
        role="img"
        aria-label={`Failed to load image: ${alt}`}
      >
        <div className="text-center text-muted-foreground p-4">
          <svg
            className="w-12 h-12 mx-auto mb-2 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm" role="status">
            Failed to load image
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg',
        aspectRatio,
        className,
      )}
    >
      {isLoading && !priority && (
        <ImageSkeleton
          className="absolute inset-0 z-10"
          aspectRatio={aspectRatio}
        />
      )}

      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={cn(
          'object-cover transition-opacity duration-300',
          isLoading && !priority ? 'opacity-0' : 'opacity-100',
        )}
        priority={priority}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
      />

      {!isLoading && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </div>
  );
}

// Specialized component for hero images
export function HeroImageWithLoading({
  src,
  alt,
  className,
  onLoad,
  onError,
}: {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}) {
  return (
    <ImageWithLoading
      src={src}
      alt={alt}
      fill
      className={cn('w-full h-64 md:h-80 lg:h-96', className)}
      aspectRatio=""
      priority
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
      onLoad={onLoad}
      onError={onError}
    />
  );
}

// Specialized component for card images
export function CardImageWithLoading({
  src,
  alt,
  className,
  onLoad,
  onError,
}: {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}) {
  return (
    <ImageWithLoading
      src={src}
      alt={alt}
      fill
      className={className}
      aspectRatio="aspect-video"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onLoad={onLoad}
      onError={onError}
    />
  );
}
