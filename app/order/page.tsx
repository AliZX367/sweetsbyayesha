import type { Metadata } from "next";
import { ORDER_INQUIRY_EMAIL } from "./constants";
import { OrderForm } from "./ui/OrderForm";

export const metadata: Metadata = {
  description:
    "Order custom treats made with halal ingredients from The Sweets by Ayesha. Send an order inquiry by email: cake pops, rice krispie treats, and more near Schaumburg, IL.",
  openGraph: {
    title: "Order Now | The Sweets by Ayesha",
    description:
      "Send your order details by email — we’ll get back to you to confirm.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
    <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-serif text-3xl tracking-tight text-text sm:text-4xl">
        Ready to Order?
      </h1>
      <p className="mt-3 text-sm leading-6 text-text/80 sm:text-base">
        Use the form to draft your request, then send it from your own email
        app. We&apos;ll reply to confirm details and timing.
      </p>

      <p className="mt-6 text-sm leading-6 text-text/80">
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

      <p className="mt-6 text-sm leading-6 text-text/80">
        Pickup available near Schaumburg, IL. Delivery options discussed after
        we connect by email.
      </p>
    </div>
  );
}
