"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Tone, TerminalLine } from "./commands";
import { useTerminal } from "./use-terminal";

const toneClass: Record<Tone, string> = {
  default: "text-surface-container-lowest/90",
  muted: "text-surface-container-lowest/50",
  success: "text-emerald-400",
  error: "text-red-400",
  accent: "text-amber-300",
  command: "text-surface-container-lowest/70",
};

function Line({ line }: { line: TerminalLine }) {
  const className = cn(
    "whitespace-pre-wrap break-words",
    toneClass[line.tone],
  );

  if (line.href) {
    return (
      <p className={className}>
        <a
          href={line.href}
          target={line.external ? "_blank" : undefined}
          rel={line.external ? "noopener noreferrer" : undefined}
          className="underline decoration-dotted underline-offset-4 transition-colors hover:text-emerald-400"
        >
          {line.text}
        </a>
      </p>
    );
  }

  if (line.tone === "command") {
    return (
      <p className={className}>
        <span className="text-emerald-400">$ </span>
        {line.text}
      </p>
    );
  }

  return <p className={className}>{line.text}</p>;
}

type TerminalProps = {
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenLink: (href: string) => void;
  onAccent: (id: string) => void;
};

export function Terminal({
  onClose,
  onNavigate,
  onOpenLink,
  onAccent,
}: TerminalProps) {
  const {
    lines,
    input,
    setInput,
    submit,
    onKeyDown,
    suggestions,
    complete,
  } = useTerminal({ onClose, onNavigate, onOpenLink, onAccent });

  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const node = logRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [lines]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center"
    >
      <button
        type="button"
        aria-label="Close terminal"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-primary/30 backdrop-blur-sm"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Interactive terminal"
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 28, scale: 0.98 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex h-[72vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-white/10 bg-primary-container text-surface-container-lowest shadow-2xl sm:h-[460px] sm:rounded-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-error" />
            <span className="h-2.5 w-2.5 rounded-full bg-highlight-yellow" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="ml-2 font-label-mono-tag text-[11px] text-surface-container-lowest/60">
              manikantha@portfolio — zsh
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close terminal"
            className="flex h-7 w-7 items-center justify-center rounded-full text-surface-container-lowest/60 transition-colors hover:bg-white/10 hover:text-surface-container-lowest"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div
          ref={logRef}
          aria-live="polite"
          className="flex-1 space-y-1 overflow-y-auto px-4 py-4 font-code-inline text-[12px] leading-relaxed sm:text-[13px]"
        >
          {lines.map((line) => (
            <Line key={line.id} line={line} />
          ))}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
          className="relative border-t border-white/10 px-4 py-3"
        >
          {suggestions.length > 0 && (
            <ul className="absolute bottom-full left-3 right-3 mb-2 max-h-44 overflow-y-auto rounded-xl border border-white/10 bg-primary-container/95 p-1 shadow-xl backdrop-blur">
              {suggestions.map((name) => (
                <li key={name}>
                  <button
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault();
                      complete(name);
                      inputRef.current?.focus();
                    }}
                    className="w-full rounded-lg px-3 py-1.5 text-left font-code-inline text-[12px] text-surface-container-lowest/70 transition-colors hover:bg-white/10 hover:text-surface-container-lowest"
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center gap-2">
            <span className="shrink-0 font-code-inline text-[12px] text-emerald-400 sm:text-[13px]">
              guest@manikantha:~$
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              aria-label="Terminal input"
              placeholder="type /help"
              className="w-full bg-transparent font-code-inline text-[12px] text-surface-container-lowest caret-emerald-400 outline-none placeholder:text-surface-container-lowest/30 sm:text-[13px]"
            />
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
