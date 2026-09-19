"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import { profile } from "@/lib/portfolio";

export function CvDialog({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center"
    >
      <button
        type="button"
        aria-label="Close CV viewer"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-primary/40 backdrop-blur-sm"
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-dialog-title"
        tabIndex={-1}
        onKeyDown={(event) => {
          if (event.key === "Escape") onClose();
        }}
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 28, scale: 0.98 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-badge-border bg-surface-card shadow-2xl sm:h-[86vh] sm:rounded-2xl"
      >
        <div className="flex items-center justify-between gap-4 border-b border-badge-border px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-on-surface-variant">
              <FileText className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p
                id="cv-dialog-title"
                className="truncate font-headline-sm text-body-sm text-primary"
              >
                Résumé — {profile.name}
              </p>
              <p className="font-label-mono-tag text-label-mono-tag text-outline">
                PDF · {profile.school}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <a
              href={profile.resume}
              download
              className="hidden items-center gap-1.5 rounded-lg bg-surface-muted px-3 py-1.5 font-label-badge text-label-badge text-primary transition-colors hover:bg-surface-variant sm:inline-flex"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 font-label-badge text-label-badge text-on-primary transition-colors hover:bg-primary-container sm:inline-flex"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              New tab
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-muted hover:text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative flex-1 bg-surface-muted">
          <object
            data={profile.resume}
            type="application/pdf"
            title={`Résumé — ${profile.name}`}
            className="h-full w-full"
          >
            <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
              <p className="font-body-md text-body-md text-on-surface-variant">
                Your browser can&apos;t display the PDF inline.
              </p>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-headline-sm text-body-sm text-on-primary"
              >
                <ExternalLink className="h-4 w-4" />
                Open résumé
              </a>
            </div>
          </object>
        </div>

        <div className="flex items-center gap-3 border-t border-badge-border px-4 py-3 sm:hidden">
          <a
            href={profile.resume}
            download
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-surface-muted px-3 py-2 font-label-badge text-label-badge text-primary"
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </a>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 font-label-badge text-label-badge text-on-primary"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            New tab
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
