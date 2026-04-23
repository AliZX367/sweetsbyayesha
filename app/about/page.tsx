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
        <div className="site-container site-section grid gap-10 md:grid-cols-2 md:items-center">
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
            <h1 className="site-h1 text-text">About me</h1>
            <p className="site-lead">
              Hi, I&apos;m Ayesha — a home baker near Schaumburg, IL. I make
              made-to-order treats using halal ingredients, with a focus on
              flavors that taste as good as they look.
            </p>
            <p className="site-body">
              I started baking for the people I love, and it grew into The
              Sweets by Ayesha — a little corner where celebrations get a
              sweeter, more personal touch.
            </p>
            <p className="site-body">
              If you have a theme, color palette, or a special request, I love
              bringing it to life — from cake pops and rice krispie treats to
              dessert cups, chocolate strawberries, and custom dessert tables.
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
        <div className="site-container site-section">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-black/5 bg-background p-6 shadow-sm md:col-span-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-text">
                <span className="inline-block h-2 w-2 rounded-full bg-accent" />
                Made with Halal Ingredients
              </div>
              <p className="site-body mt-3">
                I’m intentional about what goes into every order, so you can
                celebrate with confidence.
              </p>
            </div>

            <div className="rounded-3xl border border-black/5 bg-background p-6 shadow-sm md:col-span-2">
              <h2 className="site-h2 text-text">What I care about</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-text/80 sm:grid-cols-2 sm:text-base">
                <li className="rounded-2xl bg-surface px-4 py-3">
                  <span className="font-semibold text-text">Made to order</span>{" "}
                  so everything arrives fresh.
                </li>
                <li className="rounded-2xl bg-surface px-4 py-3">
                  <span className="font-semibold text-text">Fresh ingredients</span>{" "}
                  and flavor-forward recipes.
                </li>
                <li className="rounded-2xl bg-surface px-4 py-3">
                  <span className="font-semibold text-text">Local pickup</span>{" "}
                  near Schaumburg, IL.
                </li>
                <li className="rounded-2xl bg-surface px-4 py-3">
                  <span className="font-semibold text-text">Delivery options</span>{" "}
                  discussed when we confirm details.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

