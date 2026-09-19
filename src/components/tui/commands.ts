import {
  experience,
  navItems,
  notes,
  profile,
  projects,
  skills,
} from "@/lib/portfolio";
import { ACCENTS, ACCENT_IDS, isAccentId } from "@/lib/accent";

export type Tone =
  | "default"
  | "muted"
  | "success"
  | "error"
  | "accent"
  | "command";

export type LineDraft = {
  tone: Tone;
  text: string;
  href?: string;
  external?: boolean;
};

export type TerminalLine = LineDraft & { id: string };

export type TerminalApi = {
  print: (lines: LineDraft[]) => void;
  clear: () => void;
  close: () => void;
  navigate: (sectionId: string) => void;
  openLink: (href: string) => void;
  setAccent: (id: string) => void;
};

export type Command = {
  name: string;
  description: string;
  usage?: string;
  run: (args: string[], api: TerminalApi) => void;
};

const SECTION_IDS = [...navItems.map((item) => item.id), "contact"];

const linkTargets: Record<string, { href: string; label: string }> = {
  perpx: { href: profile.perpx, label: "PerpX (live)" },
  github: { href: profile.github, label: "GitHub" },
  linkedin: { href: profile.linkedin, label: "LinkedIn" },
  x: { href: profile.x, label: "X" },
  email: { href: `mailto:${profile.email}`, label: "Email" },
  resume: { href: profile.resume, label: "Résumé (PDF)" },
};

export const commands: Command[] = [
  {
    name: "/help",
    description: "list every available command",
    run: (_args, api) => {
      api.print([
        { tone: "muted", text: "Available commands:" },
        ...commands.map((command) => ({
          tone: "default" as const,
          text: `  ${command.name.padEnd(12)} ${command.description}`,
        })),
        {
          tone: "muted",
          text: "Tip: ↑/↓ history · Tab autocomplete · Ctrl/Cmd+K toggles the terminal.",
        },
      ]);
    },
  },
  {
    name: "/whoami",
    description: "a short introduction",
    run: (_args, api) => {
      api.print([
        { tone: "accent", text: profile.name },
        { tone: "default", text: profile.role },
        { tone: "muted", text: profile.tagline },
      ]);
    },
  },
  {
    name: "/neofetch",
    description: "system-style summary card",
    run: (_args, api) => {
      api.print([
        { tone: "accent", text: "manikantha@portfolio" },
        { tone: "muted", text: "────────────────────────────" },
        { tone: "default", text: "role    · Software Engineer & Distributed Systems" },
        { tone: "default", text: "stack   · TypeScript · NestJS · Node.js · PostgreSQL" },
        { tone: "default", text: "school  · NIT Hamirpur '23" },
        { tone: "default", text: "focus   · distributed systems, low-latency backends" },
        { tone: "default", text: `links   · ${profile.githubHandle} · ${profile.xHandle}` },
      ]);
    },
  },
  {
    name: "/projects",
    description: "list projects — try /projects perpx",
    run: (args, api) => {
      const query = args[0]?.toLowerCase();
      if (query) {
        const project = projects.find((item) => item.id === query);
        if (!project) {
          api.print([
            { tone: "error", text: `no project named "${args[0]}"` },
            {
              tone: "muted",
              text: `available: ${projects.map((p) => p.id).join(", ")}`,
            },
          ]);
          return;
        }
        api.print([
          { tone: "accent", text: project.title },
          { tone: "muted", text: project.category },
          { tone: "default", text: project.description },
          { tone: "default", text: `stack: ${project.tags.join(" · ")}` },
          {
            tone: "success",
            text: `${project.linkLabel} → ${project.href}`,
            href: project.href,
            external: true,
          },
        ]);
        return;
      }
      api.print([
        { tone: "muted", text: "Projects:" },
        ...projects.map((project) => ({
          tone: "default" as const,
          text: `  ${project.id.padEnd(10)} ${project.title} — ${project.category}`,
        })),
        { tone: "muted", text: "Run /projects <id> for detail." },
      ]);
    },
  },
  {
    name: "/experience",
    description: "work history",
    run: (_args, api) => {
      api.print([
        { tone: "muted", text: "Experience:" },
        ...experience.map((job) => ({
          tone: "default" as const,
          text: `  ${job.period} — ${job.company}${job.role ? ` · ${job.role}` : ""}`,
        })),
      ]);
    },
  },
  {
    name: "/skills",
    description: "technology stack",
    run: (_args, api) => {
      api.print([
        { tone: "muted", text: "Stack:" },
        ...skills.map((row) => ({
          tone: "default" as const,
          text: `  ${row.map((skill) => skill.name).join(" · ")}`,
        })),
      ]);
    },
  },
  {
    name: "/notes",
    description: "engineering field notes",
    run: (_args, api) => {
      api.print([
        { tone: "muted", text: "Field notes:" },
        ...notes.map((note) => ({
          tone: "default" as const,
          text: `  [${note.tag}] ${note.title}`,
        })),
        { tone: "muted", text: "Run /goto notes to read them." },
      ]);
    },
  },
  {
    name: "/goto",
    description: "scroll to a section",
    usage: "/goto <work|experience|projects|notes|contact>",
    run: (args, api) => {
      const target = args[0]?.toLowerCase();
      if (!target || !SECTION_IDS.includes(target)) {
        api.print([
          { tone: "error", text: "usage: /goto <section>" },
          { tone: "muted", text: `sections: ${SECTION_IDS.join(", ")}` },
        ]);
        return;
      }
      api.print([{ tone: "success", text: `→ navigating to #${target}` }]);
      api.navigate(target);
    },
  },
  {
    name: "/open",
    description: "open a link",
    usage: "/open <perpx|github|linkedin|x|email|resume>",
    run: (args, api) => {
      const target = args[0]?.toLowerCase();
      const link = target ? linkTargets[target] : undefined;
      if (!link) {
        api.print([
          { tone: "error", text: "usage: /open <target>" },
          { tone: "muted", text: `targets: ${Object.keys(linkTargets).join(", ")}` },
        ]);
        return;
      }
      api.print([
        {
          tone: "success",
          text: `↗ opening ${link.label} — ${link.href}`,
          href: link.href,
          external: link.href.startsWith("http"),
        },
      ]);
      api.openLink(link.href);
    },
  },
  {
    name: "/contact",
    description: "email, phone and socials",
    run: (_args, api) => {
      api.print([
        { tone: "muted", text: "Contact:" },
        { tone: "default", text: `  email    ${profile.email}`, href: `mailto:${profile.email}` },
        { tone: "default", text: `  phone    ${profile.phoneDisplay}`, href: `tel:${profile.phone}` },
        { tone: "default", text: `  github   ${profile.github}`, href: profile.github, external: true },
        { tone: "default", text: `  linkedin ${profile.linkedin}`, href: profile.linkedin, external: true },
        { tone: "default", text: `  x        ${profile.x}`, href: profile.x, external: true },
      ]);
    },
  },
  {
    name: "/github",
    description: "open GitHub profile",
    run: (_args, api) => {
      api.print([{ tone: "success", text: `↗ ${profile.github}`, href: profile.github, external: true }]);
      api.openLink(profile.github);
    },
  },
  {
    name: "/linkedin",
    description: "open LinkedIn profile",
    run: (_args, api) => {
      api.print([{ tone: "success", text: `↗ ${profile.linkedin}`, href: profile.linkedin, external: true }]);
      api.openLink(profile.linkedin);
    },
  },
  {
    name: "/x",
    description: "open X profile",
    run: (_args, api) => {
      api.print([{ tone: "success", text: `↗ ${profile.x}`, href: profile.x, external: true }]);
      api.openLink(profile.x);
    },
  },
  {
    name: "/resume",
    description: "view the résumé (PDF)",
    run: (_args, api) => {
      api.print([
        { tone: "muted", text: "Opening the résumé…" },
        {
          tone: "default",
          text: `  ${profile.resume}`,
          href: profile.resume,
          external: true,
        },
      ]);
      api.openLink(profile.resume);
    },
  },
  {
    name: "/theme",
    description: "switch the accent palette",
    usage: `/theme <${ACCENT_IDS.join("|")}>`,
    run: (args, api) => {
      const target = args[0]?.toLowerCase();
      if (!target) {
        api.print([
          { tone: "muted", text: "Accent palettes:" },
          ...ACCENTS.map((accent) => ({
            tone: "default" as const,
            text: `  ${accent.id.padEnd(10)} ${accent.label}`,
          })),
        ]);
        return;
      }
      if (!isAccentId(target)) {
        api.print([
          { tone: "error", text: `unknown palette "${args[0]}"` },
          { tone: "muted", text: `try: ${ACCENT_IDS.join(", ")}` },
        ]);
        return;
      }
      api.setAccent(target);
      api.print([{ tone: "success", text: `✓ accent set to ${target}` }]);
    },
  },
  {
    name: "/date",
    description: "current date and time",
    run: (_args, api) => {
      api.print([{ tone: "default", text: new Date().toString() }]);
    },
  },
  {
    name: "/clear",
    description: "clear the screen",
    run: (_args, api) => api.clear(),
  },
  {
    name: "/sudo",
    description: "…try it",
    run: (_args, api) => {
      api.print([
        { tone: "error", text: "nice try — this shell has no root." },
        { tone: "muted", text: "guest@portfolio has exactly the permissions it needs." },
      ]);
    },
  },
  {
    name: "/exit",
    description: "close the terminal",
    run: (_args, api) => api.close(),
  },
];

export function findCommand(name: string): Command | undefined {
  const normalized = name.startsWith("/") ? name.toLowerCase() : `/${name.toLowerCase()}`;
  return commands.find((command) => command.name === normalized);
}

export function commandNames(): string[] {
  return commands.map((command) => command.name);
}

export function suggestCommand(input: string): string | undefined {
  const value = input.replace(/^\//, "").toLowerCase();
  if (!value) return undefined;
  const names = commands.map((command) => command.name);
  return (
    names.find((name) => name.startsWith(`/${value}`)) ??
    names.find((name) => name.slice(1).startsWith(value[0])) ??
    names.find((name) => name.includes(value))
  );
}
