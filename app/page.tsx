import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { Conferences } from "@/components/sections/conferences";
import { ResearchAreas } from "@/components/sections/research-areas";
import { WhyAttend } from "@/components/sections/why-attend";
import { Speakers } from "@/components/sections/speakers";
import { Gallery } from "@/components/sections/gallery";
import { Publications } from "@/components/sections/publications";
import { Newsletter } from "@/components/sections/newsletter";
import { Participate } from "@/components/sections/participate";
import { News } from "@/components/sections/news";
import { Features } from "@/components/sections/features";
import { Faq } from "@/components/sections/faq";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <Hero />
        <Stats />
        <About />
        <Conferences />
        <ResearchAreas />
        <WhyAttend />
        <Speakers />
        <Participate />
        <Gallery />
        <Publications />
        <Features />
        <News />
        <Faq />
        <CtaBanner />
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  );
}
