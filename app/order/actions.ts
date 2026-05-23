"use server";

import { Resend } from "resend";
import {
  getActiveItem,
  ORDER_INQUIRY_CC_EMAIL,
  ORDER_INQUIRY_EMAIL,
} from "./constants";

export type OrderPayload = {
  name: string;
  email: string;
  phone: string;
  lineItems: { selectedItem: string; quantity: number }[];
  dateNeeded: string;
  paymentMethod: string;
  specialRequests: string;
};

export type ActionResult =
  | { success: true }
  | { success: false; error: string };

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildSubject(payload: OrderPayload): string {
  const first = payload.lineItems[0];
  const lineCount = payload.lineItems.length;
  const subjectBase = first
    ? `Order inquiry — ${first.selectedItem} × ${first.quantity}`
    : "Order inquiry";
  const subjectSuffix =
    lineCount > 1
      ? ` (+${lineCount - 1} more item${lineCount > 2 ? "s" : ""})`
      : "";
  return `${subjectBase}${subjectSuffix} — ${payload.name}`;
}

function buildOrderEmailHtml(payload: OrderPayload): string {
  const name = escapeHtml(payload.name);
  const phone = escapeHtml(payload.phone);
  const email = escapeHtml(payload.email);
  const dateNeeded = escapeHtml(payload.dateNeeded);
  const paymentMethod = escapeHtml(
    payload.paymentMethod.trim() || "(not selected)"
  );
  const notes = payload.specialRequests.trim();

  const itemRows = payload.lineItems
    .map((li, index) => {
      const menuItem = getActiveItem(li.selectedItem);
      const unit = menuItem?.unit ?? "items";
      const bg = index % 2 === 0 ? "#FBF7F0" : "#fff";
      return `<tr>
          <td style="padding:6px 8px;background:${bg};border-radius:4px;font-weight:600;">${escapeHtml(li.selectedItem)}</td>
          <td style="padding:6px 8px;text-align:right;white-space:nowrap;background:${bg};">${li.quantity} ${escapeHtml(unit)}</td>
        </tr>`;
    })
    .join("");

  const notesSection = notes
    ? `<h2 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#8B4A62;margin:0 0 8px;">Notes</h2>
      <p style="font-size:14px;background:#FBF7F0;padding:12px;border-radius:6px;margin:0 0 24px;white-space:pre-wrap;">${escapeHtml(notes)}</p>`
    : "";

  return `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#2C1810;">
    <div style="background:#C4722A;color:#fff;padding:20px 24px;border-radius:8px 8px 0 0;">
      <h1 style="margin:0;font-size:20px;font-weight:700;">New Order Inquiry</h1>
      <p style="margin:4px 0 0;font-size:13px;opacity:.85;">Sweets by Ayesha</p>
    </div>
    <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;padding:24px;">
      <h2 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#8B4A62;margin:0 0 8px;">Customer</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px;">
        <tr><td style="padding:4px 0;color:#666;width:80px;">Name</td><td style="padding:4px 0;font-weight:600;">${name}</td></tr>
        <tr><td style="padding:4px 0;color:#666;">Phone</td><td style="padding:4px 0;">${phone}</td></tr>
        <tr><td style="padding:4px 0;color:#666;">Email</td><td style="padding:4px 0;">${email}</td></tr>
      </table>
      <h2 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#8B4A62;margin:0 0 8px;">Order Items</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px;">
        ${itemRows}
      </table>
      <h2 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#8B4A62;margin:0 0 8px;">Details</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px;">
        <tr><td style="padding:4px 0;color:#666;width:120px;">Pickup date</td><td style="padding:4px 0;font-weight:600;">${dateNeeded}</td></tr>
        <tr><td style="padding:4px 0;color:#666;">Payment</td><td style="padding:4px 0;">${paymentMethod}</td></tr>
      </table>
      ${notesSection}
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 16px;" />
      <p style="font-size:12px;color:#999;margin:0;">Sent via sweetsbyayesha.com order form</p>
    </div>
  </div>`;
}

export async function sendOrderInquiry(
  payload: OrderPayload
): Promise<ActionResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: "Email service is not configured. Please try again later.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Sweets by Ayesha Orders <onboarding@resend.dev>",
      to: [ORDER_INQUIRY_EMAIL],
      cc: [ORDER_INQUIRY_CC_EMAIL],
      replyTo: payload.email,
      subject: buildSubject(payload),
      html: buildOrderEmailHtml(payload),
    });

    if (error) {
      return {
        success: false,
        error: error.message || "Failed to send your request. Please try again.",
      };
    }

    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Something went wrong. Please try again.";
    return { success: false, error: message };
  }
}
