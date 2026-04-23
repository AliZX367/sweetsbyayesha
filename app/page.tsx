import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/app/components/FadeIn";
import { HeroSection } from "@/app/components/HeroSection";
import { ReviewsSection } from "@/app/components/ReviewsSection";
import { TreatCard } from "@/app/components/TreatCard";
import {
  DEFAULT_OG_IMAGE_PATH,
  SITE_NAME,
  SITE_URL,
  TWITTER_SITE,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: SITE_NAME },
  description:
    "Handcrafted halal treats near Schaumburg, IL — cake pops, rice krispie treats, mango cups & custom baked goods. Made fresh to order.",
  alternates: {
    canonical: "https://sweetsbyayesha.com",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Celebrate with something sweet.",
    description:
      "Handcrafted halal-certified sweets near Schaumburg — cake pops, rice krispie treats, custom orders, pickup & delivery.",
    siteName: SITE_NAME,
    locale: "en_US",
    images: [
      {
        url: DEFAULT_OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — halal bakery near Schaumburg, Illinois`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_SITE,
    title: "Celebrate with something sweet.",
    description:
      "Handcrafted halal-certified sweets near Schaumburg — cake pops, rice krispie treats & custom orders.",
    images: [DEFAULT_OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection
        eyebrow="Schaumburg, IL • Pickup & delivery options"
        heading="Celebrate with something sweet."
        subtext="Made-to-order desserts for birthdays, weddings & every celebration in between — fresh, beautiful, and crafted with halal ingredients near Schaumburg, IL."
        ctaLabel="Order Now"
        ctaHref="/order"
        imageSrc="/images/hero-bg.jpg"
        imageAlt="Elegant dessert table with cake and pink floral arrangements"
      />

      <FadeIn delay={0}>
        <section className="border-y border-black/5 bg-surface">
          <div className="site-container py-5">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="flex items-center gap-2 text-sm font-medium text-text/80">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-primary"
                aria-hidden="true"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m9 11 3 3L22 4" />
              </svg>
              Made with halal ingredients
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-text/80">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-primary"
                aria-hidden="true"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                <path d="M5 3v4" />
                <path d="M19 17v4" />
                <path d="M3 5h4" />
                <path d="M17 19h4" />
              </svg>
              Made fresh to order
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-text/80">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-primary"
                aria-hidden="true"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Schaumburg, IL pickup
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-text/80">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-primary"
                aria-hidden="true"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              Custom orders welcome
            </div>
          </div>
        </div>
        </section>
      </FadeIn>

      <FadeIn delay={100}>
        <section className="site-container site-section">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="site-h2 text-text">Featured treats</h2>
            <p className="site-lead mt-3">
              Choose a classic, or tell Ayesha your theme and flavor ideas—she’ll
              bring them to life.
            </p>
          </div>
          <Link
            href="/menu"
            className="site-button hidden rounded-full border border-black/10 bg-background px-4 py-2 text-text shadow-sm transition hover:bg-surface sm:inline-flex"
          >
            View menu
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 *:min-w-0">
          <TreatCard
            title="Cake Pops"
            description="Bite-sized cake pops dipped and decorated to match your theme—fun, clean, and always party-ready."
            imageSrc="/images/cake-pops.jpg"
            imageAlt="Colorful decorated cake pops on display"
            pricing="From $36 / dozen"
            flippable
          />
          <TreatCard
            title="Rice Krispie Treats"
            description="Soft, gooey, and custom-dipped with sprinkles, drizzle, and details that photograph beautifully."
            imageSrc="/images/oreo-rice-krispie-treats.jpg"
            imageAlt="Square Oreo rice krispies treats with cookie chunks on a bright white surface"
            pricing="From $18 / half dozen"
            flippable
          />
          <TreatCard
            title="Custom Orders"
            description="From dessert tables to special requests—tell us what you’re celebrating and we’ll plan the perfect treats."
            imageSrc="/images/choc-strawberries.jpg"
            imageAlt="Gourmet chocolate-covered strawberries with decorative toppings"
            pricing="Pricing on request"
            flippable
          />
        </div>
        </section>
      </FadeIn>

      <FadeIn delay={0}>
        <ReviewsSection />
      </FadeIn>

      <FadeIn delay={0}>
        <section className="bg-background">
          <div className="site-container site-section">
            <h2 className="site-h2 text-text">Perfect for every occasion</h2>
          <p className="site-lead mt-3 max-w-2xl">
            From school events to weddings — we&apos;ve got your celebration
            covered.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full border border-black/10 bg-surface px-4 py-2 text-sm font-medium text-text sm:text-base">
              🎂 Birthdays
            </span>
            <span className="inline-flex items-center rounded-full border border-black/10 bg-surface px-4 py-2 text-sm font-medium text-text sm:text-base">
              💍 Weddings &amp; Engagements
            </span>
            <span className="inline-flex items-center rounded-full border border-black/10 bg-surface px-4 py-2 text-sm font-medium text-text sm:text-base">
              🌙 Eid &amp; Ramadan
            </span>
            <span className="inline-flex items-center rounded-full border border-black/10 bg-surface px-4 py-2 text-sm font-medium text-text sm:text-base">
              🎓 Graduations
            </span>
            <span className="inline-flex items-center rounded-full border border-black/10 bg-surface px-4 py-2 text-sm font-medium text-text sm:text-base">
              🎉 Custom Events
            </span>
          </div>
        </div>
        </section>
      </FadeIn>

      <FadeIn delay={0}>
        <section className="bg-surface">
          <div className="site-container site-section">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-3">
              <h2 className="site-h2 text-text">Made fresh. Made with heart.</h2>
              <p className="site-lead">
                Hi, I’m Ayesha—a home baker near Schaumburg, IL. Every order is
                made-to-order with care, so your treats taste as good as they
                look.
              </p>
              <Link
                href="/about"
                className="site-button inline-flex items-center justify-center rounded-full bg-secondary px-5 py-3 text-background shadow-sm transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Meet Ayesha
              </Link>
            </div>
            <div className="rounded-3xl border border-black/5 bg-background p-6 shadow-sm">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-text sm:text-base">
                  Follow along
                </div>
                <p className="site-body">
                  Follow along for behind-the-scenes baking, new drops, and
                  custom designs.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <a
                    href="https://www.tiktok.com/@thesweetsbyayesha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-button rounded-full border border-black/10 bg-surface px-4 py-2 text-text transition hover:brightness-95"
                    aria-label="TikTok @thesweetsbyayesha (opens in a new tab)"
                  >
                    TikTok
                  </a>
                  <a
                    href="https://www.instagram.com/thesweetsbyayesha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-button rounded-full border border-black/10 bg-surface px-4 py-2 text-text transition hover:brightness-95"
                    aria-label="Instagram @thesweetsbyayesha (opens in a new tab)"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
      </FadeIn>
    </div>
  );
}
