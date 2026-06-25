import { useTranslation } from "react-i18next";
import { useLocale } from "../hooks/useLocale";
import { TOOL_CONTENT } from "../config/toolContent";

export function ToolAbout({ toolId }) {
  const { t, i18n } = useTranslation();
  const { locale } = useLocale();

  const content = TOOL_CONTENT[toolId]?.[locale];
  const fallbackKey = `About_${toolId}`;

  // Sem conteúdo rico nem "Sobre" antigo -> não renderiza nada.
  if (!content && !i18n.exists(fallbackKey)) return null;

  return (
    <section className="w-full max-w-2xl mt-12 pt-6 border-t border-white/10 text-default">
      <h2 className="text-base font-semibold mb-2 opacity-90">
        {t("SobreFerramenta")}
      </h2>

      {content ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            {content.intro.map((p, i) => (
              <p key={i} className="text-sm opacity-70 leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {content.howTo?.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2 opacity-90">
                {t("ComoUsar")}
              </h3>
              <ol className="list-decimal list-inside flex flex-col gap-1 text-sm opacity-70 leading-relaxed">
                {content.howTo.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          )}

          {content.faq?.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2 opacity-90">
                {t("PerguntasFrequentes")}
              </h3>
              <div className="flex flex-col gap-3">
                {content.faq.map(({ q, a }, i) => (
                  <div key={i}>
                    <h4 className="text-sm font-medium opacity-90">{q}</h4>
                    <p className="text-sm opacity-70 leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-sm opacity-70 leading-relaxed">{t(fallbackKey)}</p>
      )}
    </section>
  );
}
