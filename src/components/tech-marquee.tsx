"use client";

import {
  useCallback,
  useSyncExternalStore,
  type ComponentType,
  type CSSProperties,
} from "react";
import {
  SiApachekafka,
  SiBun,
  SiCplusplus,
  SiDocker,
  SiLinux,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiRabbitmq,
  SiReact,
  SiRedis,
  SiSocketdotio,
  SiTypescript,
} from "@icons-pack/react-simple-icons";
import VercelIcon from "@lobehub/icons-static-svg/icons/vercel.svg";
import AwsIcon from "@lobehub/icons-static-svg/icons/aws-color.svg";
import { Marquee } from "@/components/ui/marquee";
import { skills, type Skill } from "@/lib/portfolio";

type IconComponent = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function usePrefersReducedMotion() {
  const subscribe = useCallback((onChange: () => void) => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  const getSnapshot = () =>
    window.matchMedia(REDUCED_MOTION_QUERY).matches;

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

const iconMap: Record<string, IconComponent> = {
  typescript: SiTypescript,
  nestjs: SiNestjs,
  nodedotjs: SiNodedotjs,
  redis: SiRedis,
  apachekafka: SiApachekafka,
  rabbitmq: SiRabbitmq,
  socketdotio: SiSocketdotio,
  postgresql: SiPostgresql,
  docker: SiDocker,
  react: SiReact,
  nextdotjs: SiNextdotjs,
  cplusplus: SiCplusplus,
  python: SiPython,
  mongodb: SiMongodb,
  bun: SiBun,
  linux: SiLinux,
  "lobe:vercel": VercelIcon,
  "lobe:aws-color": AwsIcon,
};

function SkillPill({ skill }: { skill: Skill }) {
  const Icon = iconMap[skill.icon];

  return (
    <span
      style={{ "--brand": skill.color } as CSSProperties}
      className="group/pill inline-flex cursor-default items-center gap-2 rounded-full border border-badge-border bg-surface-card px-3.5 py-2 font-label-badge text-label-badge text-on-surface shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md"
    >
      {Icon && (
        <Icon
          aria-hidden
          className="h-4 w-4 text-[color:var(--brand)] opacity-70 transition-all duration-200 group-hover/pill:scale-110 group-hover/pill:opacity-100"
        />
      )}
      <span>{skill.name}</span>
    </span>
  );
}

export function TechMarquee() {
  const reduceMotion = usePrefersReducedMotion();

  const accessibleList = (
    <ul className="sr-only">
      {skills.flat().map((skill) => (
        <li key={skill.name}>{skill.name}</li>
      ))}
    </ul>
  );

  if (reduceMotion) {
    return (
      <section aria-label="Technology stack" className="mb-space-2xl">
        <div className="flex flex-wrap gap-2">
          {skills.flat().map((skill) => (
            <SkillPill key={skill.name} skill={skill} />
          ))}
        </div>
        {accessibleList}
      </section>
    );
  }

  return (
    <section aria-label="Technology stack" className="mb-space-2xl">
      <div
        aria-hidden
        className="relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <Marquee pauseOnHover className="[--duration:44s] [--gap:0.75rem]">
          {skills[0].map((skill) => (
            <SkillPill key={skill.name} skill={skill} />
          ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          className="[--duration:54s] [--gap:0.75rem]"
        >
          {skills[1].map((skill) => (
            <SkillPill key={skill.name} skill={skill} />
          ))}
        </Marquee>
      </div>
      {accessibleList}
    </section>
  );
}
