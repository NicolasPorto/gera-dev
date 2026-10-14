import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Search, Star, Clock, Flame } from "lucide-react";
import {
  CATEGORIES,
  getToolsByCategory,
  searchTools,
  toolsFromIds,
  POPULAR_IDS,
  TOOLS,
} from "../config/tools";
import { useToolPrefs } from "../hooks/useToolPrefs";
import { ToolGrid } from "../components/ToolCard";
import { SiteFooter } from "../App";

function Section({ icon, title, tools, id }) {
  if (!tools.length) return null;
  return (
    <section id={id} className="scroll-mt-4">
      <h2 className="text-lg font-semibold text-default mb-3 flex items-center gap-2">
        {icon}
        {title}
        <span className="text-xs font-normal opacity-50">{tools.length}</span>
      </h2>
      <ToolGrid tools={tools} />
    </section>
  );
}

function Home() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") || "");
  const [category, setCategory] = useState("all");
  const { favorites, recents } = useToolPrefs();

  const categories = useMemo(() => getToolsByCategory(), []);
  const results = useMemo(() => {
    if (!query.trim()) return null;
    const found = searchTools(query, t);
    return category === "all" ? found : found.filter((tool) => tool.category === category);
  }, [query, t, category]);
  const favoriteTools = useMemo(() => toolsFromIds(favorites), [favorites]);
  const recentTools = useMemo(() => toolsFromIds(recents), [recents]);
  const popularTools = useMemo(() => toolsFromIds(POPULAR_IDS), []);
  const visibleCategories =
    category === "all" ? categories : categories.filter((c) => c.id === category);

  return (
    <div className="w-full flex flex-col items-center px-2 py-6">
      {/* Hero */}
      <div className="home-hero w-full text-center mb-8">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-default mb-4">
          {t("HomeTitulo")}
        </h1>
        <p className="text-default opacity-70 leading-relaxed max-w-2xl mx-auto">
          {t("Sobre")}
        </p>
      </div>

      {/* Busca */}
      <div className="w-full max-w-xl mb-5">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-default opacity-60"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("BuscarPlaceholder")}
            aria-label={t("BuscarPlaceholder")}
            autoFocus
            className="w-full pl-11 pr-4 py-3.5 rounded-xl textarea-white-theme bg-purple-700/20 border border-white/10 text-default placeholder:opacity-60 focus:outline-none focus:border-white/40 shadow-lg shadow-black/10"
          />
        </div>
        <p className="text-xs text-default opacity-50 mt-2 text-center">
          {TOOLS.length} {t("FerramentasDisponiveis")} ·{" "}
          <kbd className="font-mono">Ctrl K</kbd> {t("BuscaRapida")}
        </p>
      </div>

      {/* Filtro por categoria */}
      <div
        role="tablist"
        aria-label={t("Categorias")}
        className="w-full max-w-6xl flex gap-2 overflow-x-auto custom-scrollbar pb-2 mb-6 sm:flex-wrap sm:justify-center"
      >
        {[{ id: "all", labelKey: "Todas" }, ...CATEGORIES].map((c) => {
          const Icon = c.icon;
          const active = category === c.id;
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(c.id)}
              className={`chip ${active ? "chip-active" : ""}`}
            >
              {Icon && <Icon size={14} aria-hidden />}
              {t(c.labelKey)}
            </button>
          );
        })}
      </div>

      {/* Grade */}
      <div className="w-full max-w-6xl">
        {results ? (
          results.length > 0 ? (
            <ToolGrid tools={results} />
          ) : (
            <p className="text-center text-default opacity-60 py-12">
              {t("NenhumResultado")}
            </p>
          )
        ) : (
          <div className="flex flex-col gap-10">
            {category === "all" && (
              <>
                <Section
                  icon={<Star size={16} className="text-yellow-400" />}
                  title={t("Favoritos")}
                  tools={favoriteTools}
                />
                <Section
                  icon={<Clock size={16} className="text-purple-400" />}
                  title={t("Recentes")}
                  tools={recentTools}
                />
                <Section
                  icon={<Flame size={16} className="text-orange-400" />}
                  title={t("Populares")}
                  tools={popularTools}
                />
              </>
            )}
            {visibleCategories.map((c) => {
              const Icon = c.icon;
              return (
                <Section
                  key={c.id}
                  id={`cat-${c.id}`}
                  icon={<Icon size={16} className="text-purple-400" />}
                  title={t(c.labelKey)}
                  tools={c.tools}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Conteúdo descritivo (oculto durante a busca) */}
      {!results && (
        <section className="w-full max-w-3xl mt-16 pt-8 border-t border-white/10 text-default text-left">
          <h2 className="text-xl font-semibold mb-3">{t("HomeSobreTitulo")}</h2>
          <p className="text-sm opacity-70 leading-relaxed mb-3">{t("HomeSobreP1")}</p>
          <p className="text-sm opacity-70 leading-relaxed mb-3">{t("HomeSobreP2")}</p>
          <p className="text-sm opacity-70 leading-relaxed">{t("HomeSobreP3")}</p>
        </section>
      )}

      {/* Rodapé */}
      <div className="mt-12">
        <SiteFooter />
      </div>
    </div>
  );
}

export default Home;
