"use client";

import { track } from "@vercel/analytics";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  getActiveItem,
  MENU_ITEMS,
  type MenuItem,
  ORDER_INQUIRY_EMAIL,
} from "../constants";

const PAYMENT_METHODS = [
  "Cash (preferred)",
  "Zelle",
  "Cash App",
  "Venmo",
] as const;

type PaymentMethod = (typeof PAYMENT_METHODS)[number];

type OrderFormState = {
  name: string;
  email: string;
  phone: string;
  selectedItem: string;
  quantity: number;
  dateNeeded: string;
  paymentMethod: PaymentMethod | "";
  specialRequests: string;
};

const initialState: OrderFormState = {
  name: "",
  email: "",
  phone: "",
  selectedItem: "",
  quantity: 0,
  dateNeeded: "",
  paymentMethod: "Cash (preferred)",
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
    <label
      htmlFor={htmlFor}
      className="text-sm font-semibold text-text sm:text-base"
    >
      {children}
    </label>
  );
}

const inputBase =
  "w-full rounded-2xl border border-black/10 bg-background px-4 py-3 text-sm text-text shadow-sm outline-none transition placeholder:text-text/40 focus:border-black/15 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface sm:text-base";

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
  const payment = payload.paymentMethod || "(not selected)";
  const notes = payload.specialRequests.trim() || "(none)";
  const body = [
    "Hi Ayesha,",
    "",
    "New order inquiry details:",
    "",
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    "",
    `Order: ${payload.selectedItem} × ${payload.quantity} ${activeItem.unit}`,
    `Expected pickup: ${payload.dateNeeded}`,
    "",
    `Payment: ${payment}`,
    "",
    "Notes",
    notes,
    "",
    "Thanks!",
  ].join("\n");

  return `mailto:${ORDER_INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function OrderForm() {
  const router = useRouter();
  const [form, setForm] = useState<OrderFormState>(initialState);
  const [dateOpen, setDateOpen] = useState(false);

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
    if (!form.paymentMethod) return false;
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
      paymentMethod: form.paymentMethod,
      specialRequests: form.specialRequests.trim(),
    };

    const href = buildOrderMailto(payload, activeItem);

    const a = document.createElement("a");
    a.href = href;
    a.click();

    track("inquiry_sent", {
      item: payload.selectedItem,
      quantity: payload.quantity,
    });

    const params = new URLSearchParams({
      name: payload.name,
      item: payload.selectedItem,
      qty: String(payload.quantity),
      date: payload.dateNeeded,
    });

    window.setTimeout(() => {
      router.push(`/order/confirmation?${params.toString()}`);
    }, 600);
  }

  const stepperBtn =
    "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-surface text-base font-semibold text-text transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40";

  const numberInputClass =
    "w-24 rounded-2xl border border-black/10 bg-background px-4 py-3 text-center text-sm text-text shadow-sm outline-none [appearance:textfield] focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none sm:text-base";

  const minDate = useMemo(() => {
    return parseISO(minDateString);
  }, [minDateString]);

  const selectedDate = useMemo(() => {
    if (!form.dateNeeded) return undefined;
    try {
      return parseISO(form.dateNeeded);
    } catch {
      return undefined;
    }
  }, [form.dateNeeded]);

  const dateButtonLabel = useMemo(() => {
    if (!selectedDate) return "Pick a date…";
    return format(selectedDate, "EEE, MMM d, yyyy");
  }, [selectedDate]);

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <p className="site-body">
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
          <div className="relative">
            <button
              type="button"
              className={cx(
                inputBase,
                "flex items-center justify-between gap-3 text-left",
                "py-3"
              )}
              aria-haspopup="dialog"
              aria-expanded={dateOpen}
              onClick={() => setDateOpen((v) => !v)}
            >
              <span className={form.dateNeeded ? "text-text" : "text-text/50"}>
                {dateButtonLabel}
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-text/70"
                aria-hidden="true"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
              </svg>
            </button>

            {dateOpen ? (
              <div
                role="dialog"
                aria-label="Choose a date"
                className="absolute z-20 mt-2 w-full overflow-hidden rounded-3xl border border-black/10 bg-background p-3 shadow-lg"
              >
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={(d) => {
                    if (!d) return;
                    const iso = format(d, "yyyy-MM-dd");
                    if (iso < minDateString) return;
                    update("dateNeeded", iso);
                    setDateOpen(false);
                  }}
                  disabled={{ before: minDate }}
                />
                <p className="mt-2 text-xs leading-5 text-text/60">
                  Earliest available date:{" "}
                  <span className="font-semibold text-text">
                    {format(minDate, "MMM d, yyyy")}
                  </span>
                </p>
              </div>
            ) : null}
          </div>
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

      <div className="space-y-2">
        <FieldLabel htmlFor="paymentMethod">Payment method *</FieldLabel>
        <select
          id="paymentMethod"
          name="paymentMethod"
          required
          value={form.paymentMethod}
          onChange={(e) =>
            update("paymentMethod", e.target.value as PaymentMethod)
          }
          className={inputBase}
        >
          {PAYMENT_METHODS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <p className="text-xs leading-5 text-text/60">
          Cash is preferred, but we can also do Zelle, Cash App, or Venmo.
        </p>
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
          "inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:text-base",
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
