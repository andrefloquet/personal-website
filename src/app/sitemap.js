const siteUrl = "https://andrefloquet.com";

const staticRoutes = [
  "",
  "/about",
  "/skills",
  "/skills/all",
  "/skills/backend",
  "/skills/frontend",
  "/skills/mobile",
  "/skills/styling-ui",
  "/skills/databases",
  "/skills/cloud-devops",
  "/skills/ai-automation",
  "/skills/network",
  "/skills/engineering",
  "/skills/tools",
  "/skills/integrations",
  "/skills/business",
  "/skills/languages",
  "/privacy-policy",
];

export default function sitemap() {
  const now = new Date();

  return staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
