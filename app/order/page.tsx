import type { Metadata } from "next";
import { ORDER_INQUIRY_EMAIL } from "./constants";
import { OrderForm } from "./ui/OrderForm";

export const metadata: Metadata = {
  title: "Place an Order | Custom Halal Treats",
  description:
    "Order custom halal-certified treats from The Sweets by Ayesha. Send an order inquiry by email: cake pops, rice krispie treats, and more near Schaumburg, IL.",
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

      <div className="mt-6 rounded-2xl border border-black/10 bg-background px-4 py-3 text-sm leading-6 text-text/90 shadow-sm">
        <span className="font-semibold text-text">Email (placeholder):</span>{" "}
        <a
          className="font-medium text-text underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
          href={`mailto:${ORDER_INQUIRY_EMAIL}`}
        >
          {ORDER_INQUIRY_EMAIL}
        </a>
        <span className="text-text/70">
          {" "}
          — replace this address in{" "}
          <code className="rounded bg-surface px-1.5 py-0.5 text-xs text-text">
            app/order/constants.ts
          </code>{" "}
          when you have your real inbox.
        </span>
      </div>

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
