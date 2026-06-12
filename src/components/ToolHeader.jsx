import { useTranslation } from "react-i18next";
import InfoIcon from "./InfoIcon";
import { FavoriteButton } from "./FavoriteButton";

export function ToolHeader({ tool }) {
  const { t } = useTranslation();
  if (!tool) return null;

  const Icon = tool.icon;
  return (
    <header className="w-full flex flex-col items-center text-center mb-6 mt-2">
      <div className="flex items-center gap-3">
        <span className="grid place-items-center w-11 h-11 rounded-xl bg-purple-600/30 text-default shrink-0">
          <Icon size={22} />
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-default">
          {t(tool.labelKey)}
        </h1>
        <FavoriteButton toolId={tool.id} />
        {tool.disclaimer && <InfoIcon />}
      </div>
      <p className="text-default opacity-60 text-sm mt-2 max-w-md">
        {t(tool.descKey)}
      </p>
    </header>
  );
}
