import { TOOL_PATHS, PAGE_PATHS } from "./toolPaths.js";

export const SITE_URL = "https://geradev.com.br";

export const SITE_IMAGE = `${SITE_URL}/og-image.png`;

/** Caminhos lógicos (PT canônico): Home + ferramentas + páginas estáticas. */
const LOGICAL_PATHS = [
  "/",
  ...Object.values(TOOL_PATHS),
  ...Object.values(PAGE_PATHS),
];

/** Rotas canônicas (PT) — usado pelo teste de integridade do registro. */
export const SEO_ROUTES = LOGICAL_PATHS.map((path) => ({
  path,
  priority: path === "/" ? 1.0 : 0.7,
  changefreq: path === "/" ? "weekly" : "monthly",
}));

/** Prefixo de idioma para um caminho lógico. */
function enPath(path) {
  return path === "/" ? "/en" : `/en${path}`;
}

/**
 * Sitemap multilíngue: cada caminho gera uma <url> em PT e outra em EN, com
 * anotações <xhtml:link hreflang> apontando para as versões alternativas.
 */
export function buildSitemapXml(lastmod = new Date().toISOString().slice(0, 10)) {
  const entries = [];

  for (const path of LOGICAL_PATHS) {
    const ptLoc = `${SITE_URL}${path}`;
    const enLoc = `${SITE_URL}${enPath(path)}`;
    const priority = (path === "/" ? 1.0 : 0.7).toFixed(1);
    const changefreq = path === "/" ? "weekly" : "monthly";

    const alternates =
      `    <xhtml:link rel="alternate" hreflang="pt-BR" href="${ptLoc}"/>\n` +
      `    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}"/>\n` +
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${ptLoc}"/>\n`;

    for (const loc of [ptLoc, enLoc]) {
      entries.push(
        `  <url>\n` +
          `    <loc>${loc}</loc>\n` +
          alternates +
          `    <lastmod>${lastmod}</lastmod>\n` +
          `    <changefreq>${changefreq}</changefreq>\n` +
          `    <priority>${priority}</priority>\n` +
          `  </url>`,
      );
    }
  }

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ` +
    `xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    `${entries.join("\n")}\n` +
    `</urlset>\n`
  );
}
