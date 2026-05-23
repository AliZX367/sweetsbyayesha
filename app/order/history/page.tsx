"use client";

import { format, parseISO } from "date-fns";
import Link from "next/link";
import { useOrderHistory } from "../ui/useOrderHistory";

function formatDateNeeded(dateNeeded: string): string {
  try {
    return format(parseISO(dateNeeded), "MMM d, yyyy");
  } catch {
    return dateNeeded;
  }
}

function formatSubmittedAt(submittedAt: string): string {
  try {
    return format(parseISO(submittedAt), "MMM d, yyyy 'at' h:mm a");
  } catch {
    return submittedAt;
  }
}

export default function OrderHistoryPage() {
  const { records, clearHistory } = useOrderHistory();

  return (
    <div className="site-container-narrow site-section">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="site-h1 text-text">Order History</h1>
          <p className="site-lead mt-2">
            Past inquiries submitted from this browser.
          </p>
        </div>
        {records.length > 0 ? (
          <button
            type="button"
            onClick={() => {
              if (confirm("Clear all order history from this browser?")) {
                clearHistory();
              }
            }}
            className="mt-2 shrink-0 rounded-full border border-black/10 bg-background px-4 py-2 text-sm font-medium text-text/60 transition hover:bg-surface"
          >
            Clear history
          </button>
        ) : null}
      </div>

      {records.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-black/5 bg-surface p-8 text-center shadow-sm">
          <p className="text-sm text-text/60">No inquiries yet.</p>
          <Link
            href="/order"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-background shadow-sm transition hover:brightness-95"
          >
            Place an order
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {records.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl border border-black/10 bg-background p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-base font-semibold text-text sm:text-lg">
                    {r.lineItems.map((li) => li.selectedItem).join(", ")}
                  </p>
                  <p className="mt-0.5 text-xs text-text/50">
                    Submitted {formatSubmittedAt(r.submittedAt)}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-black/10 bg-surface px-3 py-1 text-xs font-medium text-text/70">
                  Inquiry sent
                </span>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-xs text-text/50">Name</dt>
                  <dd className="font-medium text-text">{r.name}</dd>
                </div>
                <div>
                  <dt className="text-xs text-text/50">Date needed</dt>
                  <dd className="font-medium text-text">
                    {formatDateNeeded(r.dateNeeded)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-text/50">Payment</dt>
                  <dd className="font-medium text-text">{r.paymentMethod}</dd>
                </div>
              </dl>

              {r.lineItems.length > 0 ? (
                <ul className="mt-3 space-y-1">
                  {r.lineItems.map((li, i) => (
                    <li key={i} className="text-xs text-text/70">
                      {li.selectedItem} × {li.quantity}
                    </li>
                  ))}
                </ul>
              ) : null}

              {r.specialRequests ? (
                <p className="mt-3 rounded-xl bg-surface px-3 py-2 text-xs leading-5 text-text/70">
                  {r.specialRequests}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          href="/order"
          className="inline-flex items-center justify-center rounded-full border border-black/10 bg-background px-5 py-3 text-sm font-semibold text-text transition hover:bg-surface"
        >
          Place another order
        </Link>
      </div>
    </div>
  );
}
