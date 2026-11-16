import Image from "next/image";
import { ArrowRight, BedDouble, MapPin, Plane, Stamp, TrainFront } from "lucide-react";
import { conferences } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const travel = [
  { icon: Plane, title: "Getting there", text: "Sample text. Nearest international airport around 30 minutes by taxi or express rail." },
  { icon: TrainFront, title: "Local transport", text: "Sample text. The venue is a short walk from the nearest metro and bus stops." },
  { icon: BedDouble, title: "Accommodation", text: "Sample text. Discounted rates at partner hotels within walking distance of the venue." },
  { icon: Stamp, title: "Visa support", text: "Sample text. Registered delegates can request an official invitation letter." },
];

export function Venue() {
  // Feature the next in-person (or hybrid) event, since virtual events have no venue.
  const event = [...conferences].filter((c) => c.mode !== "Virtual").sort((a, b) => a.startDate.localeCompare(b.startDate))[0];

  return (
    <section id="venue" className="bg-surface py-14 sm:py-20 lg:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            title="Venue and Destination"
            description={`${event.shortTitle} takes place in ${event.location}. Venue and travel details below are placeholders.`}
          />
          <Button href={`/conferences/${event.id}#venue`} variant="outline" size="lg" className="self-start lg:self-auto">
            Venue Details
            <ArrowRight aria-hidden />
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:mt-14 lg:grid-cols-12">
          <div className="relative min-h-[20rem] overflow-hidden lg:col-span-5">
            <Image src="/images/hall.jpg" alt={`Conference hall at ${event.venue.name} (sample image)`} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-navy p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-light">{event.date}</p>
              <p className="mt-2 font-serif text-xl">{event.venue.name}</p>
              <p className="mt-1 flex items-start gap-2 text-sm text-white/75">
                <MapPin className="mt-0.5 size-4 shrink-0 text-blue-light" aria-hidden />
                {event.venue.address}, {event.venue.city}
              </p>
            </div>
          </div>

          <div className="min-h-[20rem] overflow-hidden border border-border bg-white lg:col-span-7">
            <iframe
              title={`Map showing ${event.venue.city}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(event.venue.mapQuery)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full min-h-[20rem] grayscale-[30%]"
            />
          </div>
        </div>

        <ul className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {travel.map(({ icon: Icon, title, text }) => (
            <li key={title} className="bg-white p-6">
              <Icon className="size-6 text-blue" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-4 font-medium text-navy">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
