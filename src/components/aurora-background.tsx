import type { CSSProperties } from "react";

const blobs: { className: string; color: string; style: CSSProperties }[] = [
  {
    className: "h-[44vmax] w-[44vmax] -left-[12vmax] -top-[14vmax]",
    color: "var(--color-accent-a)",
    style: { animationDelay: "-2s", animationDuration: "28s" },
  },
  {
    className: "h-[38vmax] w-[38vmax] -right-[10vmax] -top-[8vmax]",
    color: "var(--color-accent-c)",
    style: { animationDelay: "-8s", animationDuration: "32s" },
  },
  {
    className: "h-[34vmax] w-[34vmax] left-[28%] top-[34%]",
    color: "var(--color-accent-b)",
    style: { animationDelay: "-14s", animationDuration: "36s" },
  },
  {
    className: "h-[40vmax] w-[40vmax] right-[6%] bottom-[-14vmax]",
    color: "var(--color-accent-d)",
    style: { animationDelay: "-5s", animationDuration: "30s" },
  },
  {
    className: "h-[30vmax] w-[30vmax] -left-[8vmax] bottom-[2%]",
    color: "var(--color-accent-b)",
    style: { animationDelay: "-20s", animationDuration: "34s" },
  },
];

export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-[0.34]"
    >
      {blobs.map((blob, index) => (
        <div
          key={index}
          className={`aurora-blob ${blob.className}`}
          style={{
            background: `radial-gradient(circle at center, ${blob.color}, transparent 66%)`,
            ...blob.style,
          }}
        />
      ))}
    </div>
  );
}
