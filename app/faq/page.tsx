import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about ordering from The Sweets by Ayesha — halal ingredients, lead times, delivery, pricing, custom orders, and more.",
  robots: { index: true, follow: true },
};

const faqCategories = [
  {
    title: "Ordering",
    items: [
      {
        q: "How do I place an order?",
        a: "Fill out the form on our Order page with your item, quantity, date, and any special requests. Ayesha will reply by email to confirm details and pricing before anything is finalised.",
      },
      {
        q: "How far in advance should I order?",
        a: "At least 5–7 days for most orders. For large events, wedding dessert tables, or big quantities, please reach out 2–4 weeks in advance so we can plan properly.",
      },
      {
        q: "Do you take rush orders?",
        a: "Occasionally, depending on availability. Send an inquiry and we'll let you know — we always try to help where we can.",
      },
      {
        q: "How will I know my order is confirmed?",
        a: "Ayesha will reply to your inquiry email to confirm your order, the date, and the total. Nothing is locked in until you receive that confirmation.",
      },
    ],
  },
  {
    title: "Ingredients & Dietary",
    items: [
      {
        q: "Are your ingredients halal?",
        a: "Yes — every ingredient is sourced to meet halal standards. We never use pork or alcohol in any product.",
      },
      {
        q: "Do you accommodate food allergies?",
        a: "Please mention any allergies when you place your order. We'll do our best to accommodate. Note that our kitchen handles tree nuts, dairy, and gluten — we cannot guarantee a fully allergen-free environment.",
      },
      {
        q: "Are your treats suitable for vegetarians?",
        a: "Yes, all of our products are vegetarian and made with halal ingredients.",
      },
      {
        q: "Are your products nut-free?",
        a: "Our kitchen is not a nut-free environment. If you have a nut allergy, please let us know when ordering so we can advise you properly.",
      },
    ],
  },
  {
    title: "Pricing & Payment",
    items: [
      {
        q: "How much do your treats cost?",
        a: "Pricing varies by item and quantity. Visit the Our Treats page for starting prices, or include your details in an order inquiry and we'll send you a custom quote.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept cash, Venmo, Zelle, and Apple Pay. Payment details are shared when your order is confirmed.",
      },
      {
        q: "Is a deposit required?",
        a: "Yes — a 50% deposit is required to secure your order date. The remaining balance is due at pickup.",
      },
    ],
  },
  {
    title: "Pickup & Delivery",
    items: [
      {
        q: "Where are you located?",
        a: "We're based near Schaumburg, IL. The exact pickup address is shared with you once your order is confirmed.",
      },
      {
        q: "Do you deliver?",
        a: "Local delivery is available in select areas around Schaumburg. Mention your address when you reach out and we'll let you know if we can get to you.",
      },
      {
        q: "Can someone else pick up my order on my behalf?",
        a: "Absolutely — just let us know their name when confirming your order.",
      },
      {
        q: "Do you do dessert tables for weddings or large events?",
        a: "Yes, we love working on big celebrations! Reach out at least 3–4 weeks ahead so we have time to plan everything properly.",
      },
    ],
  },
] as const;

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group mb-3 overflow-hidden rounded-2xl border border-black/10 bg-background shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-semibold text-text sm:text-base [&::-webkit-details-marker]:hidden">
        <span>{q}</span>
        <svg
          className="shrink-0 transition-transform duration-200 group-open:rotate-180"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <p className="px-5 pb-4 text-sm leading-6 text-text/80 sm:text-base">
        {a}
      </p>
    </details>
  );
}

export default function FaqPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-surface">
        <div className="site-container-narrow site-section">
          <h1 className="site-h1 text-text">Frequently Asked Questions</h1>
          <p className="site-lead mt-3">
            Everything you need to know before placing your first order.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="site-container-narrow site-section">
          {faqCategories.map((category, index) => (
            <div key={category.title}>
              <h2
                className={`font-serif text-lg mb-3 text-text sm:text-xl ${index === 0 ? "mt-0" : "mt-8"}`}
              >
                {category.title}
              </h2>
              {category.items.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          ))}

          <div className="mt-12 text-center">
            <p className="text-sm font-semibold text-text sm:text-base">
              Still have a question?
            </p>
            <Link
              href="/order"
              className="site-button mt-4 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-background shadow-sm transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Send us a message
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
