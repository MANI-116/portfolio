import { profile } from "@/lib/portfolio";

export function SiteFooter() {
  return (
    <footer className="mt-space-2xl w-full border-t border-grid-line bg-canvas-bg/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-space-md px-margin py-space-xl sm:flex-row md:px-margin-desktop">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <span className="font-headline-sm text-headline-sm text-on-surface">
            {profile.name}
          </span>
          <span className="font-label-mono-tag text-label-mono-tag text-on-surface-variant">
            Software Engineer • Full Stack • Distributed Systems
          </span>
        </div>
        <div className="flex items-center gap-space-md font-label-badge text-label-badge text-on-surface-variant">
          <span className="font-code-inline text-code-inline">
            Designed with technical tactility
          </span>
        </div>
      </div>
    </footer>
  );
}
