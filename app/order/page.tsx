import type { Metadata } from "next";
import {
  DEFAULT_OG_IMAGE_PATH,
  SITE_NAME,
  SITE_URL,
  TWITTER_SITE,
} from "@/lib/site-config";
import { ORDER_INQUIRY_EMAIL } from "./constants";
import { OrderForm } from "./ui/OrderForm";

export const metadata: Metadata = {
  title: "Order halal custom treats",
  description:
    "Place a halal-certified treat order near Schaumburg, IL. Email your date, theme & flavors — The Sweets by Ayesha replies to confirm pickup or delivery.",
  alternates: {
    canonical: "/order",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/order`,
    title: `Order custom halal treats | ${SITE_NAME}`,
    description:
      "Email your order details for cake pops, rice krispie treats, dessert cups & custom celebration sweets — we confirm dates and pickup or delivery.",
    siteName: SITE_NAME,
    locale: "en_US",
    images: [
      {
        url: DEFAULT_OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: `Order halal treats from ${SITE_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_SITE,
    title: `Order custom halal treats | ${SITE_NAME}`,
    description:
      "Email your order for halal cake pops, rice krispie treats & custom sweets — pickup & delivery near Schaumburg, IL.",
    images: [DEFAULT_OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const howItWorksSteps = [
  {
    title: "Fill out the form",
    body:
      "Tell us what you want, when you need it, and any special requests.",
  },
  {
    title: "We get back to you",
    body:
      "Ayesha replies to confirm your order details and final pricing.",
  },
  {
    title: "Pick up your treats",
    body: "Collect near Schaumburg, IL on your agreed date.",
  },
] as const;

export default function OrderPage() {
  return (
    <div className="site-container-narrow site-section">
      <h1 className="site-h1 text-text">Ready to Order?</h1>
      <p className="site-lead mt-3">
        Use the form to draft your request, then send it from your own email
        app. We&apos;ll reply to confirm details and timing.
      </p>

      <p className="site-body mt-6">
        <span className="font-semibold text-text">Email:</span>{" "}
        <a
          className="font-medium text-text underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
          href={`mailto:${ORDER_INQUIRY_EMAIL}`}
        >
          {ORDER_INQUIRY_EMAIL}
        </a>
      </p>

      <section className="mt-10 rounded-3xl border border-black/5 bg-surface p-6 shadow-sm sm:p-8">
        <h2 className="font-serif text-xl tracking-tight text-text sm:text-2xl">
          How it works
        </h2>
        <ol className="mt-6 grid gap-5 sm:grid-cols-3">
          {howItWorksSteps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-2xl border border-black/5 bg-background p-4"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-background">
                {i + 1}
              </div>
              <h3 className="mt-3 text-sm font-semibold text-text">
                {step.title}
              </h3>
              <p className="mt-1 text-xs leading-5 text-text/80 sm:text-sm sm:leading-6">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-8 rounded-3xl border border-black/5 bg-surface p-6 shadow-sm sm:p-8">
        <OrderForm />
      </div>

      <p className="site-body mt-6">
        Pickup available near Schaumburg, IL. Delivery options discussed after
        we connect by email.
      </p>
    </div>
  );
}
