import { MynaHero } from "@/components/ui/myna-hero";
import Venue from "@/components/ui/venue";
import WhyAttend from "@/components/ui/why-attend";
import FUIBentoGridDark from "@/components/ui/bento";
import Speakers from "@/components/ui/speakers";
import CallForSpeakers from "@/components/ui/call-for-speakers";
import Agenda from "@/components/ui/agenda";
import Gallery from "@/components/ui/gallery";
import Tickets from "@/components/ui/tickets";
import Travel from "@/components/ui/travel";
import Sponsors from "@/components/ui/sponsors";
import CtaBanner from "@/components/ui/cta-banner";
import Faq from "@/components/ui/faq";
import Footer from "@/components/ui/footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <MynaHero />
      <Venue id="about" />
      <WhyAttend id="why" />
      <FUIBentoGridDark id="tracks" />
      <Speakers id="speakers" />
      <CallForSpeakers id="cfp" />
      <Agenda id="agenda" />
      <Gallery id="gallery" />
      <Tickets id="tickets" />
      <Travel id="travel" />
      <Sponsors id="sponsors" />
      <CtaBanner id="register" />
      <Faq id="faq" />
      <Footer id="contact" />
    </div>
  );
}
