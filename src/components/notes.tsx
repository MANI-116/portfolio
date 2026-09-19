import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/reveal";
import { notes } from "@/lib/portfolio";

export function Notes() {
  return (
    <section id="notes" className="mb-space-2xl scroll-mt-24">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 font-label-mono-tag text-label-mono-tag uppercase tracking-wider text-outline">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-a" />
            Notes
          </h3>
          <p className="mt-1 font-headline-lg text-headline-md text-primary">
            Field Notes
          </p>
        </div>
        <span className="font-code-inline text-xs text-outline">
          engineering
        </span>
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue={notes[0].id}
        className="flex flex-col gap-3"
      >
        {notes.map((note, index) => (
          <Reveal key={note.id} delay={index * 0.06}>
            <AccordionItem
              value={note.id}
              className="transition-shadow hover:shadow-md"
            >
              <AccordionTrigger>
                <span className="flex flex-col gap-1">
                  <span className="font-label-mono-tag text-label-mono-tag uppercase tracking-wider text-outline">
                    {note.tag}
                  </span>
                  <span className="font-headline-sm text-body-md text-primary md:text-headline-sm">
                    {note.title}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="font-body-sm text-body-sm leading-relaxed text-on-surface-variant text-pretty">
                  {note.body}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Reveal>
        ))}
      </Accordion>
    </section>
  );
}
