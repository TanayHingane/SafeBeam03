import { MetadataRoute } from "next";

const hostedAt = "https://safebeam03.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // 1. Static Pages
  const staticPages = ["/", "/transfer", "/contact"];

  const staticUrls: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${hostedAt}${page}`,
    lastModified,
    changeFrequency: page === "/" ? "yearly" : "monthly",
    priority: page === "/" ? 1.0 : page === "/transfer" ? 0.8 : 0.5,
  }));

  return [...staticUrls];
}
