import { SiteHeader } from "@/components/site-header";
import { ScrollProgress } from "@/components/scroll-progress";
import { Hero } from "@/components/hero";
import { TechMarquee } from "@/components/tech-marquee";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Achievements } from "@/components/achievements";
import { Notes } from "@/components/notes";
import { Cta } from "@/components/cta";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main className="w-full pt-16">
        <div className="mx-auto max-w-4xl px-margin py-space-2xl md:px-margin-desktop">
          <Hero />
          <TechMarquee />
          <Experience />
          <Projects />
          <Achievements />
          <Notes />
          <Cta />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
