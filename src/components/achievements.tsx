import { BadgeCheck, Brain, GraduationCap, type LucideIcon } from "lucide-react";
import { achievements, type AchievementIcon } from "@/lib/portfolio";
import { Reveal } from "@/components/reveal";

const iconMap: Record<AchievementIcon, LucideIcon> = {
  badgeCheck: BadgeCheck,
  brain: Brain,
  graduationCap: GraduationCap,
};

export function Achievements() {
  return (
    <section aria-label="Achievements" className="mb-space-2xl">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {achievements.map((item, index) => {
          const Icon = iconMap[item.footIcon];
          return (
            <Reveal
              key={item.title}
              delay={index * 0.08}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl bg-surface-card p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] bg-accent-a opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <div>
                <span className="mb-1 block font-label-mono-tag text-label-mono-tag uppercase tracking-wider text-outline">
                  {item.label}
                </span>
                <h4 className="mb-1 font-headline-sm text-headline-sm text-primary">
                  {item.title}
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-pretty">
                  {item.description}
                </p>
              </div>
              <div className="flex items-center gap-2 pt-4">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-on-surface-variant"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--color-accent-a) 16%, white)",
                  }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span
                  className={`font-label-badge text-label-badge ${item.footClass}`}
                >
                  {item.foot}
                </span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
