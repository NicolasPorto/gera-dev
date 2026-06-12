import { describe, it, expect } from "vitest";
import { TOOLS, CATEGORIES } from "./tools";
import { TOOL_PATHS } from "./toolPaths";
import { SEO_ROUTES } from "./seoRoutes";
import { resources } from "../i18n";

const en = resources.en.translation;
const pt = resources.pt.translation;
const categoryIds = new Set(CATEGORIES.map((c) => c.id));

describe("registry integrity", () => {
  it("ids e paths são únicos", () => {
    const ids = TOOLS.map((t) => t.id);
    const paths = TOOLS.map((t) => t.path);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("todo path vem de TOOL_PATHS (fonte única) e não sobra nenhum", () => {
    const known = new Set(Object.values(TOOL_PATHS));
    for (const t of TOOLS) expect(known.has(t.path)).toBe(true);
    expect(Object.keys(TOOL_PATHS).length).toBe(TOOLS.length);
  });

  it("toda ferramenta tem categoria válida", () => {
    for (const t of TOOLS) expect(categoryIds.has(t.category)).toBe(true);
  });

  it("chaves i18n (label/title/desc) existem em pt e en", () => {
    for (const t of TOOLS) {
      for (const key of [t.labelKey, t.titleKey, t.descKey]) {
        expect(en[key], `EN faltando: ${key}`).toBeTruthy();
        expect(pt[key], `PT faltando: ${key}`).toBeTruthy();
      }
    }
  });

  it("sitemap cobre a Home e todas as ferramentas", () => {
    const sitemapPaths = new Set(SEO_ROUTES.map((r) => r.path));
    expect(sitemapPaths.has("/")).toBe(true);
    for (const t of TOOLS) expect(sitemapPaths.has(t.path)).toBe(true);
  });
});
