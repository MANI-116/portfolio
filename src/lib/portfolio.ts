export const profile = {
  name: "Vathala Manikantha Narapa Reddy",
  firstName: "Manikantha",
  role: "Software Engineer & Distributed Systems",
  tagline:
    "I architect and build distributed systems, high-throughput backend services, and end-to-end full stack web applications with resilient architecture and low-latency performance.",
  aside:
    "TypeScript & NestJS are the constants. The race conditions are just part of the stack.",
  email: "111manikanta.v@gmail.com",
  phone: "+919701836209",
  phoneDisplay: "+91 9701836209",
  github: "https://github.com/MANI-116",
  githubHandle: "MANI-116",
  linkedin: "https://www.linkedin.com/in/mani-vathala-484045196/",
  linkedinHandle: "in/mani-vathala-484045196",
  x: "https://x.com/Mani_6016",
  xHandle: "@Mani_6016",
  perpx: "https://app.manivathala.com",
  resume: "/Manikantha-CV.pdf",
  avatar:
    "/hero.jpeg",
  school: "NIT Hamirpur '23",
} as const;

export const navItems = [
  { label: "Work", href: "#work", id: "work" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Notes", href: "#notes", id: "notes" },
] as const;

export type Skill = {
  name: string;
  /** `simple-icons` slug, or `lobe:<file>` for a Lobe icon SVG. */
  icon: string;
  /** Brand color applied on hover. */
  color: string;
};

export const skills: Skill[][] = [
  [
    { name: "TypeScript", icon: "typescript", color: "#3178C6" },
    { name: "NestJS", icon: "nestjs", color: "#E0234E" },
    { name: "Node.js", icon: "nodedotjs", color: "#5FA04E" },
    { name: "Redis", icon: "redis", color: "#FF4438" },
    { name: "Kafka", icon: "apachekafka", color: "#231F20" },
    { name: "RabbitMQ", icon: "rabbitmq", color: "#FF6600" },
    { name: "WebSockets", icon: "socketdotio", color: "#010101" },
    { name: "PostgreSQL", icon: "postgresql", color: "#4169E1" },
    { name: "Docker", icon: "docker", color: "#2496ED" },
  ],
  [
    { name: "React", icon: "react", color: "#61DAFB" },
    { name: "Next.js", icon: "nextdotjs", color: "#000000" },
    { name: "C++", icon: "cplusplus", color: "#00599C" },
    { name: "Python", icon: "python", color: "#3776AB" },
    { name: "Vercel AI SDK", icon: "lobe:vercel", color: "#000000" },
    { name: "MongoDB", icon: "mongodb", color: "#47A248" },
    { name: "Bun", icon: "bun", color: "#000000" },
    { name: "Linux", icon: "linux", color: "#FCC624" },
    { name: "AWS S3", icon: "lobe:aws-color", color: "#FF9900" },
  ],
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  meta: string;
  badge?: string;
  headline: string;
  headlineCode?: string;
  summary: string;
  bullets: string[];
  tags: string[];
  ring: "primary" | "outline" | "outline-variant";
  accent: "primary" | "outline";
};

export const experience: Experience[] = [
  {
    company: "Kara HMS",
    role: "Solo Engineering & Architecture",
    period: "2024 — Present • Remote",
    meta: "Founder & Full Stack",
    headline:
      "Architecting a modular Hospital Management System backend in NestJS with dynamic persistence.",
    headlineCode: "NestJS",
    summary:
      "Founded and engineered a production-ready Hospital Management System from scratch as a solo builder. Architected loosely coupled data persistence layers allowing seamless zero-downtime migration from Google Sheets to high-concurrency databases.",
    bullets: [
      "Delivered core OP (Outpatient) clinical workflows, account administration dashboards, and role-based privilege systems.",
      "Designed resilient JWT auth layers and pluggable modules prepped for Pharmacy, Inpatient (IP), and Billing expansion.",
    ],
    tags: ["NestJS", "React", "PostgreSQL", "Google Sheets API", "Docker"],
    ring: "primary",
    accent: "primary",
  },
  {
    company: "Jio Platforms",
    role: "Software Development Engineer",
    period: "Jul 2023 — Mar 2024 • Full-Time",
    meta: "",
    badge: "Best Debutant Award",
    headline:
      "High-throughput REST APIs, microservices, and enterprise React applications.",
    headlineCode: "microservices",
    summary:
      "Constructed resilient backend services in Node.js and TypeScript handling heavy internal transaction volumes across FYND Platform ecosystem and enterprise business tooling.",
    bullets: [
      "Architected role-based enterprise recommendation portal with low-latency ML service integration.",
      "Developed FYND Platform extensions and resolved critical production incidents under strict SLA windows.",
    ],
    tags: ["Node.js", "TypeScript", "React", "Microservices"],
    ring: "outline",
    accent: "outline",
  },
  {
    company: "SmartKnower (Internship) & NIT Hamirpur",
    role: "",
    period: "2019 — 2023 • Academics & Internship",
    meta: "NIT Hamirpur (CGPA 7.95)",
    headline: "",
    summary:
      "Completed B.Tech in Electronics and Communication Engineering while engineering full stack web systems. Developed responsive customer features for a MERN e-commerce engine, streamlining checkout APIs and latency.",
    bullets: [],
    tags: [],
    ring: "outline-variant",
    accent: "outline",
  },
];

export type Project = {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  footer: string;
  href: string;
  linkLabel: string;
  live?: boolean;
  visual: "orderbook" | "terminal";
};

export const projects: Project[] = [
  {
    id: "perpx",
    category: "Fintech • Distributed Systems",
    title: "PerpX — Perpetual Futures Exchange",
    description:
      "Perpetual futures exchange featuring an optimized in-memory order book matching engine with snapshot state recovery, isolated margin, liquidation engine, and real-time streaming over WebSockets.",
    tags: ["Next.js", "TypeScript", "Redis", "WebSockets"],
    footer: "Redis Pub/Sub",
    href: profile.perpx,
    linkLabel: "Live",
    live: true,
    visual: "orderbook",
  },
  {
    id: "agent-cli",
    category: "Developer Tools • AI",
    title: "AI Agent CLI",
    description:
      "Developer CLI with structured tool execution via JSON Schema validation, recursive context summarization for extended programming sessions, and clean terminal UI orchestration.",
    tags: ["TypeScript", "Vercel AI SDK", "JSON Schema", "Node.js"],
    footer: "Terminal Agent",
    href: profile.github,
    linkLabel: "Code",
    visual: "terminal",
  },
];

export type AchievementIcon = "badgeCheck" | "brain" | "graduationCap";

export type Achievement = {
  label: string;
  title: string;
  description: string;
  icon: AchievementIcon;
  footIcon: AchievementIcon;
  foot: string;
  footClass: string;
};

export const achievements: Achievement[] = [
  {
    label: "Recognition",
    title: "Best Debutant",
    description:
      "Jio Platforms for high-speed microservices delivery and reliability.",
    icon: "badgeCheck",
    footIcon: "badgeCheck",
    foot: "Awarded 2024",
    footClass: "text-secondary",
  },
  {
    label: "Competitive",
    title: "Codeforces 970",
    description:
      "Active problem solving in data structures, algorithms, and dynamic graphs.",
    icon: "brain",
    footIcon: "brain",
    foot: "Algorithms",
    footClass: "text-primary",
  },
  {
    label: "Certification",
    title: "100xDevs Certified",
    description:
      "Complete MERN, distributed architectures, caching layers, and DevOps.",
    icon: "graduationCap",
    footIcon: "graduationCap",
    foot: "Full Stack Verified",
    footClass: "text-emerald-700",
  },
];

export type Note = {
  id: string;
  tag: string;
  title: string;
  body: string;
};

export const notes: Note[] = [
  {
    id: "persistence",
    tag: "Architecture",
    title: "Design persistence as a seam, not a foundation",
    body: "Kara HMS started on Google Sheets because that is what the clinic already trusted. Keeping the data layer behind an interface meant swapping to a concurrent database later without rewriting a single clinical workflow — the migration became a config change, not a rewrite.",
  },
  {
    id: "matching",
    tag: "Distributed Systems",
    title: "Matching engines belong in memory",
    body: "PerpX keeps the order book in process and treats Redis Pub/Sub as the transport, not the source of truth. Snapshot recovery makes the in-memory state durable enough to survive a restart while keeping the matching path allocation-light and low latency.",
  },
  {
    id: "context",
    tag: "AI Tooling",
    title: "Context is the real constraint",
    body: "The AI Agent CLI validates every tool call against JSON Schema, then recursively summarizes older turns so long sessions stay coherent. Structured output is what makes an agent debuggable — free-form text is not a contract.",
  },
];
