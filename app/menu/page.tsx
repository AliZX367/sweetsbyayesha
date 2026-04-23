import type { Metadata } from "next";
import Link from "next/link";
import { TreatCard } from "@/app/components/TreatCard";
import {
  DEFAULT_OG_IMAGE_PATH,
  SITE_NAME,
  SITE_URL,
  TWITTER_SITE,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Halal cake pops & custom treats menu",
  description:
    "Halal-certified menu near Schaumburg, IL: cake pops, rice krispie treats, mango dessert cups, chocolate strawberries & fully custom dessert orders.",
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/menu`,
    title: `Halal treat menu | ${SITE_NAME}`,
    description:
      "Browse halal cake pops, rice krispie treats, mango dessert cups, chocolate strawberries & custom celebration orders.",
    siteName: SITE_NAME,
    locale: "en_US",
    images: [
      {
        url: DEFAULT_OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} treat menu — halal cake pops & more`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_SITE,
    title: `Halal treat menu | ${SITE_NAME}`,
    description:
      "Browse halal cake pops, rice krispie treats, mango dessert cups, chocolate strawberries & custom orders.",
    images: [DEFAULT_OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const treats = [
  {
    title: "Cake Pops",
    description:
      "Classic flavors and custom designs—perfect for parties, gifts, and dessert tables.",
    imageSrc: "/images/cake-pops.jpg",
    imageAlt: "Colorful decorated cake pops on display",
  },
  {
    title: "Rice Krispie Treats",
    description:
      "Soft, gooey, and decorated with dips, drizzles, sprinkles, and theme colors.",
    imageSrc: "/images/oreo-rice-krispie-treats.jpg",
    imageAlt:
      "Square Oreo rice krispies treats with cookie chunks on a bright white surface",
  },
  {
    title: "Mango Dessert Cups",
    description:
      "Layered dessert cups that feel bright, fresh, and party-perfect.",
    imageSrc: "/images/mango-cups.jpg",
    imageAlt: "Mango drinks in glasses with fresh mango and citrus",
  },
  {
    title: "Chocolate Strawberries",
    description:
      "Chocolate-dipped strawberries for gifts, dessert tables, and events.",
    imageSrc: "/images/choc-strawberries.jpg",
    imageAlt: "Gourmet chocolate-covered strawberries with decorative toppings",
  },
  {
    title: "Custom Orders",
    description:
      "Tell us your theme, colors, and date—we’ll help you plan the perfect treats.",
    imageSrc: "/images/hero-bg.jpg",
    imageAlt: "Elegant dessert table with cake and pink floral arrangements",
  },
] as const;

const howToOrderSteps = [
  {
    title: "Browse & choose",
    body:
      "Pick a treat (or invent one) and note your quantity, theme, and date.",
  },
  {
    title: "Send an inquiry",
    body: "Use the order form to share your details. No payment yet.",
  },
  {
    title: "We confirm & you pick up",
    body:
      "Ayesha replies to confirm pricing and timing, then you collect near Schaumburg, IL.",
  },
] as const;

export default function MenuPage() {
  return (
    <div>
      <section className="bg-surface">
        <div className="site-container site-section">
          <h1 className="site-h1 text-text">Our Treats</h1>
          <p className="site-lead mt-3 max-w-2xl">
            Everything is made fresh to order using halal ingredients. Pick a
            favourite or describe your theme — we&apos;ll bring it to life.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full border border-black/10 bg-background px-3 py-1.5 text-xs font-semibold text-text">
              Made with halal ingredients
            </span>
            <span className="inline-flex items-center rounded-full border border-black/10 bg-background px-3 py-1.5 text-xs font-semibold text-text">
              Fresh to order
            </span>
            <span className="inline-flex items-center rounded-full border border-black/10 bg-background px-3 py-1.5 text-xs font-semibold text-text">
              Custom orders welcome
            </span>
          </div>
        </div>
      </section>

      <section className="site-container site-section">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 *:min-w-0">
          {treats.map((t) => (
            <TreatCard
              key={t.title}
              title={t.title}
              description={t.description}
              imageSrc={t.imageSrc}
              imageAlt={t.imageAlt}
            />
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="site-container site-section">
          <h2 className="site-h2 text-text">How to order</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-3">
            {howToOrderSteps.map((step, i) => (
              <li
                key={step.title}
                className="rounded-3xl border border-black/5 bg-background p-6 shadow-sm"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-background">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-serif text-lg text-text">
                  {step.title}
                </h3>
                <p className="site-body mt-2">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="site-container site-section">
        <p className="site-body">
          Have questions?{" "}
          <Link href="/faq" className="font-semibold text-text underline">
            Visit our FAQ
          </Link>
          .
        </p>

        <div className="mt-10 rounded-3xl border border-black/5 bg-surface p-6">
          <p className="site-body">
            Don&apos;t see what you&apos;re looking for?{" "}
            <Link className="font-semibold text-text underline" href="/order">
              Send us a message
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
