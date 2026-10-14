import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CircleCheck, CircleX, Eraser } from "lucide-react";
import { IconButton } from "../components/IconButton";
import { useToolState } from "../hooks/useToolState";
import {
  validateCPF,
  validateCNPJ,
  detectDocumentType,
  formatCPF,
  formatCNPJAlfanumerico,
} from "../utils/documents";

const EXAMPLE = "123.456.789-09\n11.222.333/0001-81\n12.ABC.345/01DE-35\n111.111.111-11";

function validateLine(line) {
  const type = detectDocumentType(line);
  if (type === "cpf") {
    const r = validateCPF(line);
    return { type, ...r, formatted: r.value ? formatCPF(r.value) : line };
  }
  if (type === "cnpj") {
    const r = validateCNPJ(line);
    return { type, ...r, formatted: r.value ? formatCNPJAlfanumerico(r.value) : line };
  }
  return { type: null, valid: false, reason: "unknown", formatted: line };
}

export default function DocValidator() {
  const { t } = useTranslation();
  const [input, setInput] = useToolState("doc-validator", EXAMPLE, {
    shareParam: "d",
  });

  const results = useMemo(
    () =>
      input
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean)
        .slice(0, 500)
        .map((line) => ({ line, ...validateLine(line) })),
    [input],
  );
  const validCount = results.filter((r) => r.valid).length;

  return (
    <div className="p-4 w-full max-w-3xl flex flex-col items-center gap-6">
      <div className="info-card">
        <p className="info-text">✅ {t("InfoValidador")}</p>
      </div>

      <div className="w-full flex flex-col gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("ValidadorPlaceholder")}
          spellCheck={false}
          className="w-full h-40 p-4 rounded-lg font-mono text-sm resize-y textarea-text-color textarea-white-theme bg-purple-200/10 border border-gray-300/20 text-default focus:outline-none focus:border-purple-400 custom-scrollbar"
        />
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-default opacity-60">
            {results.length > 0 &&
              t("ResumoValidacao", {
                valid: validCount,
                invalid: results.length - validCount,
              })}
          </span>
          <IconButton
            label={t("Limpar")}
            onClick={() => setInput("")}
            className="px-3 py-2 rounded-lg"
          >
            <Eraser size={16} />
          </IconButton>
        </div>
      </div>

      {results.length > 0 && (
        <ul className="w-full flex flex-col gap-2">
          {results.map((r, i) => (
            <li
              key={i}
              className={`flex items-start gap-3 p-3 rounded-lg border ${
                r.valid
                  ? "border-green-500/40 bg-green-500/10"
                  : "border-red-500/40 bg-red-500/10"
              }`}
            >
              {r.valid ? (
                <CircleCheck size={20} className="text-green-500 shrink-0 mt-0.5" />
              ) : (
                <CircleX size={20} className="text-red-500 shrink-0 mt-0.5" />
              )}
              <div className="min-w-0 flex-1">
                <div className="font-mono text-sm text-default break-all">
                  {r.formatted}
                </div>
                <div className="text-xs text-default opacity-70">
                  {r.type === "cnpj" && r.alphanumeric
                    ? t("CNPJAlfanumerico")
                    : r.type
                      ? r.type.toUpperCase()
                      : "—"}
                  {" · "}
                  {r.valid
                    ? t("Valido")
                    : t(`DocErro_${r.reason}`, { expected: r.expected })}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
