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

const faqItems = [
  {
    q: "How far in advance should I order?",
    a: "At least 5–7 days for most orders; 2+ weeks for large events.",
  },
  {
    q: "What is your minimum order?",
    a: "Minimums vary by item — just mention your quantity in the inquiry.",
  },
  {
    q: "Do you deliver?",
    a: "Local delivery is available for some areas; pickup near Schaumburg is always an option.",
  },
  {
    q: "Are your ingredients halal?",
    a: "Yes — all ingredients are sourced to be halal. No pork, no alcohol.",
  },
] as const;

export default function MenuPage() {
  return (
    <div>
      <section className="bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="font-serif text-3xl tracking-tight text-text sm:text-4xl">
            Our Treats
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-text/80 sm:text-base">
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

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
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
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-serif text-2xl tracking-tight text-text sm:text-3xl">
            How to order
          </h2>
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
                <p className="mt-2 text-sm leading-6 text-text/80">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="font-serif text-xl tracking-tight text-text sm:text-2xl">
          FAQ
        </h2>
        <div className="mt-4 divide-y divide-black/10 rounded-3xl border border-black/5 bg-background px-4 shadow-sm sm:px-6">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="py-4 open:[&_summary_svg]:rotate-180 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-text">
                {item.q}
                <span className="shrink-0 text-text/50" aria-hidden>
                  <svg
                    className="transition-transform duration-200"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <p className="mt-2 text-sm leading-6 text-text/80">{item.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-black/5 bg-surface p-6">
          <p className="text-sm leading-6 text-text/80">
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
