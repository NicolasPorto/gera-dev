import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { SITE_URL } from "../config/seoRoutes";
import { TOOLS_BY_PATH } from "../config/tools";
import { PAGE_PATHS } from "../config/toolPaths";
import { useLocale, localizePath } from "../hooks/useLocale";

const SITE_NAME = "GeraDev";

// Páginas estáticas (não-ferramentas) com SEO próprio e indexável.
const STATIC_PAGES = {
  [PAGE_PATHS.privacy]: {
    titleKey: "PrivacidadeTitulo",
    descKey: "PrivacidadeDesc",
  },
};

export function Seo() {
  const { t } = useTranslation();
  const { locale, logical } = useLocale();

  const isHome = logical === "/";
  const tool = TOOLS_BY_PATH[logical];
  const staticPage = STATIC_PAGES[logical];

  const lang = locale;
  const ogLocale = locale === "en" ? "en_US" : "pt_BR";

  const title = isHome
    ? `${SITE_NAME} — ${t("HomeTitulo")}`
    : tool
      ? `${t(tool.labelKey)} | ${SITE_NAME}`
      : staticPage
        ? `${t(staticPage.titleKey)} | ${SITE_NAME}`
        : SITE_NAME;

  const description = isHome
    ? t("SeoHomeDescription")
    : tool
      ? t(tool.descKey)
      : staticPage
        ? t(staticPage.descKey)
        : t("Sobre");

  // URLs por idioma (canonical aponta para a versão do idioma atual)
  const canonical = `${SITE_URL}${localizePath(logical, locale)}`;
  const homeUrl = `${SITE_URL}${localizePath("/", locale)}`;
  const ptUrl = `${SITE_URL}${logical}`;
  const enUrl = `${SITE_URL}${localizePath(logical, "en")}`;
  const robots = isHome || tool || staticPage ? "index, follow" : "noindex, follow";

  const blocks = [];

  if (isHome) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: homeUrl,
      inLanguage: lang,
      description,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${homeUrl}?q={search_term_string}`,
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
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: homeUrl },
    });
    blocks.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: homeUrl },
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

      {/* Versões por idioma (hreflang) */}
      <link rel="alternate" hrefLang="pt-BR" href={ptUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="x-default" href={ptUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={ogLocale} />

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
