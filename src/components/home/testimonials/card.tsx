import { motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';
import { Testimonial } from '@/types/testimonial';
import { Separator } from '@/components/ui/separator';

export function TestimonialCard({
  testimonial,
  isCenter,
}: {
  testimonial: Testimonial;
  isCenter: boolean;
}) {
  const [imageError, setImageError] = useState(false);

  if (!testimonial) return null;

  const handleImageError = () => {
    setImageError(true);
  };

  const showFallback = !testimonial.avatar || imageError;

  return (
    <motion.div
      className={`px-4 py-6 w-72 h-80 rounded-xl relative border ring-1 ring-inset ring-gray-200 dark:ring-zinc-700/50 ${
        isCenter
          ? 'bg-white/80 dark:bg-black/80 border-white/30 dark:border-white/20 cursor-default'
          : 'bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10 cursor-grab'
      }`}
      style={{ boxSizing: 'border-box' }}
    >
      <div className="w-full h-full backdrop-blur-md p-2 flex flex-col justify-between rounded-xl">
        <div className="flex items-center">
          <p className="text-foreground/90 leading-relaxed">
            &quot;{testimonial.content}&quot;
          </p>
        </div>

        <div className="flex flex-col">
          <Separator />
          <div className="flex flex-row gap-2 items-center mt-4">
            <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-muted text-foreground font-semibold">
              {showFallback ? (
                <span className="text-xs">
                  {testimonial.name
                    .split(' ')
                    .map((n: string) => n[0])
                    .join('')}
                </span>
              ) : (
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                  width={36}
                  height={36}
                  onError={handleImageError}
                />
              )}
            </div>
            <div className="flex flex-col justify-center">
              <div className="font-semibold text-foreground text-sm px-1 py-0.5">
                {testimonial.name}
              </div>
              <div className="text-muted-foreground text-sm px-1 pb-0.5">
                {testimonial.role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
