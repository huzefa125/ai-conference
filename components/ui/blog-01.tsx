"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { POSTS_BY_DATE, formatDate } from "@/lib/blog-data";

const MotionLink = motion.create(Link);

/** Home page "Recent news": latest three posts, the first one twice as wide. */
const Blog = ({ id = "blog" }: { id?: string }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const reduce = useReducedMotion();
  const posts = POSTS_BY_DATE.slice(0, 3);

  // With reduced motion the content simply appears, no slide.
  const from = (x: number, y = 0) => (reduce ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y });
  const to = { opacity: 1, x: 0, y: 0 };

  return (
    <section id={id} ref={sectionRef} className="w-full scroll-mt-24 overflow-x-clip py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-10">
          {/* header: centred title + subtitle, same as the other sections */}
          <motion.div
            initial={from(0, 24)}
            animate={isInView ? to : from(0, 24)}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeInOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="font-mono text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Recent news
            </h2>
            <p className="mt-4 font-mono text-base text-balance text-muted-foreground sm:text-lg">
              Event news, speaker insights and practical tips for getting the most out of Atlas Global.
            </p>
          </motion.div>

          {/* posts */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {posts.map((post, index) => (
              <MotionLink
                href={`/blog/${post.slug}`}
                key={post.slug}
                initial={from(0, 40)}
                animate={isInView ? to : from(0, 40)}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.2, ease: "easeInOut" }}
                className={`group flex flex-col gap-5 ${index === 0 ? "sm:col-span-2" : ""}`}
              >
                <Card className="rounded-none border-0 bg-transparent p-0 shadow-none">
                  <CardContent className="flex flex-col gap-5 p-0">
                    <div className="relative aspect-video w-full overflow-hidden border border-border bg-secondary sm:aspect-auto sm:h-96">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                      />
                      <span className="absolute left-3 top-3 bg-card/95 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-primary">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-mono text-sm text-muted-foreground">
                        {formatDate(post.date)} · {post.readTime}
                      </p>
                      <p className="font-mono text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                        {post.title}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </MotionLink>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 border border-foreground px-5 py-2.5 font-mono text-sm font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              View all posts
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
