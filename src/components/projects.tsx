"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Terminal } from "lucide-react";
import { profile, projects, type Project } from "@/lib/portfolio";
import { Reveal } from "@/components/reveal";
import { MagicCard } from "@/components/ui/magic-card";

const EASE = [0.22, 1, 0.36, 1] as const;

function ProjectCard({ project }: { project: Project }) {
  return (
    <MagicCard className="flex w-full flex-col transition-transform duration-300 ease-out hover:-translate-y-1">
      <ProjectVisual variant={project.visual} />

      <div className="flex flex-1 flex-col p-5">
        <span className="mb-1 font-label-mono-tag text-label-mono-tag uppercase tracking-wider text-outline">
          {project.category}
        </span>
        <h4 className="mb-2 flex items-center justify-between font-headline-sm text-headline-sm text-primary">
          <span>{project.title}</span>
          <ArrowUpRight className="h-[18px] w-[18px] text-on-surface-variant transition-transform duration-200 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5" />
        </h4>
        <p className="mb-4 flex-1 font-body-sm text-body-sm leading-relaxed text-on-surface-variant text-pretty">
          {project.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-surface-muted px-2 py-0.5 font-code-inline text-[11px] text-on-surface-variant"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-surface-variant/40 pt-3 font-label-badge text-label-badge text-on-surface-variant">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold transition-colors hover:text-primary"
          >
            {project.live && (
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
            )}
            <span>{project.linkLabel}</span>
            {project.live ? (
              <ArrowUpRight className="h-[13px] w-[13px]" />
            ) : (
              <Terminal className="h-[13px] w-[13px]" />
            )}
          </a>
          <span className="font-code-inline text-[11px] text-outline">
            {project.footer}
          </span>
        </div>
      </div>
    </MagicCard>
  );
}

function ProjectVisual({ variant }: { variant: Project["visual"] }) {
  return (
    <div className="relative flex h-48 items-center justify-center overflow-hidden bg-surface-container-low p-4">
      {variant === "orderbook" ? <OrderbookVisual /> : <TerminalVisual />}
    </div>
  );
}

function OrderbookVisual() {
  return (
    <div className="flex h-full w-full flex-col justify-between rounded-lg bg-primary-container p-3 shadow-inner">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-error" />
          <span className="h-2.5 w-2.5 rounded-full bg-highlight-yellow" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <span className="font-label-mono-tag text-[10px] uppercase text-surface-container-lowest/70">
          ETH-PERP • 0.2ms MATCH
        </span>
      </div>

      <div className="py-2">
        <svg
          className="h-14 w-full text-emerald-400"
          fill="none"
          viewBox="0 0 200 40"
          preserveAspectRatio="none"
          aria-hidden
        >
          <motion.path
            d="M0 30 Q 30 10, 60 22 T 120 12 T 160 25 T 200 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0.4 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.6, ease: EASE }}
          />
          <motion.path
            d="M0 30 Q 30 10, 60 22 T 120 12 T 160 25 T 200 6 L 200 40 L 0 40 Z"
            fill="currentColor"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.08 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </svg>
      </div>

      <div className="flex items-center justify-between font-label-mono-tag text-[10px] text-surface-container-lowest/60">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
          ORDERBOOK: SYNCED
        </span>
        <span>WEBSOCKETS: CONNECTED</span>
      </div>
    </div>
  );
}

const terminalLines = [
  { text: "> Invoking tool: executeRefactor()", className: "text-emerald-400" },
  {
    text: "> JSON Schema validation: OK",
    className: "text-surface-container-lowest/80",
  },
  {
    text: "> Summarizing context buffer (128k → 4k)...",
    className: "text-surface-container-lowest/50",
  },
];

function TerminalVisual() {
  return (
    <div className="flex h-full w-full flex-col justify-between rounded-lg bg-primary-container p-3 font-code-inline text-[11px] text-surface-container-lowest shadow-inner">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-error" />
        <span className="h-2.5 w-2.5 rounded-full bg-highlight-yellow" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 text-[10px] text-surface-container-lowest/60">
          cli-agent --stream
        </span>
      </div>

      <div className="my-auto space-y-1 text-[11px]">
        {terminalLines.map((line, index) => (
          <p
            key={line.text}
            className={`overflow-hidden whitespace-nowrap ${line.className}`}
          >
            <motion.span
              className="inline-block"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: 0.9,
                delay: 0.35 + index * 0.55,
                ease: "easeOut",
              }}
            >
              {line.text}
            </motion.span>
            {index === terminalLines.length - 1 && (
              <span className="cursor-blink ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-emerald-400" />
            )}
          </p>
        ))}
      </div>

      <div className="flex items-center justify-between text-[10px] text-surface-container-lowest/60">
        <span>VERCEL AI SDK</span>
        <span>NODE ENVIRONMENT</span>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="mb-space-2xl scroll-mt-24">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 font-label-mono-tag text-label-mono-tag uppercase tracking-wider text-outline">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-a" />
            Projects
          </h3>
          <p className="mt-1 font-headline-lg text-headline-md text-primary">
            Proof of Work
          </p>
        </div>
        <a
          className="inline-flex items-center gap-1 font-label-badge text-label-badge text-on-surface-variant transition-colors hover:text-primary"
          href={profile.github}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>all repos</span>
          <ArrowUpRight className="h-[14px] w-[14px]" />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.08} className="flex">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
