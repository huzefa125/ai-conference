"use client";

import * as React from "react";
import { Navbar, type NavbarProps, type NavItem } from "@/components/ui/navbar";
import { HeroBanner, type HeroBannerProps, type HeroLabel, type HeroBannerCta } from "@/components/ui/hero-banner";
import { FeaturesGrid, type FeaturesGridProps, type FeatureCardItem } from "@/components/ui/features-grid";

// Re-export individual components and types for modular reuse
export { Navbar, HeroBanner, FeaturesGrid };
export type { NavbarProps, NavItem, HeroBannerProps, HeroLabel, HeroBannerCta, FeaturesGridProps, FeatureCardItem };

export interface MynaHeroProps {
  showHeader?: boolean;
  showFeatures?: boolean;
  headerProps?: NavbarProps;
  bannerProps?: HeroBannerProps;
  featuresProps?: FeaturesGridProps;
  className?: string;

  // Direct shorthand props
  titleWords?: string[];
  rotatingWords?: string[];
  highlightWords?: string[];
  subtitle?: string;
  labels?: HeroLabel[];
  features?: FeatureCardItem[];
  featuresTitle?: string;
  navItems?: NavItem[];
  ctaText?: string;
  onCtaClick?: () => void;
  secondaryCtaText?: string;
  onSecondaryCtaClick?: () => void;
  secondaryCtaHref?: string;
  logoSrc?: string;
  logoAlt?: string;
}

export function MynaHero({
  showHeader = true,
  showFeatures = false, // Removed "Unlock the Power of AI" by default
  headerProps,
  bannerProps,
  featuresProps,
  className = "",
  // Shorthands
  titleWords,
  rotatingWords,
  highlightWords,
  subtitle,
  labels,
  features,
  featuresTitle,
  navItems,
  ctaText,
  onCtaClick,
  secondaryCtaText,
  onSecondaryCtaClick,
  secondaryCtaHref,
  logoSrc,
  logoAlt,
}: MynaHeroProps) {
  const resolvedHeader: NavbarProps = {
    ...headerProps,
    navigationItems: navItems || headerProps?.navigationItems,
    logo: {
      src: logoSrc || headerProps?.logo?.src,
      alt: logoAlt || headerProps?.logo?.alt,
      href: headerProps?.logo?.href,
    },
    ctaButton: {
      text: ctaText || headerProps?.ctaButton?.text,
      onClick: onCtaClick || headerProps?.ctaButton?.onClick,
      href: headerProps?.ctaButton?.href,
    },
  };

  const resolvedBanner: HeroBannerProps = {
    ...bannerProps,
    titleWords: titleWords || bannerProps?.titleWords,
    rotatingWords: rotatingWords || bannerProps?.rotatingWords,
    highlightWords: highlightWords || bannerProps?.highlightWords,
    subtitle: subtitle ?? bannerProps?.subtitle,
    labels: labels || bannerProps?.labels,
    ctaButton: {
      text: ctaText || bannerProps?.ctaButton?.text,
      onClick: onCtaClick || bannerProps?.ctaButton?.onClick,
      href: bannerProps?.ctaButton?.href,
    },
    secondaryButton: {
      text: secondaryCtaText || bannerProps?.secondaryButton?.text || "VIEW AGENDA",
      onClick: onSecondaryCtaClick || bannerProps?.secondaryButton?.onClick,
      href: secondaryCtaHref || bannerProps?.secondaryButton?.href || "#agenda",
    },
  };

  const resolvedFeatures: FeaturesGridProps = {
    ...featuresProps,
    title: featuresTitle ?? featuresProps?.title,
    features: features || featuresProps?.features,
  };

  return (
    <div className={`container mx-auto px-4 bg-background text-foreground ${className}`}>
      {showHeader && <Navbar {...resolvedHeader} />}
      <main>
        <HeroBanner {...resolvedBanner} />
        {showFeatures && <FeaturesGrid {...resolvedFeatures} />}
      </main>
    </div>
  );
}

export default MynaHero;
