import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import Logo from "./components/Logo";
import { ThemeToggle } from "./components/ThemeToggle";
import { LanguageToggle } from "./components/LanguageToggle";
import { CommandPalette } from "./components/CommandPalette";
import { ToolHeader } from "./components/ToolHeader";
import { ToolAbout } from "./components/ToolAbout";
import { Seo } from "./components/Seo";
import { Toaster } from "./components/Toaster";
import { ErrorBoundary } from "./components/ErrorBoundary";
import AdBanner from "./components/AdBanner";
import { useState, useEffect, useCallback, Suspense } from "react";
import { Menu, X, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TOOLS_BY_PATH } from "./config/tools";
import { useToolPrefs } from "./hooks/useToolPrefs";
import { useLocale } from "./hooks/useLocale";

function App() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { addRecent } = useToolPrefs();
  const { locale, logical, to } = useLocale();

  const isHome = logical === "/";
  const tool = TOOLS_BY_PATH[logical];
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // O idioma é determinado pela URL (/en => en).
  useEffect(() => {
    if (i18n.language !== locale) i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // Fecha o menu mobile ao trocar de rota
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (tool) addRecent(tool.id);
  }, [tool, addRecent]);

  const togglePalette = useCallback(() => setPaletteOpen((prev) => !prev), []);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        togglePalette();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePalette]);

  return (
    <div className="h-screen flex flex-col background-default">
      <Seo />

      <header className="py-4 px-4 sm:px-6 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div className="flex items-center justify-start">
          {!isHome && (
            <button
              className="text-default lg:hidden"
              aria-label={t("AbrirMenu")}
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}
        </div>

        <div className="flex justify-center">
          <Logo to={to("/")} />
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={togglePalette}
            aria-label={t("BuscarFerramenta")}
            className="header-control hidden sm:inline-flex"
          >
            <Search size={16} />
            <span className="hidden md:inline">{t("Buscar")}</span>
            <kbd className="hidden md:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/20 border border-white/20">
              Ctrl K
            </kbd>
          </button>
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </header>

      <div className="flex flex-1 min-h-0 relative">
        {!isHome && <Sidebar open={open} setOpen={setOpen} />}

        <main className="flex-1 min-w-0 overflow-y-auto custom-scrollbar">
          <div
            className={`min-h-full w-full mx-auto flex flex-col items-center p-4 ${
              isHome ? "max-w-6xl justify-start" : "max-w-4xl justify-center"
            }`}
          >
            {!isHome && <ToolHeader tool={tool} />}
            <ErrorBoundary resetKey={location.pathname}>
              <Suspense
                fallback={
                  <div className="py-20 text-default opacity-60 animate-pulse">
                    {t("Carregando")}
                  </div>
                }
              >
                <Outlet />
              </Suspense>
            </ErrorBoundary>
            {tool && <ToolAbout toolId={tool.id} />}
            {tool && <AdBanner key={location.pathname} />}
          </div>
        </main>

        {!isHome && <div className="hidden lg:block w-64 shrink-0" aria-hidden />}
      </div>

      {!isHome && <SiteFooter />}

      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
      <Toaster />
    </div>
  );
}

export function SiteFooter() {
  const { t } = useTranslation();
  return (
    <footer className="py-4 text-center">
      <div className="text-gray-400 text-footer opacity-70 hover:opacity-100 transition-opacity duration-300">
        <span className="text-[10px] sm:text-xs font-light">
          2025 © {t("DesenvolvidoPor")}
          <a
            href="https://github.com/NicolasPorto"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] sm:text-xs font-medium hover:underline mx-1 transition-all"
          >
            Nicolas Porto
          </a>
          {t("e")}
          <a
            href="https://github.com/LuisQuintino"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] sm:text-xs font-medium hover:underline mx-1 transition-all"
          >
            Luis Venturini
          </a>
        </span>
      </div>
    </footer>
  );
}

export default App;
