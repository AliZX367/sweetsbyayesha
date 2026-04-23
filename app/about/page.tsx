import type { Metadata } from "next";
import Image from "next/image";
import {
  DEFAULT_OG_IMAGE_PATH,
  SITE_NAME,
  SITE_URL,
  TWITTER_SITE,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Meet Ayesha — halal home baker",
  description:
    "Meet Ayesha of The Sweets by Ayesha: halal-certified home bakery near Schaumburg, IL — custom cake pops, dessert tables & celebration treats made to order.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/about`,
    title: `Meet Ayesha | ${SITE_NAME}`,
    description:
      "Halal-certified home baker near Schaumburg — custom treats, dessert tables & celebration sweets made with care.",
    siteName: SITE_NAME,
    locale: "en_US",
    images: [
      {
        url: DEFAULT_OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: `About ${SITE_NAME} — halal home bakery Schaumburg, IL`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_SITE,
    title: `Meet Ayesha | ${SITE_NAME}`,
    description:
      "Halal-certified home baker near Schaumburg — custom cake pops, dessert tables & celebration treats.",
    images: [DEFAULT_OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <div>
      <section className="bg-background">
        <div className="site-container grid gap-10 py-14 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <div className="flex justify-center mb-8 md:justify-start">
              <Image
                src="/brand-logo.png"
                alt="The Sweets by Ayesha brand logo"
                width={200}
                height={200}
                className="rounded-full shadow-lg"
              />
            </div>
            <h1 className="font-serif text-3xl tracking-tight text-text sm:text-4xl">
              About Ayesha
            </h1>
            <p className="text-sm leading-6 text-text/80 sm:text-base">
              Hi, I&apos;m Ayesha — a home baker near Schaumburg, IL passionate
              about creating beautiful treats made with halal ingredients for
              every occasion.
            </p>
            <p className="text-sm leading-6 text-text/80 sm:text-base">
              Whether you need a few dozen cake pops for a school event or a
              fully coordinated dessert table, I love collaborating on themes,
              colors, and flavors to make your celebration feel extra special.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-surface shadow-sm">
            <Image
              src="/images/hero-bg.jpg"
              alt="A beautiful dessert table with custom treats by Ayesha"
              width={1200}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="site-container py-14">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-black/5 bg-background p-6 shadow-sm md:col-span-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-text">
                <span className="inline-block h-2 w-2 rounded-full bg-accent" />
                Made with Halal Ingredients
              </div>
              <p className="mt-3 text-sm leading-6 text-text/80">
                Every ingredient and process is chosen with care, so you can
                order with confidence.
              </p>
            </div>

            <div className="rounded-3xl border border-black/5 bg-background p-6 shadow-sm md:col-span-2">
              <h2 className="font-serif text-2xl tracking-tight text-text">
                What makes The Sweets by Ayesha different
              </h2>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-text/80 sm:grid-cols-2">
                <li className="rounded-2xl bg-surface px-4 py-3">
                  <span className="font-semibold text-text">Made to order</span>{" "}
                  so your treats arrive fresh.
                </li>
                <li className="rounded-2xl bg-surface px-4 py-3">
                  <span className="font-semibold text-text">Fresh ingredients</span>{" "}
                  with flavor-forward recipes.
                </li>
                <li className="rounded-2xl bg-surface px-4 py-3">
                  <span className="font-semibold text-text">Local pickup</span>{" "}
                  near Schaumburg, IL.
                </li>
                <li className="rounded-2xl bg-surface px-4 py-3">
                  <span className="font-semibold text-text">Delivery options</span>{" "}
                  discussed upon confirmation.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

