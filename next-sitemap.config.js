// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://safebeam-03.vercel.app",
  generateRobotsTxt: true, // (optional)
  exclude: ["/og-image", "/sitemap-images"],
  // ...other options
};
