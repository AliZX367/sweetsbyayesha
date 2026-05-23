/** Canonical production origin — used for metadata, sitemap, and JSON-LD. */
export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://sweetsbyayesha.com");

export const SITE_NAME = "The Sweets by Ayesha" as const;

export const TWITTER_SITE = "@thesweetsbyayesha" as const;

export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image" as const;
