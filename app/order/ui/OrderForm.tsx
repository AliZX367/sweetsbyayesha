"use client";

import { useMemo, useState } from "react";
import { ORDER_INQUIRY_EMAIL } from "../constants";

type OrderFormState = {
  name: string;
  email: string;
  phone: string;
  orderDetails: string;
  dateNeeded: string;
  specialRequests: string;
};

const initialState: OrderFormState = {
  name: "",
  email: "",
  phone: "",
  orderDetails: "",
  dateNeeded: "",
  specialRequests: "",
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold text-text">
      {children}
    </label>
  );
}

const inputBase =
  "w-full rounded-2xl border border-black/10 bg-background px-4 py-3 text-sm text-text shadow-sm outline-none transition placeholder:text-text/40 focus:border-black/15 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface";

function buildOrderMailto(payload: OrderFormState): string {
  const subject = `Order inquiry — ${payload.name}`;
  const body = [
    "Hi Ayesha,",
    "",
    "I'd like to place an order. Details below:",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : "Phone: (not provided)",
    `Date needed: ${payload.dateNeeded}`,
    "",
    "What I'm ordering:",
    payload.orderDetails,
    "",
    payload.specialRequests
      ? `Special requests:\n${payload.specialRequests}`
      : "Special requests: (none)",
    "",
    "Thanks!",
  ].join("\n");

  return `mailto:${ORDER_INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function OrderForm() {
  const [form, setForm] = useState<OrderFormState>(initialState);
  const [showMailHint, setShowMailHint] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length > 0 &&
      form.email.trim().length > 0 &&
      form.orderDetails.trim().length > 0 &&
      form.dateNeeded.trim().length > 0
    );
  }, [form]);

  function update<K extends keyof OrderFormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload: OrderFormState = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      orderDetails: form.orderDetails.trim(),
      dateNeeded: form.dateNeeded.trim(),
      specialRequests: form.specialRequests.trim(),
    };

    const href = buildOrderMailto(payload);
    setShowMailHint(true);
    window.location.assign(href);
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      {showMailHint ? (
        <div
          role="status"
          className="rounded-2xl border border-black/10 bg-background px-4 py-3 text-sm leading-6 text-text/90"
        >
          <span className="font-semibold text-text">Check your email app.</span>{" "}
          A draft message to{" "}
          <a
            className="font-semibold text-text underline"
            href={`mailto:${ORDER_INQUIRY_EMAIL}`}
          >
            {ORDER_INQUIRY_EMAIL}
          </a>{" "}
          should have opened—review it and tap <strong>Send</strong>. If nothing
          opened, copy your details and email that address manually.
        </div>
      ) : null}

      <p className="text-sm leading-6 text-text/80">
        Fill this out, then <strong className="text-text">Continue to email</strong>{" "}
        — your mail app opens with everything filled in so you can send it when
        you&apos;re ready.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <FieldLabel htmlFor="name">Name *</FieldLabel>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputBase}
            placeholder="Your name"
            autoComplete="name"
          />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="email">Your email *</FieldLabel>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputBase}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <FieldLabel htmlFor="phone">Phone (optional)</FieldLabel>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputBase}
            placeholder="(optional)"
            autoComplete="tel"
          />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="dateNeeded">Date needed *</FieldLabel>
          <input
            id="dateNeeded"
            name="dateNeeded"
            type="date"
            required
            value={form.dateNeeded}
            onChange={(e) => update("dateNeeded", e.target.value)}
            className={cx(inputBase, "py-[0.7rem]")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <FieldLabel htmlFor="orderDetails">What are you ordering? *</FieldLabel>
        <textarea
          id="orderDetails"
          name="orderDetails"
          required
          value={form.orderDetails}
          onChange={(e) => update("orderDetails", e.target.value)}
          className={cx(inputBase, "min-h-28 resize-y")}
          placeholder="Treat type, quantity, theme/colors, flavors..."
        />
      </div>

      <div className="space-y-2">
        <FieldLabel htmlFor="specialRequests">Special requests (optional)</FieldLabel>
        <textarea
          id="specialRequests"
          name="specialRequests"
          value={form.specialRequests}
          onChange={(e) => update("specialRequests", e.target.value)}
          className={cx(inputBase, "min-h-24 resize-y")}
          placeholder="Allergies, packaging, pickup/delivery notes..."
        />
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className={cx(
          "inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          canSubmit
            ? "bg-primary text-background hover:brightness-95"
            : "cursor-not-allowed bg-black/10 text-text/50"
        )}
      >
        Continue to email — review &amp; send
      </button>
    </form>
  );
}
