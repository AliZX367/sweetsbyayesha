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

function toIcsDateOnly(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}${m}${day}`
}

export function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const date = firstString(searchParams.get("date") ?? undefined)
  const rawItems = searchParams.getAll("item")
  const rawQtys = searchParams.getAll("qty")
  const item = rawItems[0]
  const qty = rawQtys[0]
  const isReminder = searchParams.get("reminder") === "1"

  const dateOnly = date ? asDateOnly(date) : undefined
  if (!dateOnly) {
    return new Response("Missing or invalid ?date=YYYY-MM-DD", { status: 400 })
  }

  const summaryParts = ["Treat pickup", item ? `— ${item}` : undefined, qty ? `(${qty})` : undefined].filter(Boolean)
  const summaryPlain = summaryParts.join(" ")
  const summary = isReminder
    ? icsEscape(`Reminder: ${summaryPlain} pickup is soon!`)
    : icsEscape(summaryPlain)

  const itemLines = rawItems
    .map((it, i) => (rawQtys[i] ? `${it} × ${rawQtys[i]}` : it))
    .join("\\n")

  const description = isReminder
    ? icsEscape(
        [
          "2-DAY REMINDER — your treat pickup is coming up!",
          "",
          `Pickup date: ${date}`,
          "",
          "Order pickup reminder.",
          rawItems.length > 0 ? `Items:\\n${itemLines}` : undefined,
          "Pickup details confirmed by email.",
          "Note: A 2-day reminder has been set for this event.",
        ]
          .filter(Boolean)
          .join("\\n")
      )
    : icsEscape(
        [
          "Order pickup reminder.",
          rawItems.length > 0 ? `Items:\\n${itemLines}` : undefined,
          "Pickup details confirmed by email.",
          "Note: A 2-day reminder has been set for this event.",
        ]
          .filter(Boolean)
          .join("\\n")
      )

  const now = new Date()
  const dtstamp =
    now
      .toISOString()
      .replaceAll("-", "")
      .replaceAll(":", "")
      .replaceAll(".", "")
      .slice(0, 15) + "Z"

  const eventDate = new Date(`${date}T00:00:00`)
  if (isReminder) {
    eventDate.setDate(eventDate.getDate() - 1)
  }

  const start = toIcsDateOnly(eventDate)
  const endDate = new Date(eventDate)
  endDate.setDate(endDate.getDate() + 1)
  const end = toIcsDateOnly(endDate)

  const uid = `order-${isReminder ? "reminder-" : ""}${start}-${Math.random().toString(16).slice(2)}@sweetsbyayesha.com`

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
    "BEGIN:VALARM",
    "TRIGGER:-P2D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: Your treat pickup is in 2 days!",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n")

  const filename = isReminder
    ? `treat-reminder-${start}.ics`
    : `treat-pickup-${start}.ics`

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  })
}
