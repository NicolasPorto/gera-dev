import { TOOL_PATHS } from "./toolPaths.js";

export const SITE_URL = "https://geradev.com.br";

export const SITE_IMAGE = `${SITE_URL}/otter-blue.png`;

export const SEO_ROUTES = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  ...Object.values(TOOL_PATHS).map((path) => ({
    path,
    priority: 0.7,
    changefreq: "monthly",
  })),
];

export function buildSitemapXml(lastmod = new Date().toISOString().slice(0, 10)) {
  const urls = SEO_ROUTES.map(
    ({ path, priority, changefreq }) =>
      `  <url>\n` +
      `    <loc>${SITE_URL}${path}</loc>\n` +
      `    <lastmod>${lastmod}</lastmod>\n` +
      `    <changefreq>${changefreq}</changefreq>\n` +
      `    <priority>${priority.toFixed(1)}</priority>\n` +
      `  </url>`,
  ).join("\n");

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urls}\n` +
    `</urlset>\n`
  );
}
