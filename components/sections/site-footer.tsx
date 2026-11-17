"use client";

import { LinkedinLogoIcon, XLogoIcon, YoutubeLogoIcon, InstagramLogoIcon } from "@phosphor-icons/react";
import DitheredFooter from "@/components/ui/dithered-footer";
import { FOOTER } from "@/lib/site-data";

const ICONS = { LinkedIn: LinkedinLogoIcon, X: XLogoIcon, YouTube: YoutubeLogoIcon, Instagram: InstagramLogoIcon } as const;

export default function SiteFooter({ id = "contact" }: { id?: string }) {
  return (
    <DitheredFooter
      id={id}
      brand={FOOTER.brand}
      wordmark="Atlas"
      tagline={FOOTER.blurb}
      columns={FOOTER.columns}
      legal={FOOTER.legal}
      copyright={`© 2026 ${FOOTER.brand}`}
      socials={FOOTER.socials.map((x) => {
        const Icon = ICONS[x.label as keyof typeof ICONS];
        return { ...x, icon: <Icon size={18} weight="fill" /> };
      })}
    />
  );
}
