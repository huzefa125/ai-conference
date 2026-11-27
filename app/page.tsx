import { Navbar } from "@/components/layout/navbar";
import AtlasHero from "@/components/sections/hero";
import WhyAttend from "@/components/sections/why-attend";
import KeynoteIntro from "@/components/sections/keynote-intro";
import HowItWorks from "@/components/sections/how-it-works";
import FUIBentoGridDark from "@/components/sections/tracks";
import FieldsBeam from "@/components/sections/fields-beam";
import Speakers from "@/components/sections/speakers";
import CallForSpeakers from "@/components/sections/call-for-speakers";
import Agenda from "@/components/sections/agenda";
import StickyFeatureSection from "@/components/sections/highlights";
import Gallery from "@/components/sections/gallery";
import TestimonialsMarquee from "@/components/sections/testimonials";
import Tickets from "@/components/sections/tickets";
import Travel from "@/components/sections/travel";
import Sponsors from "@/components/sections/sponsors";
import CtaBanner from "@/components/sections/cta-banner";
import Faq from "@/components/sections/faq";
import Blog from "@/components/sections/blog-preview";
import SiteFooter from "@/components/layout/site-footer";
import Tone from "@/components/layout/tone";

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
      <FieldsBeam id="fields" />
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
