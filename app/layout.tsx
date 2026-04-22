import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { Footer } from "@/app/components/Footer";
import { Navbar } from "@/app/components/Navbar";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: "The Sweets by Ayesha",
  description: "Halal-certified homemade baked goods near Schaumburg, IL",
  url: "https://sweetsbyayesha.com",
  areaServed: {
    "@type": "City",
    name: "Schaumburg",
    addressRegion: "IL",
  },
  servesCuisine: ["Halal", "Desserts", "Baked Goods"],
  sameAs: [
    "https://www.tiktok.com/@thesweetsbyayesha",
    "https://www.instagram.com/thesweetsbyayesha",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Halal Baked Goods",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Cake Pops" } },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Product", name: "Rice Krispie Treats" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Product", name: "Mango Dessert Shooter Cups" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Product", name: "Chocolate Strawberries" },
      },
    ],
  },
} as const;

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "The Sweets by Ayesha | Halal Bakery Schaumburg IL",
    template: "%s | The Sweets by Ayesha",
  },
  description:
    "Halal-certified homemade treats near Schaumburg, IL. Cake pops, rice krispie treats, mango dessert cups & custom baked goods. Order online for pickup or local delivery.",
  keywords: [
    "halal bakery Schaumburg IL",
    "halal cake pops Chicago",
    "halal desserts Illinois",
    "custom cake pops Schaumburg",
    "rice krispie treats halal",
    "mango dessert cups Chicago",
    "home bakery Schaumburg",
    "The Sweets by Ayesha",
    "halal sweets Chicago suburbs",
    "Muslim bakery Illinois",
  ],
  metadataBase: new URL("https://sweetsbyayesha.com"),
  openGraph: {
    title: "The Sweets by Ayesha | Halal Bakery Schaumburg IL",
    description:
      "Handcrafted halal-certified treats near Schaumburg, IL: cake pops, rice krispie treats, and custom baked goods.",
    type: "website",
    siteName: "The Sweets by Ayesha",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "The Sweets by Ayesha — Halal Bakery Schaumburg IL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Sweets by Ayesha | Halal Bakery Schaumburg IL",
    description:
      "Handcrafted halal-certified treats near Schaumburg, IL. Cake pops, rice krispie treats & custom baked goods.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-text">
        <script type="application/ld+json">
          {JSON.stringify(localBusinessJsonLd)}
        </script>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
