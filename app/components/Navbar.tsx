"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Our Treats" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
] as const;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function CloseIconPaths() {
  return (
    <>
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </>
  );
}

function MenuIconPaths() {
  return (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const activeHref = useMemo(() => {
    if (!pathname) return "/";
    if (pathname.startsWith("/menu")) return "/menu";
    if (pathname.startsWith("/about")) return "/about";
    if (pathname.startsWith("/faq")) return "/faq";
    if (pathname.startsWith("/order")) return "/order";
    return "/";
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-background/80 backdrop-blur">
      <div className="site-container flex items-center justify-between gap-4 py-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link href="/" className="inline-flex min-w-0 items-center gap-3">
            <Image
              src="/brand-logo.png"
              alt="The Sweets by Ayesha"
              width={64}
              height={64}
              className="h-14 w-14 shrink-0 rounded-full object-cover sm:h-16 sm:w-16"
              priority
            />
            <span className="font-serif text-lg tracking-tight text-text">
              The Sweets by Ayesha
            </span>
          </Link>
          <span className="hidden shrink-0 rounded-full bg-surface px-2 py-1 text-xs font-medium text-text/80 sm:inline">
            Made with halal ingredients
          </span>
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cx(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                activeHref === l.href
                  ? "bg-surface text-text"
                  : "text-text/80 hover:bg-surface hover:text-text"
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/order"
            className="ml-1 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-background shadow-sm transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Order Now
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-black/10 bg-surface p-2 text-text shadow-sm transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {open ? <CloseIconPaths /> : <MenuIconPaths />}
          </svg>
        </button>
      </div>

      <div
        className={cx(
          "fixed inset-0 z-40 flex flex-col bg-background transition-all duration-300 ease-in-out md:hidden",
          open
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none translate-x-4 opacity-0"
        )}
        aria-hidden={!open || undefined}
        inert={!open || undefined}
      >
        <div className="flex items-center justify-between border-b border-black/5 px-4 py-4">
          <Link href="/" className="inline-flex min-w-0 items-center gap-3">
            <Image
              src="/brand-logo.png"
              alt="The Sweets by Ayesha"
              width={64}
              height={64}
              className="h-14 w-14 shrink-0 rounded-full object-cover"
            />
            <span className="font-serif text-lg tracking-tight text-text">
              The Sweets by Ayesha
            </span>
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-surface p-2 text-text shadow-sm transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <CloseIconPaths />
            </svg>
          </button>
        </div>

        <nav
          className="flex flex-1 flex-col justify-center px-4 sm:px-6"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cx(
                  "w-full rounded-2xl px-4 py-4 text-center text-lg font-semibold transition",
                  activeHref === l.href
                    ? "bg-surface text-text"
                    : "text-text/80 hover:bg-surface hover:text-text"
                )}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/order"
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-primary px-4 py-4 text-base font-semibold text-background shadow-sm transition hover:brightness-95"
            >
              Order Now
            </Link>
          </div>
        </nav>

        <div className="border-t border-black/5 px-6 py-6 text-center text-xs text-text/50">
          The Sweets by Ayesha · Schaumburg, IL
        </div>
      </div>
    </header>
  );
}
