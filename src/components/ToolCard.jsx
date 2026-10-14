import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocale } from "../hooks/useLocale";
import { FavoriteButton } from "./FavoriteButton";

export function ToolCard({ tool, favorite = true }) {
  const { t } = useTranslation();
  const { to } = useLocale();
  const Icon = tool.icon;
  return (
    <Link to={to(tool.path)} className="tool-card relative">
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
      {favorite && (
        <FavoriteButton
          toolId={tool.id}
          size={16}
          className="absolute top-2 right-2"
        />
      )}
    </Link>
  );
}

export function ToolGrid({ tools, favorite }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} favorite={favorite} />
      ))}
    </div>
  );
}
