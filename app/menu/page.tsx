import type { Metadata } from "next";
import Link from "next/link";
import { TreatCard } from "@/app/components/TreatCard";

export const metadata: Metadata = {
  title: "Our Treats | Halal Cake Pops & More",
  description:
    "Browse our halal-certified menu: custom cake pops, rice krispie treats, mango dessert shooter cups, chocolate strawberries, and custom orders near Schaumburg, IL.",
  openGraph: {
    title: "Our Treats | The Sweets by Ayesha",
    description:
      "Browse halal-certified cake pops, rice krispie treats, mango dessert shooter cups, chocolate strawberries, and custom orders near Schaumburg, IL.",
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

const treats = [
  {
    title: "Cake Pops",
    description:
      "Classic flavors and custom designs—perfect for parties, gifts, and dessert tables.",
    imageSrc: "/images/cake-pops.jpg",
    imageAlt: "Colorful decorated cake pops on display",
  },
  {
    title: "Rice Krispie Treats",
    description:
      "Soft, gooey, and decorated with dips, drizzles, sprinkles, and theme colors.",
    imageSrc: "/images/oreo-rice-krispie-treats.jpg",
    imageAlt:
      "Square Oreo rice krispies treats with cookie chunks on a bright white surface",
  },
  {
    title: "Mango Dessert Cups",
    description:
      "Layered dessert cups that feel bright, fresh, and party-perfect.",
    imageSrc: "/images/mango-cups.jpg",
    imageAlt: "Mango drinks in glasses with fresh mango and citrus",
  },
  {
    title: "Chocolate Strawberries",
    description:
      "Chocolate-dipped strawberries for gifts, dessert tables, and events.",
    imageSrc: "/images/choc-strawberries.jpg",
    imageAlt: "Gourmet chocolate-covered strawberries with decorative toppings",
  },
  {
    title: "Custom Orders",
    description:
      "Tell us your theme, colors, and date—we’ll help you plan the perfect treats.",
    imageSrc: "/images/hero-bg.jpg",
    imageAlt: "Elegant dessert table with cake and pink floral arrangements",
  },
] as const;

export default function MenuPage() {
  return (
    <div>
      <section className="bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="font-serif text-3xl tracking-tight text-text sm:text-4xl">
            Everything is Halal Certified
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-text/80 sm:text-base">
            Browse a few favorites below. Customizations are always welcome—just
            share your theme, colors, and date.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 *:min-w-0">
          {treats.map((t) => (
            <TreatCard
              key={t.title}
              title={t.title}
              description={t.description}
              imageSrc={t.imageSrc}
              imageAlt={t.imageAlt}
            />
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-black/5 bg-surface p-6">
          <p className="text-sm leading-6 text-text/80">
            Don&apos;t see what you&apos;re looking for?{" "}
            <Link className="font-semibold text-text underline" href="/order">
              Send us a message
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

