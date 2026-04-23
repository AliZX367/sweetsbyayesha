import type { Metadata } from "next";
import Link from "next/link";
import { ORDER_INQUIRY_EMAIL } from "../constants";

export const metadata: Metadata = {
  title: "Order Inquiry Sent",
  description:
    "Your order inquiry is on its way to The Sweets by Ayesha. Keep an eye on your inbox for a confirmation.",
  robots: { index: false, follow: false },
};

function firstString(
  value: string | string[] | undefined
): string | undefined {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{
    name?: string | string[];
    item?: string | string[];
    qty?: string | string[];
    date?: string | string[];
  }>;
}) {
  const sp = await searchParams;
  const name = firstString(sp.name);
  const item = firstString(sp.item);
  const qty = firstString(sp.qty);
  const date = firstString(sp.date);
  const showSummary = Boolean(item);

  return (
    <div className="site-container-narrow py-14">
      <div className="flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-black/5 bg-surface shadow-sm">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
            aria-hidden="true"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,12 2,6" />
          </svg>
        </div>
      </div>

      <h1 className="mt-6 text-center font-serif text-3xl tracking-tight text-text sm:text-4xl">
        Check your email app
      </h1>
      <p className="mx-auto mt-3 max-w-md text-center text-sm leading-6 text-text/80">
        Your inquiry draft is ready in your mail app. Once you tap{" "}
        <strong className="text-text">Send</strong>, Ayesha will be in touch
        within 24–48 hours to confirm your order.
      </p>

      <div className="mt-8 rounded-3xl border border-black/5 bg-surface p-6 shadow-sm">
        <p className="mb-4 text-xs font-semibold tracking-widest text-text/50 uppercase">
          Next steps
        </p>
        <div className="space-y-5 border-l-2 border-accent pl-4">
          <div>
            <p className="text-sm font-semibold text-text">
              Tap Send in your mail app
            </p>
            <p className="mt-1 text-sm leading-6 text-text/70">
              Your inquiry is pre-filled and ready to go. Open your mail app and
              hit Send — it goes straight to Ayesha.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-text">
              Wait for Ayesha&apos;s reply
            </p>
            <p className="mt-1 text-sm leading-6 text-text/70">
              Ayesha responds within 24–48 hours to confirm your order, answer
              questions, and share final pricing.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-text">
              Confirm and pay your deposit
            </p>
            <p className="mt-1 text-sm leading-6 text-text/70">
              Once you agree on the details, a 50% deposit secures your date.
              Balance is due at pickup.
            </p>
          </div>
        </div>
      </div>

      {showSummary ? (
        <div className="mt-6 rounded-2xl border border-black/10 bg-background px-5 py-4 shadow-sm">
          <p className="mb-3 text-xs font-semibold tracking-widest text-text/50 uppercase">
            Your inquiry summary
          </p>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {name ? (
              <>
                <dt className="text-text/60">Name</dt>
                <dd className="font-semibold text-text">{name}</dd>
              </>
            ) : null}
            {item ? (
              <>
                <dt className="text-text/60">Item</dt>
                <dd className="font-semibold text-text">{item}</dd>
              </>
            ) : null}
            {qty ? (
              <>
                <dt className="text-text/60">Quantity</dt>
                <dd className="font-semibold text-text">{qty}</dd>
              </>
            ) : null}
            {date ? (
              <>
                <dt className="text-text/60">Date needed</dt>
                <dd className="font-semibold text-text">{date}</dd>
              </>
            ) : null}
          </dl>
        </div>
      ) : null}

      <p className="mt-6 text-center text-sm text-text/70">
        Mail app didn&apos;t open?{" "}
        <a
          href={`mailto:${ORDER_INQUIRY_EMAIL}`}
          className="font-semibold text-text underline"
        >
          Email us directly
        </a>{" "}
        and paste your order details.
      </p>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/menu"
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background shadow-sm transition hover:brightness-95"
        >
          Browse our treats
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-black/10 bg-background px-6 py-3 text-sm font-semibold text-text transition hover:bg-surface"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
