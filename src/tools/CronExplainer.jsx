import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { cronParse } from "../utils/cronExplain";
import { useToolState } from "../hooks/useToolState";
import { ShareButton } from "../components/ShareButton";

const FIELD_LABELS = {
  minute: "CronMinuto",
  hour: "CronHora",
  dom: "CronDiaMes",
  month: "CronMes",
  dow: "CronDiaSemana",
};

export default function CronExplainer() {
  const { t } = useTranslation();
  const [input, setInput, getShareUrl] = useToolState("cron", "*/5 * * * *", {
    shareParam: "s",
  });

  const parsed = useMemo(() => cronParse(input), [input]);

  const formatPart = (p) => {
    switch (p.type) {
      case "every":
        return t("CronQualquer");
      case "step":
        return `${t("CronACada")} ${p.n}`;
      case "range":
        return `${p.a}–${p.b}`;
      case "rangeStep":
        return `${p.a}–${p.b} (${t("CronACada")} ${p.n})`;
      default:
        return String(p.v);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 w-full max-w-2xl mx-auto gap-5">
      <div className="info-card w-full">
        <p className="info-text">⏱️ {t("InfoCron")}</p>
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="*/5 * * * *"
        spellCheck={false}
        className={`w-full p-3 border-2 rounded-lg font-mono text-center text-lg focus:outline-none textarea-text-color textarea-white-theme bg-purple-200/10 ${
          parsed.valid ? "border-gray-300/20 focus:border-purple-400" : "border-red-500"
        }`}
      />

      {!parsed.valid ? (
        <p className="text-red-400 text-sm">{t("CronInvalido")}</p>
      ) : (
        <>
          <div className="w-full flex flex-col gap-2">
            {parsed.fields.map((f) => (
              <div
                key={f.name}
                className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-300/20 bg-purple-200/10"
              >
                <span className="w-32 shrink-0 text-sm font-medium text-default opacity-70">
                  {t(FIELD_LABELS[f.name])}
                </span>
                <span className="text-default text-sm">
                  {f.parts.map(formatPart).join(", ")}
                </span>
                <code className="ml-auto text-xs text-default opacity-40 font-mono">
                  {f.raw}
                </code>
              </div>
            ))}
          </div>
          <ShareButton getUrl={getShareUrl} />
        </>
      )}
    </div>
  );
}
