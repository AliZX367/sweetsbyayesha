"use client";

import { track } from "@vercel/analytics";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import {
  getActiveItem,
  MENU_ITEMS,
  type MenuItem,
  ORDER_INQUIRY_CC_EMAIL,
  ORDER_INQUIRY_EMAIL,
} from "../constants";
import { useOrderHistory } from "./useOrderHistory";

const PAYMENT_METHODS = [
  "Cash (preferred)",
  "Zelle",
  "Cash App",
  "Venmo",
  "Apple Pay",
] as const;

type PaymentMethod = (typeof PAYMENT_METHODS)[number];

type LineItem = {
  selectedItem: string;
  quantity: number;
};

type OrderFormState = {
  name: string;
  email: string;
  phone: string;
  lineItems: LineItem[];
  dateNeeded: string;
  paymentMethod: PaymentMethod | "";
  specialRequests: string;
};

const initialState: OrderFormState = {
  name: "",
  email: "",
  phone: "",
  lineItems: [{ selectedItem: "", quantity: 0 }],
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

function getMinDateString(lineItems: LineItem[]): string {
  const today = new Date();
  let maxDays = 1;
  for (const li of lineItems) {
    const item = getActiveItem(li.selectedItem);
    if (!item) continue;
    const days =
      li.quantity >= item.largeBatchAt ? item.largeLeadDays : item.minLeadDays;
    if (days > maxDays) maxDays = days;
  }
  return formatYYYYMMDD(addDaysLocal(today, maxDays));
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

function isLineItemValid(li: LineItem): boolean {
  const item = getActiveItem(li.selectedItem);
  if (!item || li.selectedItem.trim().length === 0) return false;
  return li.quantity >= item.minQty && li.quantity <= item.maxQty;
}

function buildOrderMailto(payload: OrderFormState): string {
  const first = payload.lineItems[0];
  const lineCount = payload.lineItems.length;
  const subjectBase = first
    ? `Order inquiry — ${first.selectedItem} × ${first.quantity}`
    : "Order inquiry";
  const subjectSuffix =
    lineCount > 1
      ? ` (+${lineCount - 1} more item${lineCount > 2 ? "s" : ""})`
      : "";
  const subject = `${subjectBase}${subjectSuffix} — ${payload.name}`;
  const payment = payload.paymentMethod || "(not selected)";
  const notes = payload.specialRequests.trim() || "(none)";

  const orderLines = payload.lineItems
    .map((li, i) => {
      const item = getActiveItem(li.selectedItem);
      if (!item) return null;
      return `${i + 1}. ${li.selectedItem} × ${li.quantity} ${item.unit}`;
    })
    .filter((line): line is string => line !== null)
    .join("\n");

  const body = [
    "Hi Ayesha,",
    "",
    "New order inquiry — details below:",
    "────────────────────",
    "CUSTOMER:",
    "────────────────────",
    `Name:   ${payload.name}`,
    `Phone:  ${payload.phone}`,
    `Email:  ${payload.email}`,
    "",
    "────────────────────",
    "ORDER ITEMS:",
    "────────────────────",
    orderLines,
    "",
    "────────────────────",
    "DETAILS:",
    "────────────────────",
    `Pickup/delivery date:  ${payload.dateNeeded}`,
    `Payment method:        ${payment}`,
    "",
    "────────────────────",
    "NOTES:",
    "────────────────────",
    notes,
    "",
    "Thanks!",
  ].join("\n");

  return `mailto:${ORDER_INQUIRY_EMAIL},${ORDER_INQUIRY_CC_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function OrderForm() {
  const router = useRouter();
  const { addRecord } = useOrderHistory();
  const [form, setForm] = useState<OrderFormState>(initialState);
  const [dateOpen, setDateOpen] = useState(false);

  const minDateString = useMemo(
    () => getMinDateString(form.lineItems),
    [form.lineItems]
  );

  const canAddAnotherItem = useMemo(
    () => form.lineItems.every((li) => li.selectedItem.trim().length > 0),
    [form.lineItems]
  );

  const canSubmit = useMemo(() => {
    if (form.name.trim().length === 0) return false;
    if (form.email.trim().length === 0) return false;
    if (form.phone.trim().length === 0) return false;
    if (form.lineItems.length === 0) return false;
    if (!form.lineItems.every(isLineItemValid)) return false;
    const date = form.dateNeeded.trim();
    if (date.length === 0) return false;
    if (date < minDateString) return false;
    if (!form.paymentMethod) return false;
    return true;
  }, [form, minDateString]);

  function update<K extends keyof OrderFormState>(
    key: K,
    value: OrderFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSelectItem(index: number, label: string) {
    const item = getActiveItem(label);
    setForm((prev) => {
      const lineItems = prev.lineItems.map((li, i) =>
        i === index
          ? { selectedItem: label, quantity: item ? item.minQty : 0 }
          : li
      );
      const nextMin = getMinDateString(lineItems);
      return {
        ...prev,
        lineItems,
        dateNeeded:
          prev.dateNeeded && prev.dateNeeded < nextMin ? "" : prev.dateNeeded,
      };
    });
  }

  function onQuantityChange(index: number, raw: number) {
    setForm((prev) => {
      const li = prev.lineItems[index];
      const item = getActiveItem(li.selectedItem);
      if (!item) return prev;
      const quantity = clampQuantity(raw, item);
      const lineItems = prev.lineItems.map((line, i) =>
        i === index ? { ...line, quantity } : line
      );
      const nextMin = getMinDateString(lineItems);
      return {
        ...prev,
        lineItems,
        dateNeeded:
          prev.dateNeeded && prev.dateNeeded < nextMin ? "" : prev.dateNeeded,
      };
    });
  }

  function removeLineItem(index: number) {
    setForm((prev) => {
      const lineItems = prev.lineItems.filter((_, i) => i !== index);
      const nextMin = getMinDateString(lineItems);
      return {
        ...prev,
        lineItems,
        dateNeeded:
          prev.dateNeeded && prev.dateNeeded < nextMin ? "" : prev.dateNeeded,
      };
    });
  }

  function addLineItem() {
    setForm((prev) => ({
      ...prev,
      lineItems: [...prev.lineItems, { selectedItem: "", quantity: 0 }],
    }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    const href = buildOrderMailto(form);

    const a = document.createElement("a");
    a.href = href;
    a.click();

    track("inquiry_sent", {
      item: form.lineItems[0]?.selectedItem ?? "",
      quantity: form.lineItems[0]?.quantity ?? 0,
      lineItemCount: form.lineItems.length,
    });

    const params = new URLSearchParams({
      name: form.name.trim(),
      date: form.dateNeeded.trim(),
    });
    for (const li of form.lineItems) {
      params.append("item", li.selectedItem);
      params.append("qty", String(li.quantity));
    }

    addRecord({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      lineItems: form.lineItems.map((li) => ({
        selectedItem: li.selectedItem.trim(),
        quantity: li.quantity,
      })),
      dateNeeded: form.dateNeeded.trim(),
      paymentMethod: form.paymentMethod,
      specialRequests: form.specialRequests.trim(),
    });

    window.setTimeout(() => {
      router.push(`/order/confirmation?${params.toString()}`);
    }, 600);
  }

  const stepperBtn =
    "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-background text-base font-semibold text-text transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40";

  const numberInputClass =
    "w-16 shrink-0 rounded-2xl border border-black/10 bg-background px-2 py-3 text-center text-sm font-semibold text-text shadow-sm outline-none [appearance:textfield] focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface sm:w-24 sm:text-base [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

  const minDate = useMemo(() => {
    return parseISO(minDateString);
  }, [minDateString]);

  const dateButtonLabel = useMemo(() => {
    if (!form.dateNeeded) return "Pick a date…";
    try {
      return format(parseISO(form.dateNeeded), "EEE, MMM d, yyyy");
    } catch {
      return "Pick a date…";
    }
  }, [form.dateNeeded]);

  const selectedDate = useMemo(() => {
    if (!form.dateNeeded) return undefined;
    try {
      return parseISO(form.dateNeeded);
    } catch {
      return undefined;
    }
  }, [form.dateNeeded]);

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <p className="site-body">
        Fill this out, then hit{" "}
        <strong className="text-text">Continue to email</strong> — your mail app
        opens with everything pre-filled so you can review and send when
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
              id="dateNeeded"
              type="button"
              onClick={() => setDateOpen((v) => !v)}
              aria-haspopup="dialog"
              aria-expanded={dateOpen}
              aria-describedby="dateNeeded-hint"
              className={cx(
                inputBase,
                "flex items-center justify-between gap-3 text-left",
                !form.dateNeeded && "text-text/40"
              )}
            >
              <span>{dateButtonLabel}</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-text/50"
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
                className="absolute z-20 mt-2 w-full overflow-hidden rounded-3xl border border-black/10 bg-background p-4 shadow-lg"
              >
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  disabled={{ before: minDate }}
                  defaultMonth={minDate}
                  onSelect={(d) => {
                    if (!d) return;
                    const iso = format(d, "yyyy-MM-dd");
                    if (iso < minDateString) return;
                    update("dateNeeded", iso);
                    setDateOpen(false);
                  }}
                  classNames={{
                    root: "w-full",
                    months: "w-full",
                    month: "w-full",
                    month_caption:
                      "flex items-center justify-between px-1 pb-3",
                    caption_label:
                      "font-serif text-base font-semibold text-text",
                    nav: "flex items-center gap-1",
                    button_previous: cx(
                      "inline-flex h-8 w-8 items-center justify-center rounded-full",
                      "border border-black/10 bg-surface text-text transition hover:brightness-95"
                    ),
                    button_next: cx(
                      "inline-flex h-8 w-8 items-center justify-center rounded-full",
                      "border border-black/10 bg-surface text-text transition hover:brightness-95"
                    ),
                    month_grid: "w-full border-collapse",
                    weekdays: "flex",
                    weekday:
                      "flex-1 pb-2 text-center text-xs font-semibold text-text/40",
                    weeks: "space-y-1",
                    week: "flex",
                    day: "flex-1 flex justify-center",
                    day_button: cx(
                      "h-9 w-9 rounded-full text-sm transition",
                      "hover:bg-surface focus:outline-none focus-visible:ring-2",
                      "focus-visible:ring-accent"
                    ),
                    selected: "bg-primary! text-background! font-semibold",
                    today: "font-bold text-primary",
                    disabled:
                      "opacity-25 cursor-not-allowed pointer-events-none",
                    outside: "opacity-20",
                    hidden: "invisible",
                  }}
                />
                <p className="mt-2 border-t border-black/5 pt-2 text-xs text-text/60">
                  Earliest available:{" "}
                  <span className="font-semibold text-text">
                    {format(minDate, "EEE, MMM d, yyyy")}
                  </span>
                </p>
              </div>
            ) : null}
          </div>
          <p
            id="dateNeeded-hint"
            className="text-xs leading-5 text-text/60"
          >
            Earliest available:{" "}
            <span className="font-semibold text-text">
              {format(minDate, "EEE, MMM d, yyyy")}
            </span>
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <FieldLabel htmlFor="menuItem-0">What would you like to order? *</FieldLabel>

        {form.lineItems.map((lineItem, index) => {
          const activeItem = getActiveItem(lineItem.selectedItem);
          const selectId = `menuItem-${index}`;
          const quantityId = `quantity-${index}`;

          return (
            <div
              key={index}
              className="relative rounded-2xl border border-black/10 bg-surface p-4"
            >
              {form.lineItems.length > 1 ? (
                <button
                  type="button"
                  className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-background text-text transition hover:brightness-95"
                  aria-label="Remove item"
                  onClick={() => removeLineItem(index)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 6h18" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                  </svg>
                </button>
              ) : null}

              <div className={cx("space-y-2", form.lineItems.length > 1 && "pr-12")}>
                <label
                  htmlFor={selectId}
                  className="text-xs font-semibold text-text/70 uppercase tracking-wide"
                >
                  Item {index + 1}
                </label>
                <select
                  id={selectId}
                  name={selectId}
                  required
                  value={lineItem.selectedItem}
                  onChange={(e) => onSelectItem(index, e.target.value)}
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

              {lineItem.selectedItem && activeItem ? (
                <div className="mt-4 space-y-3">
                  <FieldLabel htmlFor={quantityId}>
                    Quantity * (min {activeItem.minQty}, max {activeItem.maxQty}{" "}
                    {activeItem.unit})
                  </FieldLabel>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className={stepperBtn}
                      disabled={lineItem.quantity <= activeItem.minQty}
                      aria-label={`Decrease quantity for item ${index + 1}`}
                      onClick={() =>
                        onQuantityChange(
                          index,
                          lineItem.quantity - activeItem.qtyStep
                        )
                      }
                    >
                      −
                    </button>
                    <input
                      type="range"
                      min={activeItem.minQty}
                      max={activeItem.maxQty}
                      step={activeItem.qtyStep}
                      value={lineItem.quantity}
                      onChange={(e) =>
                        onQuantityChange(index, Number.parseInt(e.target.value, 10))
                      }
                      className="h-3 min-h-11 w-full flex-1 cursor-pointer accent-primary"
                      aria-label={`Quantity slider for item ${index + 1}`}
                    />
                    <input
                      id={quantityId}
                      name={quantityId}
                      type="number"
                      min={activeItem.minQty}
                      max={activeItem.maxQty}
                      step={activeItem.qtyStep}
                      value={lineItem.quantity}
                      onChange={(e) =>
                        onQuantityChange(
                          index,
                          Number.parseInt(e.target.value, 10)
                        )
                      }
                      className={numberInputClass}
                    />
                    <button
                      type="button"
                      className={stepperBtn}
                      disabled={lineItem.quantity >= activeItem.maxQty}
                      aria-label={`Increase quantity for item ${index + 1}`}
                      onClick={() =>
                        onQuantityChange(
                          index,
                          lineItem.quantity + activeItem.qtyStep
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className="rounded-2xl border border-black/10 bg-background px-4 py-3 text-xs leading-5 text-text/70">
                    Once your order is confirmed by Ayesha, we need at least 24
                    hours before your pickup or delivery. She&apos;ll reply within
                    24–48 hours to confirm your date.
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}

        <button
          type="button"
          disabled={!canAddAnotherItem}
          onClick={addLineItem}
          className={cx(
            "inline-flex items-center gap-2 rounded-full border border-black/10 bg-background px-4 py-2 text-sm font-medium text-text shadow-sm transition hover:bg-surface",
            !canAddAnotherItem && "cursor-not-allowed opacity-50"
          )}
        >
          + Add another item
        </button>
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
          placeholder="Colors, theme, allergies, packaging, pickup or delivery notes..."
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
