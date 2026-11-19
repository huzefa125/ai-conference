import { MynaHero } from "@/components/ui/myna-hero";
import Venue from "@/components/ui/venue";
import WhyAttend from "@/components/ui/why-attend";
import AboutDesk from "@/components/sections/about-desk";
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

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <MynaHero />
      <Venue id="about" />
      <AboutDesk />
      <WhyAttend id="why" />
      <HowItWorks />
      <FUIBentoGridDark id="tracks" />
      <Speakers id="speakers" />
      <CallForSpeakers id="cfp" />
      <Agenda id="agenda" />
      <StickyFeatureSection />
      <Gallery id="gallery" />
      <TestimonialsMarquee />
      <Tickets id="tickets" />
      <Travel id="travel" />
      <Sponsors id="sponsors" />
      <Blog id="blog" />
      <CtaBanner id="register" />
      <Faq id="faq" />
      <SiteFooter id="contact" />
    </div>
  );
}
