import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToolPrefs } from "../hooks/useToolPrefs";

export function FavoriteButton({ toolId, size = 18, className = "" }) {
  const { isFavorite, toggleFavorite } = useToolPrefs();
  const { t } = useTranslation();
  const active = isFavorite(toolId);
  const label = active ? t("RemoverFavorito") : t("AdicionarFavorito");

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(toolId);
      }}
      className={`transition-colors ${
        active
          ? "text-yellow-400"
          : "text-default opacity-40 hover:opacity-100"
      } ${className}`}
    >
      <Star size={size} fill={active ? "currentColor" : "none"} />
    </button>
  );
}
