import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sweetsbyayesha.com";
  const now = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/order`,
      lastModified: now,
    },
  ];
}

