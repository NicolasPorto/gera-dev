import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { convertBases } from "../utils/numberBase";
import { useToolState } from "../hooks/useToolState";
import { ShareButton } from "../components/ShareButton";

const BASES = [
  { value: 2, label: "Bin" },
  { value: 8, label: "Oct" },
  { value: 10, label: "Dec" },
  { value: 16, label: "Hex" },
];

const OUTPUTS = [
  { key: "bin", labelKey: "Binario" },
  { key: "oct", labelKey: "Octal" },
  { key: "dec", labelKey: "Decimal" },
  { key: "hex", labelKey: "Hexadecimal" },
];

function OutputRow({ label, value }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex items-center gap-2 w-full">
      <span className="w-28 shrink-0 text-sm text-default opacity-70">{label}</span>
      <code className="flex-1 p-2.5 rounded-lg border-2 border-gray-300/20 bg-purple-200/10 font-mono text-sm text-default break-all min-h-[2.5rem]">
        {value}
      </code>
      <button
        onClick={copy}
        aria-label="Copy"
        className="p-2 rounded-lg default-button-active shrink-0"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
}

export default function NumberBaseConverter() {
  const { t } = useTranslation();
  const [input, setInput, getShareUrl] = useToolState("numbase:input", "", {
    shareParam: "s",
  });
  const [base, setBase] = useToolState("numbase:base", "10");

  const { result, error } = useMemo(() => {
    if (!input.trim()) return { result: null, error: false };
    try {
      return { result: convertBases(input, Number(base)), error: false };
    } catch {
      return { result: null, error: true };
    }
  }, [input, base]);

  return (
    <div className="flex flex-col items-center p-6 w-full max-w-2xl mx-auto gap-5">
      <div className="flex gap-2">
        {BASES.map((b) => (
          <button
            key={b.value}
            onClick={() => setBase(String(b.value))}
            className={`px-3 py-1 rounded-lg font-medium ${
              Number(base) === b.value
                ? "default-button"
                : "default-button-transparent border border-purple-600"
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-default opacity-80 mb-1">
          {t("BaseDeOrigem")} ({base})
        </label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={base === "16" ? "ff" : base === "2" ? "1010" : "255"}
          spellCheck={false}
          className={`w-full p-3 border-2 rounded-lg font-mono text-sm focus:outline-none textarea-text-color textarea-white-theme bg-purple-200/10 ${
            error ? "border-red-500" : "border-gray-300/20 focus:border-purple-400"
          }`}
        />
        {error && <p className="text-red-400 text-sm mt-1">{t("NumeroInvalido")}</p>}
      </div>

      {result && (
        <>
          <div className="w-full flex flex-col gap-2">
            {OUTPUTS.map((o) => (
              <OutputRow key={o.key} label={t(o.labelKey)} value={result[o.key]} />
            ))}
          </div>
          <ShareButton getUrl={getShareUrl} />
        </>
      )}
    </div>
  );
}
