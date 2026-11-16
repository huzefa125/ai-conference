import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { ResearchAreas } from "@/components/sections/research-areas";
import { Conferences } from "@/components/sections/conferences";
import { Speakers } from "@/components/sections/speakers";
import { SchedulePreview } from "@/components/sections/schedule-preview";
import { WhyAttend } from "@/components/sections/why-attend";
import { Pricing } from "@/components/sections/pricing";
import { VideoHighlights } from "@/components/sections/video-highlights";
import { Testimonials } from "@/components/sections/testimonials";
import { Awards } from "@/components/sections/awards";
import { Venue } from "@/components/sections/venue";
import { Publications } from "@/components/sections/publications";
import { News } from "@/components/sections/news";
import { Faq } from "@/components/sections/faq";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Newsletter } from "@/components/sections/newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <ResearchAreas />
      <Conferences />
      <Speakers />
      <SchedulePreview />
      <WhyAttend />
      <Pricing />
      <VideoHighlights />
      <Testimonials />
      <Awards />
      <Venue />
      <Publications />
      <News />
      <Faq />
      <CtaBanner />
      <Newsletter />
    </>
  );
}
