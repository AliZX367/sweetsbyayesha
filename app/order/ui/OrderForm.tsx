"use client";

import { track } from "@vercel/analytics";
import { useMemo, useState } from "react";
import {
  getActiveItem,
  MENU_ITEMS,
  type MenuItem,
  ORDER_INQUIRY_EMAIL,
} from "../constants";

type OrderFormState = {
  name: string;
  email: string;
  phone: string;
  selectedItem: string;
  quantity: number;
  dateNeeded: string;
  specialRequests: string;
};

const initialState: OrderFormState = {
  name: "",
  email: "",
  phone: "",
  selectedItem: "",
  quantity: 0,
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

function addDaysLocal(base: Date, days: number): Date {
  const d = new Date(
    base.getFullYear(),
    base.getMonth(),
    base.getDate()
  );
  d.setDate(d.getDate() + days);
  return d;
}

function formatYYYYMMDD(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getMinDateString(item: MenuItem | undefined, qty: number): string {
  const today = new Date();
  if (!item) {
    return formatYYYYMMDD(addDaysLocal(today, 7));
  }
  const leadDays =
    qty >= item.largeBatchAt ? item.largeLeadDays : item.minLeadDays;
  return formatYYYYMMDD(addDaysLocal(today, leadDays));
}

function clampQuantity(value: number, item: MenuItem): number {
  if (Number.isNaN(value)) {
    return item.minQty;
  }
  const snapped =
    item.minQty +
    Math.round((value - item.minQty) / item.qtyStep) * item.qtyStep;
  return Math.min(item.maxQty, Math.max(item.minQty, snapped));
}

function buildOrderMailto(
  payload: OrderFormState,
  activeItem: MenuItem
): string {
  const subject = `Order inquiry — ${payload.selectedItem} × ${payload.quantity} — ${payload.name}`;
  const body = [
    "Hi Ayesha,",
    "",
    "A new order inquiry has come in. Details below:",
    "",
    "──────────────────────────",
    "CONTACT",
    "──────────────────────────",
    `Name:   ${payload.name}`,
    `Email:  ${payload.email}`,
    `Phone:  ${payload.phone}`,
    "",
    "──────────────────────────",
    "ORDER",
    "──────────────────────────",
    `Item:      ${payload.selectedItem}`,
    `Quantity:  ${payload.quantity} ${activeItem.unit}`,
    `Date:      ${payload.dateNeeded}`,
    "",
    "──────────────────────────",
    "SPECIAL REQUESTS",
    "──────────────────────────",
    payload.specialRequests.trim() || "(none)",
    "",
    "Thanks!",
  ].join("\n");

  return `mailto:${ORDER_INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function OrderForm() {
  const [form, setForm] = useState<OrderFormState>(initialState);
  const [showMailHint, setShowMailHint] = useState(false);

  const activeItem = useMemo(
    () => getActiveItem(form.selectedItem),
    [form.selectedItem]
  );

  const minDateString = useMemo(
    () => getMinDateString(activeItem, form.quantity),
    [activeItem, form.quantity]
  );

  const canSubmit = useMemo(() => {
    if (form.name.trim().length === 0) return false;
    if (form.email.trim().length === 0) return false;
    if (form.phone.trim().length === 0) return false;
    if (!activeItem) return false;
    if (form.quantity < activeItem.minQty || form.quantity > activeItem.maxQty) {
      return false;
    }
    const date = form.dateNeeded.trim();
    if (date.length === 0) return false;
    if (date < minDateString) return false;
    return true;
  }, [form, activeItem, minDateString]);

  function update<K extends keyof OrderFormState>(
    key: K,
    value: OrderFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSelectItem(label: string) {
    const item = getActiveItem(label);
    setForm((prev) => ({
      ...prev,
      selectedItem: label,
      quantity: item ? item.minQty : 0,
      dateNeeded: "",
    }));
  }

  function onQuantityChange(raw: number) {
    if (!activeItem) return;
    update("quantity", clampQuantity(raw, activeItem));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!activeItem || !canSubmit) return;

    const payload: OrderFormState = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      selectedItem: form.selectedItem.trim(),
      quantity: form.quantity,
      dateNeeded: form.dateNeeded.trim(),
      specialRequests: form.specialRequests.trim(),
    };

    const href = buildOrderMailto(payload, activeItem);
    setShowMailHint(true);
    track("inquiry_sent", {
      item: payload.selectedItem,
      quantity: payload.quantity,
    });
    window.location.assign(href);
  }

  const stepperBtn =
    "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-surface text-base font-semibold text-text transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40";

  const numberInputClass =
    "w-24 rounded-2xl border border-black/10 bg-background px-4 py-3 text-center text-sm text-text shadow-sm outline-none [appearance:textfield] focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

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
          <FieldLabel htmlFor="phone">Phone *</FieldLabel>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputBase}
            placeholder="(555) 000-0000"
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
            min={minDateString}
            value={form.dateNeeded}
            onChange={(e) => update("dateNeeded", e.target.value)}
            className={cx(inputBase, "py-[0.7rem]")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <FieldLabel htmlFor="menuItem">What would you like to order? *</FieldLabel>
        <select
          id="menuItem"
          name="menuItem"
          required
          value={form.selectedItem}
          onChange={(e) => onSelectItem(e.target.value)}
          className={inputBase}
        >
          <option value="" disabled>
            Select a treat...
          </option>
          {MENU_ITEMS.map((item) => (
            <option key={item.label} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {form.selectedItem && activeItem ? (
        <>
          <div className="space-y-2">
            <FieldLabel htmlFor="quantity">
              Quantity * (min {activeItem.minQty}, max {activeItem.maxQty}{" "}
              {activeItem.unit})
            </FieldLabel>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className={stepperBtn}
                disabled={form.quantity <= activeItem.minQty}
                aria-label="Decrease quantity"
                onClick={() =>
                  onQuantityChange(form.quantity - activeItem.qtyStep)
                }
              >
                −
              </button>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min={activeItem.minQty}
                max={activeItem.maxQty}
                step={activeItem.qtyStep}
                value={form.quantity}
                onChange={(e) =>
                  onQuantityChange(Number.parseInt(e.target.value, 10))
                }
                className={numberInputClass}
              />
              <button
                type="button"
                className={stepperBtn}
                disabled={form.quantity >= activeItem.maxQty}
                aria-label="Increase quantity"
                onClick={() =>
                  onQuantityChange(form.quantity + activeItem.qtyStep)
                }
              >
                +
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-surface px-4 py-3 text-xs leading-5 text-text/70">
            {form.quantity >= activeItem.largeBatchAt ? (
              <>
                Large orders need at least {activeItem.largeLeadDays} days lead
                time. Please pick a date at least {activeItem.largeLeadDays}{" "}
                days from today.
              </>
            ) : (
              <>
                We need at least {activeItem.minLeadDays} days to prepare your
                order.
              </>
            )}
          </div>
        </>
      ) : null}

      <div className="space-y-2">
        <FieldLabel htmlFor="specialRequests">
          Special requests, theme details &amp; notes (optional)
        </FieldLabel>
        <textarea
          id="specialRequests"
          name="specialRequests"
          value={form.specialRequests}
          onChange={(e) => update("specialRequests", e.target.value)}
          className={cx(inputBase, "min-h-24 resize-y")}
          placeholder="Colors, theme, allergies, packaging, pickup notes..."
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
