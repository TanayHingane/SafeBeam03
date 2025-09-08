import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://safebeam03.vercel.app";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const, // 👈 important
      priority: 1,
    },
    {
      url: `${baseUrl}/transfer`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const, // 👈 important
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const, // 👈 important
      priority: 0.5,
    },
    {
      url: `${baseUrl}/transfer/#receive-data`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const, // 👈 important
      priority: 0.7,
    },
  ];
}
