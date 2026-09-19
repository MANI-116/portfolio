"use client";

import type { ComponentType } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Eye, FileText } from "lucide-react";
import { profile } from "@/lib/portfolio";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { handleCvClick, useCv } from "@/components/cv/cv-provider";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.075, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

type HeroAction = {
  label: string;
  Icon: ComponentType<{ className?: string }>;
  href: string;
  external: boolean;
  cv?: boolean;
};

const actions: HeroAction[] = [
  { label: "View Projects", Icon: Eye, href: "#projects", external: false },
  { label: "GitHub", Icon: GithubIcon, href: profile.github, external: true },
  {
    label: "LinkedIn",
    Icon: LinkedinIcon,
    href: profile.linkedin,
    external: true,
  },
  {
    label: "Résumé",
    Icon: FileText,
    href: profile.resume,
    external: true,
    cv: true,
  },
];

export function Hero() {
  const { openCv } = useCv();

  return (
    <div className="flex w-full flex-col">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex items-center justify-start pb-8"
      >
        <span className="inline-flex items-center gap-2 rounded-full border-0 bg-highlight-yellow/40 px-3 py-1 font-label-badge text-label-badge text-on-surface">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-a" />
          <AnimatedShinyText className="text-on-surface/80">
            Let&apos;s work together
          </AnimatedShinyText>
        </span>
      </motion.div>

      <section
        id="work"
        className="mb-space-2xl grid scroll-mt-24 grid-cols-1 items-start gap-8 md:grid-cols-12"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col md:col-span-8"
        >
          <motion.h1
            variants={item}
            className="mb-3 font-display-hero text-display-hero-mobile tracking-tight text-primary text-balance md:text-display-hero"
          >
            Hey, I&apos;m{" "}
            <span className="relative inline-block font-extrabold">
              {profile.firstName}
              <svg
                className="absolute -bottom-1 left-0 w-full overflow-visible"
                fill="none"
                height="8"
                preserveAspectRatio="none"
                viewBox="0 0 100 8"
                aria-hidden
              >
                <motion.path
                  d="M0 5C20 1 40 7 60 4C80 1 95 6 100 3"
                  stroke="var(--color-accent-a)"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
                />
              </svg>
            </span>
          </motion.h1>

          <motion.h2
            variants={item}
            className="mb-5 font-headline-lg text-headline-md tracking-tight text-primary md:text-headline-lg"
          >
            {profile.role}
          </motion.h2>

          <motion.p
            variants={item}
            className="mb-3 max-w-xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant text-pretty"
          >
            {profile.tagline}
          </motion.p>

          <motion.p
            variants={item}
            className="mb-6 font-body-md text-body-md text-outline"
          >
            {profile.aside}
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-3"
          >
            {actions.map((action) => (
              <motion.a
                key={action.label}
                href={action.href}
                type={action.cv ? "application/pdf" : undefined}
                onClick={
                  action.cv
                    ? (event) => handleCvClick(event, openCv)
                    : undefined
                }
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18, ease: EASE }}
                className="inline-flex items-center gap-2 rounded-lg bg-surface-card px-4 py-2 font-headline-sm text-body-sm text-primary shadow-sm transition-colors duration-150 hover:bg-surface-muted"
              >
                <action.Icon className="h-4 w-4" />
                <span>{action.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          className="flex justify-center md:col-span-4 md:justify-end"
        >
          <div className="relative flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-full bg-accent-a opacity-15 blur-3xl"
            />
            <div className="relative flex h-full w-full items-center justify-center rounded-full border border-border-subtle bg-surface-card p-[3px] shadow-[0_0_60px_-24px_var(--color-accent-a)]">
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full border border-primary/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-surface-card shadow-[0_0_10px_var(--color-accent-a)]" />
              </motion.span>

              <div className="relative h-full w-full overflow-hidden rounded-full bg-primary-container">
                <Image
                  src={profile.avatar}
                  alt="Portrait of Vathala Manikantha Narapa Reddy"
                  fill
                  sizes="(max-width: 640px) 176px, 208px"
                  priority
                  className="object-cover grayscale contrast-125 transition-[filter,transform] duration-700 ease-out hover:scale-[1.04] hover:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-2 text-center">
                  <span className="font-label-mono-tag text-label-mono-tag uppercase tracking-widest text-surface-container-lowest">
                    {profile.school}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
