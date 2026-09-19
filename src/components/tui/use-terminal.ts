"use client";

import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  commandNames,
  findCommand,
  suggestCommand,
  type LineDraft,
  type TerminalApi,
  type TerminalLine,
} from "./commands";

let lineCounter = 0;
const nextLineId = () => `line-${++lineCounter}`;

const WELCOME: LineDraft[] = [
  { tone: "accent", text: "manikantha.sh — interactive shell" },
  {
    tone: "muted",
    text: "Type /help to list commands, or /projects to explore.",
  },
];

type Options = {
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenLink: (href: string) => void;
  onAccent: (id: string) => void;
};

export function useTerminal({
  onClose,
  onNavigate,
  onOpenLink,
  onAccent,
}: Options) {
  const [lines, setLines] = useState<TerminalLine[]>(() =>
    WELCOME.map((draft) => ({ id: nextLineId(), ...draft })),
  );
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const historyIndex = useRef<number | null>(null);

  const print = useCallback((drafts: LineDraft[]) => {
    if (!drafts.length) return;
    setLines((prev) => [
      ...prev,
      ...drafts.map((draft) => ({ id: nextLineId(), ...draft })),
    ]);
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const api: TerminalApi = useMemo(
    () => ({
      print,
      clear,
      close: onClose,
      navigate: onNavigate,
      openLink: onOpenLink,
      setAccent: onAccent,
    }),
    [print, clear, onClose, onNavigate, onOpenLink, onAccent],
  );

  const suggestions = useMemo(() => {
    const value = input.trim();
    if (!value.startsWith("/") || value.includes(" ")) return [];
    const names = commandNames();
    if (value === "/") return names;
    return names.filter((name) => name.startsWith(value.toLowerCase()));
  }, [input]);

  const execute = useCallback(
    (raw: string) => {
      const value = raw.trim();
      if (!value) return;
      print([{ tone: "command", text: value }]);
      setHistory((prev) =>
        prev[prev.length - 1] === value ? prev : [...prev, value],
      );
      historyIndex.current = null;

      const [name, ...args] = value.split(/\s+/);
      const command = findCommand(name);
      if (!command) {
        const near = suggestCommand(name);
        print([{ tone: "error", text: `command not found: ${name}` }]);
        print([
          {
            tone: "muted",
            text: near
              ? `did you mean ${near}? type /help`
              : "type /help to see commands",
          },
        ]);
        return;
      }
      command.run(args, api);
    },
    [api, print],
  );

  const submit = useCallback(() => {
    execute(input);
    setInput("");
  }, [execute, input]);

  const moveHistory = useCallback(
    (direction: number) => {
      if (history.length === 0) return;
      const current = historyIndex.current ?? history.length;
      let next = current + direction;
      if (next < 0) next = 0;
      if (next > history.length) next = history.length;
      historyIndex.current = next;
      setInput(next >= history.length ? "" : history[next]);
    },
    [history],
  );

  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        moveHistory(-1);
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        moveHistory(1);
        return;
      }
      if (event.key === "Tab" && suggestions.length) {
        event.preventDefault();
        setInput(`${suggestions[0]} `);
        return;
      }
      if (event.key === "l" && event.ctrlKey) {
        event.preventDefault();
        clear();
      }
    },
    [moveHistory, suggestions, clear],
  );

  const complete = useCallback((name: string) => {
    setInput(`${name} `);
  }, []);

  return {
    lines,
    input,
    setInput,
    submit,
    onKeyDown,
    suggestions,
    clear,
    complete,
  };
}
