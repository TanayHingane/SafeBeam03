import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://safebeam03.vercel.app";
  const lastModified = new Date().toISOString();

  const urls = [
    { loc: `${baseUrl}/`, priority: "1.0", changefreq: "yearly" },
    { loc: `${baseUrl}/transfer`, priority: "0.8", changefreq: "monthly" },
    { loc: `${baseUrl}/contact`, priority: "0.5", changefreq: "monthly" },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      ({ loc, priority, changefreq }) => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
