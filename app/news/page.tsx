import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { NewsList } from "@/components/news/news-list";
import { Newsletter } from "@/components/sections/newsletter";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { posts } from "@/lib/content";

export const metadata: Metadata = {
  title: "News",
  description: "Conference updates, guides for authors and news from our research community.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        title="News & Articles"
        description="Conference updates, guides for authors and news from our research community."
        crumbs={[{ label: "News" }]}
        image="/images/stage.jpg"
      />
      <section className="bg-background py-16 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Latest"
            title="Stories from the programme"
            description="Filter by topic to find updates on upcoming events, publishing advice and research highlights."
            size="sm"
            className="mb-10"
          />
          <NewsList posts={posts} />
        </Container>
      </section>
      <Newsletter />
    </>
  );
}
