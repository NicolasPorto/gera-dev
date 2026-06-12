import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { SITE_URL } from "../config/seoRoutes";
import { TOOLS_BY_PATH } from "../config/tools";

const SITE_NAME = "GeraDev";

export function Seo() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  const isHome = pathname === "/";
  const tool = TOOLS_BY_PATH[pathname];

  const lang = i18n.language?.startsWith("en") ? "en" : "pt";

  const title = isHome
    ? `${SITE_NAME} — ${t("HomeTitulo")}`
    : tool
      ? `${t(tool.labelKey)} | ${SITE_NAME}`
      : SITE_NAME;

  const description = isHome
    ? t("SeoHomeDescription")
    : tool
      ? t(tool.descKey)
      : t("Sobre");

  const canonical = `${SITE_URL}${isHome ? "/" : pathname}`;
  const robots = isHome || tool ? "index, follow" : "noindex, follow";

  const blocks = [];

  if (isHome) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: lang,
      description,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    });
  } else if (tool) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `${t(tool.labelKey)} — ${SITE_NAME}`,
      url: canonical,
      description,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any (Web)",
      inLanguage: lang,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    });
    
    blocks.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: t(tool.labelKey),
          item: canonical,
        },
      ],
    });
  }

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={robots} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}
