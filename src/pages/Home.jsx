import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Sparkles, Star, Clock } from "lucide-react";
import {
  getToolsByCategory,
  searchTools,
  toolsFromIds,
  TOOLS,
} from "../config/tools";
import { useToolPrefs } from "../hooks/useToolPrefs";
import { FavoriteButton } from "../components/FavoriteButton";
import { SiteFooter } from "../App";

function ToolCard({ tool }) {
  const { t } = useTranslation();
  const Icon = tool.icon;
  return (
    <Link to={tool.path} className="tool-card relative">
      <span className="tool-card-icon">
        <Icon size={20} />
      </span>
      <span className="min-w-0 pr-6">
        <span className="block font-semibold text-default truncate">
          {t(tool.labelKey)}
        </span>
        <span className="block text-xs text-default opacity-60 line-clamp-2">
          {t(tool.descKey)}
        </span>
      </span>
      <FavoriteButton
        toolId={tool.id}
        size={16}
        className="absolute top-2 right-2"
      />
    </Link>
  );
}

function ToolGrid({ tools }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}

function Section({ icon, title, tools }) {
  if (!tools.length) return null;
  return (
    <section>
      <h2 className="text-lg font-semibold text-default mb-3 flex items-center gap-2">
        {icon}
        {title}
      </h2>
      <ToolGrid tools={tools} />
    </section>
  );
}

function Home() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") || "");
  const { favorites, recents } = useToolPrefs();

  const categories = useMemo(() => getToolsByCategory(), []);
  const results = useMemo(
    () => (query.trim() ? searchTools(query, t) : null),
    [query, t],
  );
  const favoriteTools = useMemo(() => toolsFromIds(favorites), [favorites]);
  const recentTools = useMemo(() => toolsFromIds(recents), [recents]);

  return (
    <div className="w-full flex flex-col items-center px-2 py-6">
      {/* Hero */}
      <div className="text-center max-w-2xl mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-default mb-3">
          {t("HomeTitulo")}
        </h1>
        <p className="text-default opacity-70 leading-relaxed">{t("Sobre")}</p>
      </div>

      {/* Busca */}
      <div className="w-full max-w-xl mb-8">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-default opacity-60"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("BuscarPlaceholder")}
            autoFocus
            className="w-full pl-11 pr-4 py-3 rounded-xl textarea-white-theme bg-purple-700/20 border border-white/10 text-default placeholder:opacity-60 focus:outline-none focus:border-white/40"
          />
        </div>
        <p className="text-xs text-default opacity-50 mt-2 text-center">
          {TOOLS.length} {t("FerramentasDisponiveis")} ·{" "}
          <kbd className="font-mono">Ctrl K</kbd> {t("BuscaRapida")}
        </p>
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
          <div className="flex flex-col gap-8">
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
            {categories.map((category) => (
              <Section
                key={category.id}
                icon={<Sparkles size={16} className="text-purple-400" />}
                title={t(category.labelKey)}
                tools={category.tools}
              />
            ))}
          </div>
        )}
      </div>

      {/* Rodapé */}
      <div className="mt-12">
        <SiteFooter />
      </div>
    </div>
  );
}

export default Home;
