"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { AnimatePresence } from "motion/react";
import { profile } from "@/lib/portfolio";

const CvDialog = dynamic(
  () => import("./cv-dialog").then((mod) => mod.CvDialog),
  { ssr: false },
);

type CvContextValue = { openCv: () => void };

const CvContext = createContext<CvContextValue | null>(null);

export function useCv() {
  const context = useContext(CvContext);
  if (!context) {
    throw new Error("useCv must be used within CvProvider");
  }
  return context;
}

/**
 * On touch / small screens the native PDF viewer is a better experience than an
 * embedded frame, so we open the file directly instead of the modal.
 */
function prefersNativeViewer() {
  if (typeof window === "undefined") return true;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const smallScreen = window.matchMedia("(max-width: 640px)").matches;
  const isIOS =
    /iP(hone|ad|od)/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  return coarsePointer || smallScreen || isIOS;
}

export function CvProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openCv = useCallback(() => {
    if (prefersNativeViewer()) {
      window.open(profile.resume, "_blank", "noopener,noreferrer");
      return;
    }
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <CvContext.Provider value={{ openCv }}>
      {children}
      <AnimatePresence>
        {open && <CvDialog key="cv" onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </CvContext.Provider>
  );
}

/** Anchor click handler that upgrades a normal PDF link to the modal. */
export function handleCvClick(
  event: MouseEvent<HTMLAnchorElement>,
  openCv: () => void,
) {
  if (event.defaultPrevented) return;
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }
  event.preventDefault();
  openCv();
}
