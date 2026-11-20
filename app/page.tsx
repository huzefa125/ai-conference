import { Navbar } from "@/components/ui/navbar";
import AtlasHero from "@/components/ui/atlas-hero";
import WhyAttend from "@/components/ui/why-attend";
import KeynoteIntro from "@/components/sections/keynote-intro";
import HowItWorks from "@/components/sections/how-it-works";
import FUIBentoGridDark from "@/components/ui/bento";
import Speakers from "@/components/ui/speakers";
import CallForSpeakers from "@/components/ui/call-for-speakers";
import Agenda from "@/components/ui/agenda";
import StickyFeatureSection from "@/components/ui/sticky-scroll-cards-section";
import Gallery from "@/components/ui/gallery";
import TestimonialsMarquee from "@/components/ui/marquee-03";
import Tickets from "@/components/ui/tickets";
import Travel from "@/components/ui/travel";
import Sponsors from "@/components/ui/sponsors";
import CtaBanner from "@/components/ui/cta-banner";
import Faq from "@/components/ui/faq";
import Blog from "@/components/ui/blog-01";
import SiteFooter from "@/components/sections/site-footer";
import Tone from "@/components/sections/tone";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <div className="container mx-auto px-4">
        <Navbar />
      </div>
      <AtlasHero />
      <KeynoteIntro />
      <Tone tone="white">
        <WhyAttend id="why" />
      </Tone>
      <HowItWorks />
      <Tone tone="dark">
        <FUIBentoGridDark id="tracks" />
      </Tone>
      <Speakers id="speakers" />
      <CallForSpeakers id="cfp" />
      <Tone tone="white">
        <Agenda id="agenda" />
      </Tone>
      <StickyFeatureSection />
      <Gallery id="gallery" />
      <Tone tone="dark">
        <TestimonialsMarquee />
      </Tone>
      <Tone tone="white">
        <Tickets id="tickets" />
      </Tone>
      <Travel id="travel" />
      <Sponsors id="sponsors" />
      <Tone tone="white">
        <Blog id="blog" />
      </Tone>
      <CtaBanner id="register" />
      <Faq id="faq" />
      <SiteFooter id="contact" />
    </div>
  );
}
