import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { Footer } from "@/app/components/Footer";
import { Navbar } from "@/app/components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import {
  DEFAULT_OG_IMAGE_PATH,
  SITE_NAME,
  SITE_URL,
  TWITTER_SITE,
} from "@/lib/site-config";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  "@id": `${SITE_URL}/#bakery`,
  name: SITE_NAME,
  description:
    "Halal-certified homemade baked goods near Schaumburg, IL — cake pops, rice krispie treats, mango dessert cups, chocolate strawberries, and custom orders.",
  url: SITE_URL,
  image: `${SITE_URL}/brand-logo.png`,
  logo: `${SITE_URL}/brand-logo.png`,
  geo: {
    "@type": "GeoCoordinates",
    latitude: 42.0334,
    longitude: -88.0834,
  },
  areaServed: {
    "@type": "City",
    name: "Schaumburg",
    addressRegion: "IL",
    containedInPlace: {
      "@type": "State",
      name: "Illinois",
    },
  },
  servesCuisine: ["Halal", "Desserts", "Baked Goods"],
  sameAs: [
    "https://www.tiktok.com/@thesweetsbyayesha",
    "https://www.instagram.com/thesweetsbyayesha",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Halal baked goods",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Cake Pops" } },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Product", name: "Rice Krispie Treats" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Product", name: "Mango Dessert Cups" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Product", name: "Chocolate Strawberries" },
      },
    ],
  },
} as const;

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Halal-certified homemade treats near Schaumburg, IL — cake pops, rice krispie treats, mango dessert cups, chocolate strawberries & custom orders.",
  publisher: { "@id": `${SITE_URL}/#bakery` },
  inLanguage: "en-US",
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "thesweetsbyayesha",
    template: "%s | thesweetsbyayesha",
  },
  applicationName: SITE_NAME,
  description:
    "Halal-certified homemade treats in Schaumburg, IL: cake pops, rice krispie treats, mango dessert cups & custom orders. Pickup and local delivery options.",
  keywords: [
    "halal bakery Schaumburg",
    "halal cake pops Illinois",
    "custom cake pops Schaumburg",
    "rice krispie treats halal",
    "chocolate strawberries halal",
    "thesweetsbyayesha",
    "home bakery Chicago suburbs",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    title: `${SITE_NAME} | Halal bakery Schaumburg, IL`,
    description:
      "Handcrafted halal-certified treats near Schaumburg: cake pops, rice krispie treats, mango dessert cups, chocolate strawberries & custom orders.",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — halal treats near Schaumburg, IL`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_SITE,
    title: `${SITE_NAME} | Halal bakery Schaumburg, IL`,
    description:
      "Handcrafted halal-certified treats near Schaumburg: cake pops, rice krispie treats & custom baked goods.",
    images: [DEFAULT_OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [localBusinessJsonLd, websiteJsonLd],
          })}
        </script>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
