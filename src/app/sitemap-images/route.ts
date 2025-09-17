import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://safebeam03.vercel.app";
  const lastModified = new Date().toISOString();

  // Map of pages and their related images
  const urls = [
    {
      loc: `${baseUrl}/`,
      images: [
        {
          loc: `${baseUrl}/og-image.png`,
          caption: "SafeBeam - Secure file transfer homepage",
        },
      ],
    },
    {
      loc: `${baseUrl}/transfer`,
      images: [
        {
          loc: `${baseUrl}/transfer.png`,
          caption: "SafeBeam - File transfer with OTP security",
        },
      ],
    },
    {
      loc: `${baseUrl}/contact`,
      images: [
        {
          loc: `${baseUrl}/images/developer-image.png`,
          caption: "SafeBeam - Contact support and queries",
        },
      ],
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${urls
    .map(
      ({ loc, images }) => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastModified}</lastmod>
    ${images
      .map(
        (img) => `
    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:caption>${img.caption}</image:caption>
    </image:image>`
      )
      .join("")}
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
