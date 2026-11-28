"use client";

import { GlobeIcon, LinkedinLogoIcon, XLogoIcon, YoutubeLogoIcon, InstagramLogoIcon } from "@phosphor-icons/react";
import { WordmarkFooter } from "@/components/ui/wordmark-footer";
import { useContent } from "@/components/providers/content-provider";

const ICONS = { LinkedIn: LinkedinLogoIcon, X: XLogoIcon, YouTube: YoutubeLogoIcon, Instagram: InstagramLogoIcon } as const;

export default function SiteFooter({ id = "contact" }: { id?: string }) {
  const { footer: FOOTER } = useContent();
  return (
    <WordmarkFooter
      id={id}
      name={FOOTER.brand}
      wordmark="Atlas"
      year={2026}
      logoSrc="/atlas-logo.png"
      description={FOOTER.blurb}
      cta={{ label: "Contact the team", href: "/contact" }}
      columns={FOOTER.columns}
      legal={FOOTER.legal}
      socials={FOOTER.socials.map((x) => {
        const Icon = ICONS[x.label as keyof typeof ICONS] ?? GlobeIcon;
        return { ...x, icon: <Icon size={18} weight="fill" /> };
      })}
    />
  );
}
