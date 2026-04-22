import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/app/components/HeroSection";
import { TreatCard } from "@/app/components/TreatCard";

export const metadata: Metadata = {
  title: { absolute: "thesweetsbyayesha" },
  description:
    "Handcrafted baked goods made with halal ingredients near Schaumburg, IL. Cake pops, rice krispie treats, mango shooter cups, and custom orders. Made fresh to order with love.",
  openGraph: {
    title: "The Sweets by Ayesha | Homemade Halal Treats",
    description:
      "Handcrafted with love. Made with halal ingredients. Local Schaumburg-area pickup and delivery options.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection
        eyebrow="Schaumburg, IL • Pickup & delivery options"
        heading="Handcrafted with love. Made with halal ingredients."
        subtext="Cake pops, rice krispie treats, and custom baked goods made to order—perfect for birthdays, weddings, school events, and sweet surprises."
        ctaLabel="Order Now"
        ctaHref="/order"
        imageSrc="/images/hero-bg.jpg"
        imageAlt="Elegant dessert table with cake and pink floral arrangements"
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl tracking-tight text-text sm:text-3xl">
              Featured treats
            </h2>
            <p className="mt-2 text-sm leading-6 text-text/80 sm:text-base">
              Choose a classic, or tell Ayesha your theme and flavor ideas—she’ll
              bring them to life.
            </p>
          </div>
          <Link
            href="/menu"
            className="hidden rounded-full border border-black/10 bg-background px-4 py-2 text-sm font-semibold text-text shadow-sm transition hover:bg-surface sm:inline-flex"
          >
            View menu
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 *:min-w-0">
          <TreatCard
            title="Cake Pops"
            description="Bite-sized cake pops dipped and decorated to match your theme—fun, clean, and always party-ready."
            imageSrc="/images/cake-pops.jpg"
            imageAlt="Colorful decorated cake pops on display"
            priority
          />
          <TreatCard
            title="Rice Krispie Treats"
            description="Soft, gooey, and custom-dipped with sprinkles, drizzle, and details that photograph beautifully."
            imageSrc="/images/oreo-rice-krispie-treats.jpg"
            imageAlt="Square Oreo rice krispies treats with cookie chunks on a bright white surface"
            priority
          />
          <TreatCard
            title="Custom Orders"
            description="From dessert tables to special requests—tell us what you’re celebrating and we’ll plan the perfect treats."
            imageSrc="/images/choc-strawberries.jpg"
            imageAlt="Gourmet chocolate-covered strawberries with decorative toppings"
            priority
          />
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-3">
              <h2 className="font-serif text-2xl tracking-tight text-text sm:text-3xl">
                Made fresh. Made with heart.
              </h2>
              <p className="text-sm leading-6 text-text/80 sm:text-base">
                Hi, I’m Ayesha—a home baker near Schaumburg, IL. Every order is
                made-to-order with care, so your treats taste as good as they
                look.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-background shadow-sm transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Meet Ayesha
              </Link>
            </div>
            <div className="rounded-3xl border border-black/5 bg-background p-6 shadow-sm">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-text">
                  Follow along
                </div>
                <p className="text-sm leading-6 text-text/80">
                  Follow along for behind-the-scenes baking, new drops, and
                  custom designs.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <a
                    href="https://www.tiktok.com/@thesweetsbyayesha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-black/10 bg-surface px-4 py-2 text-sm font-semibold text-text transition hover:brightness-95"
                    aria-label="TikTok @thesweetsbyayesha (opens in a new tab)"
                  >
                    TikTok
                  </a>
                  <a
                    href="https://www.instagram.com/thesweetsbyayesha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-black/10 bg-surface px-4 py-2 text-sm font-semibold text-text transition hover:brightness-95"
                    aria-label="Instagram @thesweetsbyayesha (opens in a new tab)"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
