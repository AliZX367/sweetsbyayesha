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

function allStrings(value: string | string[] | undefined): string[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
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
  const items = allStrings(sp.item);
  const qtys = allStrings(sp.qty);
  const date = firstString(sp.date);
  const showSummary = items.length > 0;

  const item = items[0];
  const qty = qtys[0];

  const calendarIcsHref =
    date && showSummary
      ? (() => {
          const p = new URLSearchParams({ date });
          items.forEach((it, i) => {
            p.append("item", it);
            if (qtys[i]) p.append("qty", qtys[i]);
          });
          return `/order/calendar?${p.toString()}`;
        })()
      : undefined;

  const googleCalendarHref =
    date && showSummary
      ? (() => {
          const titleParts = ["Treat pickup", item ? `— ${item}` : undefined].filter(
            Boolean
          );
          const text = titleParts.join(" ");
          const dates = `${date.replaceAll("-", "")}/${date.replaceAll("-", "")}`;
          const details = [
            "Order pickup reminder.",
            item ? `Item: ${item}` : undefined,
            qty ? `Quantity: ${qty}` : undefined,
            "Pickup details will be confirmed by email.",
          ]
            .filter(Boolean)
            .join("\n");
          return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
            text
          )}&dates=${encodeURIComponent(
            `${dates}T000000Z/${dates}T235900Z`
          )}&details=${encodeURIComponent(details)}`;
        })()
      : undefined;

  const outlookCalendarHref =
    date && showSummary
      ? (() => {
          const title = ["Treat pickup", item ? `— ${item}` : undefined]
            .filter(Boolean)
            .join(" ");
          const startdt = `${date.replaceAll("-", "")}T000000Z`;
          const enddt = `${date.replaceAll("-", "")}T235900Z`;
          const body = [
            "Order pickup reminder.",
            ...items.map((it, i) => (qtys[i] ? `${it} × ${qtys[i]}` : it)),
            "Pickup details confirmed by email.",
          ].join("\n");
          return `https://outlook.live.com/calendar/0/action/compose?rru=addevent&subject=${encodeURIComponent(title)}&startdt=${startdt}&enddt=${enddt}&body=${encodeURIComponent(body)}`;
        })()
      : undefined;

  const yahooCalendarHref =
    date && showSummary
      ? (() => {
          const title = ["Treat pickup", item ? `— ${item}` : undefined]
            .filter(Boolean)
            .join(" ");
          const st = `${date.replaceAll("-", "")}T000000Z`;
          const et = `${date.replaceAll("-", "")}T235900Z`;
          const desc = [
            "Order pickup reminder.",
            ...items.map((it, i) => (qtys[i] ? `${it} × ${qtys[i]}` : it)),
            "Pickup details confirmed by email.",
          ].join(" | ");
          return `https://calendar.yahoo.com/?v=60&title=${encodeURIComponent(title)}&st=${st}&et=${et}&desc=${encodeURIComponent(desc)}`;
        })()
      : undefined;

  const reminderIcsHref = calendarIcsHref
    ? `${calendarIcsHref}&reminder=1`
    : undefined;

  return (
    <div className="site-container-narrow site-section">
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
        Your inquiry is pre-filled and ready in your mail app. Once you tap{" "}
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
        Confirm your order
      </p>
      <p className="mt-1 text-sm leading-6 text-text/70">
        Once Ayesha confirms the details and pricing, you&apos;re all set.
        Payment is due at pickup or delivery.
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
            {items.length > 0 ? (
              <>
                <dt className="self-start text-text/60">
                  {items.length === 1 ? "Item" : "Items"}
                </dt>
                <dd className="space-y-0.5">
                  {items.map((it, i) => (
                    <p key={i} className="font-semibold text-text">
                      {it}
                      {qtys[i] ? (
                        <span className="ml-2 font-normal text-text/60">
                          × {qtys[i]}
                        </span>
                      ) : null}
                    </p>
                  ))}
                </dd>
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

      {date && showSummary ? (
        <div className="mt-6 rounded-3xl border border-black/5 bg-surface p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold tracking-widest text-text/50 uppercase">
            Save your date
          </p>
          <p className="mt-2 text-sm leading-6 text-text/70">
            Add your pickup date to any calendar. Apple and Outlook .ics files
            include a built-in 2-day reminder. For Google and Yahoo, set a
            reminder manually after adding.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {calendarIcsHref ? (
              <a
                href={calendarIcsHref}
                className="flex flex-col items-center gap-2 rounded-2xl border border-black/10 bg-background p-4 text-center text-sm font-medium text-text shadow-sm transition hover:bg-surface"
              >
                <span className="text-2xl" aria-hidden="true">
                  🍎
                </span>
                <span>Apple Calendar</span>
                <span className="text-xs text-text/50">
                  Includes 2-day reminder
                </span>
              </a>
            ) : null}

            {googleCalendarHref ? (
              <a
                href={googleCalendarHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 rounded-2xl border border-black/10 bg-background p-4 text-center text-sm font-medium text-text shadow-sm transition hover:bg-surface"
              >
                <span className="text-2xl" aria-hidden="true">
                  📅
                </span>
                <span>Google Calendar</span>
                <span className="text-xs text-text/50">
                  Set reminder manually
                </span>
              </a>
            ) : null}

            {outlookCalendarHref ? (
              <a
                href={outlookCalendarHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 rounded-2xl border border-black/10 bg-background p-4 text-center text-sm font-medium text-text shadow-sm transition hover:bg-surface"
              >
                <span className="text-2xl" aria-hidden="true">
                  📧
                </span>
                <span>Outlook</span>
                <span className="text-xs text-text/50">
                  Includes 2-day reminder
                </span>
              </a>
            ) : null}

            {yahooCalendarHref ? (
              <a
                href={yahooCalendarHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 rounded-2xl border border-black/10 bg-background p-4 text-center text-sm font-medium text-text shadow-sm transition hover:bg-surface"
              >
                <span className="text-2xl" aria-hidden="true">
                  📆
                </span>
                <span>Yahoo Calendar</span>
                <span className="text-xs text-text/50">
                  Set reminder manually
                </span>
              </a>
            ) : null}
          </div>

          {reminderIcsHref ? (
            <div className="mt-4 border-t border-black/5 pt-4">
              <a
                href={reminderIcsHref}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-background px-4 py-2 text-sm font-medium text-text shadow-sm transition hover:bg-surface"
              >
                <span aria-hidden="true">🔔</span>
                Download reminder (.ics)
              </a>
              <p className="mt-1 text-xs text-text/60">
                A standalone reminder file — works with Apple Reminders,
                Outlook, and most calendar apps.
              </p>
            </div>
          ) : null}
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
        <Link
          href="/order/history"
          className="inline-flex items-center justify-center rounded-full border border-black/10 bg-background px-6 py-3 text-sm font-semibold text-text transition hover:bg-surface"
        >
          View order history
        </Link>
      </div>
    </div>
  );
}
