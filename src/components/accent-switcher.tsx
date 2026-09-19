"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Palette } from "lucide-react";
import {
  ACCENTS,
  DEFAULT_ACCENT,
  getAccent,
  setAccent,
  subscribeAccent,
} from "@/lib/accent";
import { cn } from "@/lib/utils";

export function AccentSwitcher({ className }: { className?: string }) {
  const accent = useSyncExternalStore(subscribeAccent, getAccent, () => DEFAULT_ACCENT);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full z-50 mt-2 w-44 rounded-2xl border border-badge-border bg-surface-card p-2 shadow-[0_16px_48px_-12px_rgba(24,24,27,0.28)]"
          >
            <p className="px-2 py-1 font-label-mono-tag text-label-mono-tag uppercase tracking-wider text-outline">
              Accent
            </p>
            {ACCENTS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setAccent(option.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-2 py-2 text-left transition-colors hover:bg-surface-muted",
                  accent === option.id && "bg-surface-muted",
                )}
              >
                <span className="flex items-center gap-2">
                  <span className="flex -space-x-1">
                    {option.swatch.map((color) => (
                      <span
                        key={color}
                        className="h-3.5 w-3.5 rounded-full border border-surface-card"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </span>
                  <span className="font-label-badge text-label-badge text-primary">
                    {option.label}
                  </span>
                </span>
                {accent === option.id && (
                  <Check className="h-3.5 w-3.5 text-primary" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Change accent color"
        title="Change accent color"
        className="ring-gradient flex h-8 w-8 items-center justify-center rounded-full p-[1.5px] transition-transform hover:scale-105"
      >
        <span className="flex h-full w-full items-center justify-center rounded-full bg-primary">
          <Palette className="h-[15px] w-[15px] text-on-primary" />
        </span>
      </button>
    </div>
  );
}
