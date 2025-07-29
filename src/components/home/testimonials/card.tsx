import { motion } from "motion/react";
import Image from "next/image";
import { Testimonial } from "@/types/testimonial";

export function TestimonialCard({
  testimonial,
  isCenter,
}: {
  testimonial: Testimonial;
  isCenter: boolean;
}) {
  if (!testimonial) return null;

  return (
    <motion.div
      className="w-80 h-96 relative cursor-grab"
      style={{ boxSizing: "border-box" }}
      whileHover={{
        scale: isCenter ? 1.05 : 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <div
        className={`w-full h-80 backdrop-blur-md border p-8 flex flex-col shadow-2xl ring-1 ring-inset ring-gray-200 dark:ring-zinc-700/50 hover:ring-primary/50 dark:hover:ring-primary/50 rounded-2xl ${isCenter
          ? "bg-white/80 dark:bg-black/80 border-white/30 dark:border-white/20"
          : "bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10"
          }`}
      >
        <div className="flex-1 flex items-center justify-center">
          <p className="text-center text-foreground/90 text-lg leading-relaxed">
            &quot;{testimonial.content}&quot;
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4 space-x-3 p-3 backdrop-blur-md bg-white/90 dark:bg-black/90 border border-white/30 dark:border-white/20 shadow-lg ring-1 ring-inset ring-gray-200 dark:ring-zinc-700/50 hover:ring-primary/50 dark:hover:ring-primary/50 rounded-2xl">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
          {testimonial.avatar ? (
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-full h-full object-cover"
              width={48}
              height={48}
            />
          ) : (
            <span className="text-sm">
              {testimonial.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </span>
          )}
        </div>
        <div className="text-center">
          <div className="font-semibold text-foreground text-sm">
            {testimonial.name}
          </div>
          <div className="text-muted-foreground text-xs">{testimonial.role}</div>
        </div>
      </div>
    </motion.div>
  );
}