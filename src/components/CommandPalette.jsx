import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, CornerDownLeft } from "lucide-react";
import { searchTools, toolsFromIds, TOOLS } from "../config/tools";
import { useToolPrefs } from "../hooks/useToolPrefs";
import { useLocale } from "../hooks/useLocale";

export function CommandPalette({ open, setOpen }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  const previousFocus = useRef(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const { recents } = useToolPrefs();
  const { to } = useLocale();

  const results = useMemo(() => {
    if (query.trim()) return searchTools(query, t);
    const recentIds = new Set(recents);
    const recentTools = toolsFromIds(recents);
    const rest = TOOLS.filter((tool) => !recentIds.has(tool.id));
    return [...recentTools, ...rest];
  }, [query, t, recents]);

  useEffect(() => {
    if (open) {
      previousFocus.current = document.activeElement;
      setQuery("");
      setActiveIndex(0);
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => {
        cancelAnimationFrame(id);
        previousFocus.current?.focus?.();
      };
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  if (!open) return null;

  const select = (tool) => {
    if (!tool) return;
    navigate(to(tool.path));
    setOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      select(results[activeIndex]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  };

  const trapTab = (event) => {
    if (event.key !== "Tab") return;
    const focusables = dialogRef.current?.querySelectorAll(
      'button, input, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("BuscarFerramenta")}
        className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl background-default border border-white/10"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={trapTab}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <Search size={18} className="text-default opacity-60" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("BuscarPlaceholder")}
            className="flex-1 bg-transparent text-default placeholder:opacity-50 focus:outline-none"
          />
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-default">
            ESC
          </kbd>
        </div>

        <ul className="max-h-80 overflow-y-auto custom-scrollbar py-2">
          {results.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-default opacity-60">
              {t("NenhumResultado")}
            </li>
          )}
          {results.map((tool, index) => {
            const Icon = tool.icon;
            const isActive = index === activeIndex;
            return (
              <li key={tool.id}>
                <button
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => select(tool)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    isActive ? "default-button-clicked" : "text-default"
                  }`}
                >
                  <Icon size={18} className="shrink-0 opacity-80" />
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium truncate">
                      {t(tool.labelKey)}
                    </span>
                    <span className="block text-xs opacity-60 truncate">
                      {t(tool.descKey)}
                    </span>
                  </span>
                  {isActive && (
                    <CornerDownLeft size={14} className="shrink-0 opacity-70" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
