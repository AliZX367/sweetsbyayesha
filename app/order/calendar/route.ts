function firstString(value: string | string[] | undefined): string | undefined {
  if (value === undefined) return undefined
  return Array.isArray(value) ? value[0] : value
}

function icsEscape(value: string): string {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll("\n", "\\n")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;")
}

function asDateOnly(dateIso: string): string | undefined {
  const isIso = /^\d{4}-\d{2}-\d{2}$/.test(dateIso)
  if (!isIso) return undefined
  return dateIso.replaceAll("-", "")
}

export function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const date = firstString(searchParams.get("date") ?? undefined)
  const item = firstString(searchParams.get("item") ?? undefined)
  const qty = firstString(searchParams.get("qty") ?? undefined)

  const dateOnly = date ? asDateOnly(date) : undefined
  if (!dateOnly) {
    return new Response("Missing or invalid ?date=YYYY-MM-DD", { status: 400 })
  }

  const summaryParts = ["Treat pickup", item ? `— ${item}` : undefined, qty ? `(${qty})` : undefined].filter(Boolean)
  const summary = icsEscape(summaryParts.join(" "))
  const description = icsEscape(
    [
      "Order pickup reminder.",
      item ? `Item: ${item}` : undefined,
      qty ? `Quantity: ${qty}` : undefined,
      "Pickup details will be confirmed by email.",
    ]
      .filter(Boolean)
      .join("\n")
  )

  const now = new Date()
  const dtstamp =
    now
      .toISOString()
      .replaceAll("-", "")
      .replaceAll(":", "")
      .replaceAll(".", "")
      .slice(0, 15) + "Z"

  // All-day event: DTEND is exclusive, so add one day.
  const start = dateOnly
  const endDate = new Date(`${date}T00:00:00`)
  endDate.setDate(endDate.getDate() + 1)
  const end = endDate.toISOString().slice(0, 10).replaceAll("-", "")

  const uid = `order-${start}-${Math.random().toString(16).slice(2)}@sweetsbyayesha.com`

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//The Sweets by Ayesha//Order Reminder//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n")

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="treat-pickup-${start}.ics"`,
      "Cache-Control": "no-store",
    },
  })
}

