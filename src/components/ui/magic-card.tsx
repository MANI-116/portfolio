"use client";

import React, { useCallback, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface MagicCardProps {
  children?: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientFrom?: string;
  gradientTo?: string;
  gradientColor?: string;
}

export function MagicCard({
  children,
  className,
  gradientSize = 300,
  gradientFrom = "var(--color-accent-a)",
  gradientTo = "var(--color-accent-c)",
  gradientColor = "rgba(24, 24, 27, 0.06)",
}: MagicCardProps) {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const reset = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [gradientSize, mouseX, mouseY]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      className={cn(
        "group/card relative isolate overflow-hidden rounded-xl border border-transparent",
        className,
      )}
      style={{
        background: useMotionTemplate`
          linear-gradient(var(--color-surface-card) 0 0) padding-box,
          radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
            ${gradientFrom},
            ${gradientTo},
            var(--color-border-subtle) 100%
          ) border-box
        `,
      }}
    >
      <div className="absolute inset-px z-20 rounded-xl bg-surface-card" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-px z-30 rounded-xl opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)`,
        }}
      />
      <div className="relative z-40 h-full">{children}</div>
    </motion.div>
  );
}
