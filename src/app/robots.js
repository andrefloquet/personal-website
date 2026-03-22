export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://andrefloquet.com/sitemap.xml",
    host: "https://andrefloquet.com",
  };
}
