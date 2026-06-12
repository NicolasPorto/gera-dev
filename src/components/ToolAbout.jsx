import { useTranslation } from "react-i18next";

export function ToolAbout({ toolId }) {
  const { t, i18n } = useTranslation();
  const key = `About_${toolId}`;

  if (!i18n.exists(key)) return null;

  return (
    <section className="w-full max-w-2xl mt-12 pt-6 border-t border-white/10 text-default">
      <h2 className="text-base font-semibold mb-2 opacity-90">
        {t("SobreFerramenta")}
      </h2>
      <p className="text-sm opacity-70 leading-relaxed">{t(key)}</p>
    </section>
  );
}
