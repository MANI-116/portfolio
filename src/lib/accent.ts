export const ACCENTS = [
  { id: "blush", label: "Blush", swatch: ["#d18ba0", "#a78bc0", "#8fb4c9"] },
  { id: "dusk", label: "Dusk", swatch: ["#818cf8", "#a78bfa", "#7dd3fc"] },
  { id: "sage", label: "Sage", swatch: ["#84a98c", "#9caf88", "#52796f"] },
  { id: "clay", label: "Clay", swatch: ["#c98a6b", "#d9b08c", "#a9714b"] },
  {
    id: "graphite",
    label: "Graphite",
    swatch: ["#94a3b8", "#a1a1aa", "#cbd5e1"],
  },
] as const;

export type AccentId = (typeof ACCENTS)[number]["id"];

export const DEFAULT_ACCENT: AccentId = "blush";

export const ACCENT_IDS = ACCENTS.map((accent) => accent.id);

const STORAGE_KEY = "accent";
const EVENT = "accent-change";

export function setAccent(id: string) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.accent = id;
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function subscribeAccent(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

export function getAccent(): string {
  return document.documentElement.dataset.accent ?? DEFAULT_ACCENT;
}

export function isAccentId(value: string): value is AccentId {
  return (ACCENT_IDS as readonly string[]).includes(value);
}
