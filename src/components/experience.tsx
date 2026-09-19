"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Medal } from "lucide-react";
import { experience } from "@/lib/portfolio";
import { Reveal } from "@/components/reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

const ringClass: Record<string, string> = {
  primary: "ring-primary",
  outline: "ring-outline",
  "outline-variant": "ring-outline-variant",
};

function HighlightedText({
  text,
  highlight,
}: {
  text: string;
  highlight?: string;
}) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>;
  const [before, ...rest] = text.split(highlight);
  return (
    <>
      {before}
      <span className="rounded bg-surface-muted px-1.5 py-0.5 font-code-inline text-code-inline text-primary">
        {highlight}
      </span>
      {rest.join(highlight)}
    </>
  );
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="mb-space-2xl scroll-mt-24">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-label-mono-tag text-label-mono-tag uppercase tracking-wider text-outline">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-a" />
          Experience • Timeline
        </h3>
        <span className="font-code-inline text-xs text-outline">
          2021 — Present
        </span>
      </div>

      <div ref={ref} className="relative space-y-6 pl-6 md:pl-8">
        <div className="absolute bottom-3 left-2 top-3 w-px bg-surface-variant" />
        <motion.div
          aria-hidden
          style={{ scaleY }}
          className="absolute bottom-3 left-2 top-3 w-px origin-top bg-accent-a"
        />

        {experience.map((job, index) => (
          <div key={job.company} className="group relative">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
              className={`absolute -left-[21px] top-6 h-3 w-3 rounded-full bg-surface-card ring-2 ring-offset-2 ring-offset-canvas-bg md:-left-[29px] ${ringClass[job.ring]}`}
            />

            <Reveal
              delay={index * 0.05}
              className="rounded-xl bg-surface-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <div className="mb-2 flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <span className="font-label-mono-tag text-label-mono-tag uppercase tracking-wider text-on-surface-variant">
                  {job.period}
                </span>
                {job.badge ? (
                  <div className="inline-flex items-center gap-1 rounded bg-highlight-yellow/50 px-2 py-0.5 font-label-badge text-label-badge text-primary">
                    <Medal className="h-[13px] w-[13px]" />
                    <span>{job.badge}</span>
                  </div>
                ) : job.meta ? (
                  <span className="inline-flex items-center rounded bg-surface-muted px-2 py-0.5 font-label-badge text-label-badge text-on-surface-variant">
                    {job.meta}
                  </span>
                ) : null}
              </div>

              <h4 className="mb-1 font-headline-md text-headline-sm text-primary md:text-headline-md">
                {job.company}
                {job.role && (
                  <>
                    {" — "}
                    <span className="font-body-md text-on-surface-variant">
                      {job.role}
                    </span>
                  </>
                )}
              </h4>

              {job.headline && (
                <p className="mb-3 font-headline-sm text-body-md font-medium text-primary">
                  <HighlightedText
                    text={job.headline}
                    highlight={job.headlineCode}
                  />
                </p>
              )}

              <p className="mb-4 font-body-md text-body-md leading-relaxed text-on-surface-variant text-pretty">
                {job.summary}
              </p>

              {job.bullets.length > 0 && (
                <ul className="mb-4 space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span
                        className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                          job.accent === "primary" ? "bg-primary" : "bg-outline"
                        }`}
                      />
                      <span className="text-pretty">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {job.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-surface-muted px-2 py-0.5 font-code-inline text-xs text-on-surface-variant"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
