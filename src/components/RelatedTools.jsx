import { useTranslation } from "react-i18next";
import { getRelatedTools } from "../config/tools";
import { ToolCard } from "./ToolCard";

/** Links internos no fim de cada ferramenta (navegação + SEO). */
export function RelatedTools({ tool }) {
  const { t } = useTranslation();
  const related = getRelatedTools(tool, 4);
  if (!related.length) return null;

  return (
    <nav
      aria-label={t("FerramentasRelacionadas")}
      className="w-full max-w-3xl mt-12 pt-6 border-t border-white/10"
    >
      <h2 className="text-base font-semibold text-default opacity-90 mb-3">
        {t("FerramentasRelacionadas")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {related.map((r) => (
          <ToolCard key={r.id} tool={r} favorite={false} />
        ))}
      </div>
    </nav>
  );
}
