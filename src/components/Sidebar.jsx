import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useMemo } from "react";
import { ChevronRight, Search, X } from "lucide-react";
import { CATEGORIES, getToolsByCategory, searchTools } from "../config/tools";

export function Sidebar({ open, setOpen }) {
  const location = useLocation();
  const { t } = useTranslation();
  const [query, setQuery] = useState("");

  const categories = useMemo(() => getToolsByCategory(), []);
  const activeTool = useMemo(
    () => location.pathname,
    [location.pathname],
  );

  // Mantém aberta a categoria da ferramenta ativa
  const activeCategory = useMemo(() => {
    const found = categories.find((category) =>
      category.tools.some((tool) => tool.path === activeTool),
    );
    return found?.id;
  }, [categories, activeTool]);

  const [openSections, setOpenSections] = useState(() =>
    Object.fromEntries(CATEGORIES.map((c) => [c.id, true])),
  );

  useEffect(() => {
    if (activeCategory) {
      setOpenSections((prev) => ({ ...prev, [activeCategory]: true }));
    }
  }, [activeCategory]);

  const toggleSection = (id) =>
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));

  const filtered = useMemo(
    () => (query.trim() ? searchTools(query, t) : null),
    [query, t],
  );

  const ToolLink = ({ tool }) => {
    const Icon = tool.icon;
    const isActive = location.pathname === tool.path;
    return (
      <Link
        to={tool.path}
        onClick={() => setOpen(false)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
          default-button transition-colors
          ${isActive ? "default-button-clicked underline-style" : ""}
        `}
      >
        <Icon size={16} className="shrink-0" />
        <span className="truncate">{t(tool.labelKey)}</span>
      </Link>
    );
  };

  const content = (
    <>
      <div className="relative mb-3">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-default opacity-60"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("BuscarFerramenta")}
          className="w-full pl-9 pr-3 py-2 rounded-lg text-sm textarea-white-theme bg-purple-700/30 border border-white/10 text-default placeholder:opacity-60 focus:outline-none focus:border-white/40"
        />
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-1 flex-1">
        {filtered ? (
          filtered.length > 0 ? (
            <div className="flex flex-col gap-1">
              {filtered.map((tool) => (
                <ToolLink key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-default opacity-60 px-2 py-4 text-center">
              {t("NenhumResultado")}
            </p>
          )
        ) : (
          categories.map((category) => {
            const isOpen = openSections[category.id];
            return (
              <div key={category.id}>
                <button
                  onClick={() => toggleSection(category.id)}
                  aria-expanded={isOpen}
                  className="flex justify-between items-center w-full text-left px-3 py-2 rounded-lg font-semibold text-sm text-default opacity-80 hover:opacity-100 transition"
                >
                  {t(category.labelKey)}
                  <span className={`chev ${isOpen ? "rotated" : ""}`} aria-hidden>
                    <ChevronRight size={16} />
                  </span>
                </button>
                {isOpen && (
                  <div className="flex flex-col gap-1 mt-1 pl-1">
                    {category.tools.map((tool) => (
                      <ToolLink key={tool.id} tool={tool} />
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <nav
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 shrink-0 flex flex-col
          p-4 pt-6 background-default lg:bg-transparent
          border-r border-white/5 lg:border-r-0
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
        aria-label={t("Ferramentas")}
      >
        <div className="flex items-center justify-between mb-3 lg:hidden">
          <span className="font-semibold text-default">{t("Ferramentas")}</span>
          <button
            onClick={() => setOpen(false)}
            aria-label={t("FecharMenu")}
            className="text-default"
          >
            <X size={22} />
          </button>
        </div>
        {content}
      </nav>
    </>
  );
}
