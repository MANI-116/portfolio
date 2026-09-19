import { ArrowUpRight, Phone } from "lucide-react";
import { profile } from "@/lib/portfolio";
import { Reveal } from "@/components/reveal";

const quickLinks = [
  { label: "GitHub", href: profile.github, external: true },
  { label: "LinkedIn", href: profile.linkedin, external: true },
  { label: "X", href: profile.x, external: true },
  { label: profile.email, href: `mailto:${profile.email}`, external: false },
];

export function Cta() {
  return (
    <section id="contact" className="scroll-mt-24">
      <Reveal className="relative overflow-hidden rounded-2xl bg-surface-card p-8 shadow-sm md:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-40px] top-1/2 hidden -translate-y-1/2 opacity-20 md:block"
        >
          <svg
            fill="none"
            height="340"
            viewBox="0 0 300 300"
            width="340"
            className="animate-orbit"
          >
            <circle
              cx="150"
              cy="150"
              r="140"
              stroke="var(--color-accent-a)"
              strokeDasharray="4 4"
              strokeWidth="1"
            />
            <circle
              cx="150"
              cy="150"
              r="90"
              stroke="var(--color-accent-b)"
              strokeDasharray="2 2"
              strokeWidth="1"
            />
            <circle
              cx="150"
              cy="150"
              r="40"
              stroke="var(--color-accent-c)"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-xl">
          <span className="mb-3 flex items-center gap-2 font-label-mono-tag text-label-mono-tag uppercase tracking-wider text-outline">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-a" />
            Open to Work
          </span>
          <h3 className="mb-4 font-display-hero text-display-hero-mobile tracking-tight text-primary text-balance md:text-display-hero">
            Let&apos;s build something{" "}
            <span className="font-normal text-outline">worth shipping</span>
          </h3>
          <p className="mb-6 font-body-lg text-body-lg text-on-surface-variant text-pretty">
            Available for software engineering roles, high-concurrency
            distributed systems development, and full stack contracts.
          </p>

          <div className="mb-8 flex flex-wrap items-center gap-4">
            <a
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-headline-sm text-body-sm text-on-primary shadow-md transition-colors hover:bg-primary-container"
              href={`mailto:${profile.email}`}
            >
              <span>Email me</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-lg bg-surface-muted px-5 py-3 font-headline-sm text-body-sm text-primary transition-colors hover:bg-surface-variant"
              href={`tel:${profile.phone}`}
            >
              <Phone className="h-4 w-4" />
              <span>{profile.phoneDisplay}</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-label-badge text-label-badge text-on-surface-variant">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                className="flex items-center gap-0.5 transition-colors hover:text-primary"
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                <span>{link.label}</span>
                <span className="text-[10px]">↗</span>
              </a>
            ))}
            <span className="text-outline">•</span>
            <span className="text-outline">NIT Hamirpur Alum</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
