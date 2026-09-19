"use client";

import { useEffect, useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  FileText,
  Mail,
  Menu,
  X as CloseIcon,
} from "lucide-react";
import { navItems, profile } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/brand-icons";
import { AccentSwitcher } from "@/components/accent-switcher";
import { handleCvClick, useCv } from "@/components/cv/cv-provider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Social = {
  label: string;
  Icon: ComponentType<{ className?: string }>;
  href: string;
  cv?: boolean;
};

const socials: Social[] = [
  { label: "GitHub", Icon: GithubIcon, href: profile.github },
  { label: "LinkedIn", Icon: LinkedinIcon, href: profile.linkedin },
  { label: "X (Twitter)", Icon: XIcon, href: profile.x },
  { label: "Email", Icon: Mail, href: `mailto:${profile.email}` },
  { label: "Résumé", Icon: FileText, href: profile.resume, cv: true },
];

export function SiteHeader() {
  const { openCv } = useCv();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("work");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "bg-canvas-bg/85 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.05)]"
          : "bg-canvas-bg/40 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-margin md:px-margin-desktop">
        <div className="flex items-center gap-space-sm">
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full border border-badge-border bg-surface-card px-3 py-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-label-badge text-label-badge text-on-surface-variant">
              Available for work
            </span>
          </a>
        </div>

        <div className="flex items-center gap-space-md">
          <nav
            aria-label="Primary"
            className="hidden items-center gap-space-md sm:flex"
          >
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative py-1 font-body-sm text-body-sm transition-colors",
                    isActive
                      ? "font-semibold text-primary"
                      : "text-on-surface-variant hover:text-on-surface",
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-space-xs border-l border-badge-border pl-space-xs sm:flex">
            {socials.map(({ label, Icon, href, cv }) => (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <a
                    aria-label={label}
                    href={href}
                    type={cv ? "application/pdf" : undefined}
                    onClick={cv ? (event) => handleCvClick(event, openCv) : undefined}
                    target={
                      cv || href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      cv || href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-all hover:bg-surface-muted hover:text-primary"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>{label}</TooltipContent>
              </Tooltip>
            ))}
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-muted hover:text-primary sm:hidden"
          >
            {open ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <AccentSwitcher className="ml-space-xs shrink-0" />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-badge-border bg-canvas-bg/95 backdrop-blur-md sm:hidden"
          >
            <nav
              aria-label="Mobile"
              className="mx-auto flex max-w-4xl flex-col px-margin py-space-md"
            >
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-3 font-headline-sm text-body-md transition-colors",
                    active === item.id
                      ? "bg-surface-muted text-primary"
                      : "text-on-surface-variant hover:bg-surface-muted hover:text-primary",
                  )}
                >
                  {item.label}
                  <ArrowRight className="h-[18px] w-[18px] text-outline" />
                </a>
              ))}
              <div className="mt-space-sm flex items-center gap-space-sm border-t border-badge-border pt-space-md">
                {socials.map(({ label, Icon, href, cv }) => (
                  <a
                    key={label}
                    aria-label={label}
                    href={href}
                    type={cv ? "application/pdf" : undefined}
                    onClick={cv ? (event) => handleCvClick(event, openCv) : undefined}
                    target={
                      cv || href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      cv || href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-badge-border text-on-surface-variant transition-colors hover:text-primary"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
