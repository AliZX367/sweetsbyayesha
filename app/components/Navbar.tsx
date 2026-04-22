"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Our Treats" },
  { href: "/about", label: "About" },
] as const;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const activeHref = useMemo(() => {
    if (!pathname) return "/";
    if (pathname.startsWith("/menu")) return "/menu";
    if (pathname.startsWith("/about")) return "/about";
    return "/";
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link href="/" className="inline-flex min-w-0 items-center gap-3">
            <Image
              src="/brand-logo.png"
              alt="The Sweets by Ayesha"
              width={48}
              height={48}
              className="shrink-0 rounded-full object-cover"
              priority
            />
            <span className="font-serif text-lg tracking-tight text-text">
              The Sweets by Ayesha
            </span>
          </Link>
          <span className="hidden shrink-0 rounded-full bg-surface px-2 py-1 text-xs font-medium text-text/80 sm:inline">
            Halal certified
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
            {open ? (
              <>
                <path d="M18 6 6 18" />
                <path d="M6 6l12 12" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div className="border-t border-black/5 bg-background md:hidden">
          <nav
            className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cx(
                    "rounded-2xl px-4 py-3 text-sm font-semibold transition",
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
                className="mt-1 inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-background shadow-sm transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Order Now
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

