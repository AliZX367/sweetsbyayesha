import Image from "next/image";
import Link from "next/link";

const SOCIAL = {
  tiktok: "https://www.tiktok.com/@thesweetsbyayesha",
  instagram: "https://www.instagram.com/thesweetsbyayesha",
} as const;

function SocialIcon({
  label,
}: {
  label: "TikTok" | "Instagram";
}) {
  if (label === "TikTok") {
    return (
      <span className="inline-flex items-center justify-center rounded-full border border-black/10 bg-background p-2 text-text">
        <span className="sr-only">{label}</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.17 8.17 0 0 0 4.78 1.52V6.82a4.85 4.85 0 0 1-1.01-.13z" />
        </svg>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center justify-center rounded-full border border-black/10 bg-background p-2 text-text">
      <span className="sr-only">{label}</span>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    </span>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Image
              src="/brand-logo.png"
              alt="The Sweets by Ayesha"
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
            <div className="font-serif text-lg text-text">The Sweets by Ayesha</div>
          </div>
          <p className="text-sm leading-6 text-text/80">
            Handcrafted with love. Made with halal ingredients.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-background px-3 py-1 text-xs font-semibold text-text">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            Made with Halal Ingredients
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold text-text">Explore</div>
          <nav className="flex flex-col gap-2 text-sm" aria-label="Footer">
            <Link className="text-text/80 hover:text-text" href="/">
              Home
            </Link>
            <Link className="text-text/80 hover:text-text" href="/menu">
              Our Treats
            </Link>
            <Link className="text-text/80 hover:text-text" href="/about">
              About
            </Link>
            <Link className="text-text/80 hover:text-text" href="/faq">
              FAQ
            </Link>
            <Link className="text-text/80 hover:text-text" href="/reviews">
              Reviews
            </Link>
            <Link className="text-text/80 hover:text-text" href="/order">
              Order Now
            </Link>
          </nav>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold text-text">Social</div>
          <div className="flex flex-col gap-2">
            <a
              href={SOCIAL.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text/80 hover:text-text"
              aria-label="TikTok (opens in a new tab)"
            >
              <SocialIcon label="TikTok" />
              <span className="font-semibold">TikTok</span>
              <span className="text-text/60">@thesweetsbyayesha</span>
            </a>
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text/80 hover:text-text"
              aria-label="Instagram (opens in a new tab)"
            >
              <SocialIcon label="Instagram" />
              <span className="font-semibold">Instagram</span>
              <span className="text-text/60">@thesweetsbyayesha</span>
            </a>
          </div>

          {/* Contact details coming soon.
          <div className="pt-2 text-sm text-text/80">
            <div className="flex flex-col gap-1">
              <div>
                <span className="font-semibold text-text">Email:</span>{" "}
                <span className="text-text/60"></span>
              </div>
              <div>
                <span className="font-semibold text-text">Phone:</span>{" "}
                <span className="text-text/60"></span>
              </div>
            </div>
          </div>
          */}

          <p className="text-xs text-text/60">
            © {new Date().getFullYear()} The Sweets by Ayesha. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

