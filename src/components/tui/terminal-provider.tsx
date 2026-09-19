"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence } from "motion/react";
import { Terminal as TerminalIcon } from "lucide-react";
import { setAccent } from "@/lib/accent";

const Terminal = dynamic(
  () => import("./terminal").then((mod) => mod.Terminal),
  { ssr: false },
);

type TerminalContextValue = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const TerminalContext = createContext<TerminalContextValue | null>(null);

export function useTerminalController() {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error("useTerminalController must be used within TerminalProvider");
  }
  return context;
}

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const navigate = useCallback((sectionId: string) => {
    setOpen(false);
    const target = document.getElementById(sectionId);
    if (!target) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.requestAnimationFrame(() => {
      target.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    });
  }, []);

  const openLink = useCallback((href: string) => {
    const isProtocolHandler =
      href.startsWith("mailto:") || href.startsWith("tel:");
    if (isProtocolHandler) {
      window.location.href = href;
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing = Boolean(
        target &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable),
      );

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }

      if (event.key === "Escape" && open) {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key === "/" && !typing && !open) {
        event.preventDefault();
        setOpen(true);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <TerminalContext.Provider value={{ open, setOpen }}>
      {children}

      <AnimatePresence>
        {open && (
          <Terminal
            key="terminal"
            onClose={() => setOpen(false)}
            onNavigate={navigate}
            onOpenLink={openLink}
            onAccent={setAccent}
          />
        )}
      </AnimatePresence>

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open terminal"
          aria-keyshortcuts="Control+K Meta+K"
          className="group fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-badge-border bg-surface-card py-2 pl-3 pr-4 shadow-[0_4px_20px_-2px_rgba(24,24,27,0.08)] transition-all hover:bg-surface-muted"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <TerminalIcon className="h-4 w-4 text-on-surface-variant transition-colors group-hover:text-primary" />
          <span className="font-label-mono-tag text-label-mono-tag text-on-surface-variant transition-colors group-hover:text-primary">
            terminal
          </span>
          <kbd className="hidden rounded border border-badge-border bg-surface-muted px-1.5 py-0.5 font-code-inline text-[10px] text-outline sm:inline">
            ⌘K
          </kbd>
        </button>
      )}
    </TerminalContext.Provider>
  );
}
