import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { findMatches, highlightSegments } from "../utils/regexMatch";
import { useToolState } from "../hooks/useToolState";
import { ShareButton } from "../components/ShareButton";

const FLAG_LIST = [
  { f: "g", key: "FlagGlobal" },
  { f: "i", key: "FlagIgnoreCase" },
  { f: "m", key: "FlagMultiline" },
  { f: "s", key: "FlagDotall" },
];

const enc = (s) => btoa(unescape(encodeURIComponent(s)));

export default function RegexTester() {
  const { t } = useTranslation();
  const [pattern, setPattern] = useToolState("regex:pattern", "", { shareParam: "p" });
  const [flags, setFlags] = useToolState("regex:flags", "g", { shareParam: "f" });
  const [text, setText] = useToolState("regex:text", "", { shareParam: "s" });

  const { matches, error } = useMemo(
    () => findMatches(pattern, flags, text),
    [pattern, flags, text],
  );
  const segments = useMemo(() => highlightSegments(text, matches), [text, matches]);

  const toggleFlag = (f) =>
    setFlags((prev) => (prev.includes(f) ? prev.replace(f, "") : prev + f));

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    if (pattern) url.searchParams.set("p", enc(pattern));
    else url.searchParams.delete("p");
    url.searchParams.set("f", flags);
    if (text) url.searchParams.set("s", enc(text));
    else url.searchParams.delete("s");
    return url.toString();
  };

  return (
    <div className="flex flex-col items-center p-6 w-full max-w-3xl mx-auto gap-5">
      {/* Padrão + flags */}
      <div className="w-full">
        <label className="block text-sm font-medium text-default opacity-80 mb-1">
          {t("Padrao")}
        </label>
        <div className="flex items-center gap-2 w-full">
          <span className="text-default opacity-50 font-mono">/</span>
          <input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="\\d{3}-\\d{4}"
            spellCheck={false}
            className={`flex-1 p-3 border-2 rounded-lg font-mono text-sm focus:outline-none textarea-text-color textarea-white-theme bg-purple-200/10 ${
              error ? "border-red-500" : "border-gray-300/20 focus:border-purple-400"
            }`}
          />
          <span className="text-default opacity-50 font-mono">/{flags}</span>
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          {FLAG_LIST.map(({ f, key }) => (
            <label
              key={f}
              className="flex items-center gap-1.5 text-sm text-default opacity-80 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={flags.includes(f)}
                onChange={() => toggleFlag(f)}
                className="accent-purple-500"
              />
              <span className="font-mono font-semibold">{f}</span>
              <span className="opacity-60">{t(key)}</span>
            </label>
          ))}
        </div>
      </div>

      {error && <p className="text-red-400 text-sm w-full">{t("RegexInvalida")}</p>}

      {/* Texto de teste */}
      <div className="w-full">
        <label className="block text-sm font-medium text-default opacity-80 mb-1">
          {t("TextoTeste")}
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("TextoTeste")}
          spellCheck={false}
          className="custom-scrollbar w-full p-4 border-2 rounded-lg font-mono text-sm focus:outline-none resize-none border-gray-300/20 bg-purple-200/10 focus:border-purple-400 textarea-text-color textarea-white-theme h-48"
        />
      </div>

      {/* Resultado destacado */}
      {text && (
        <div className="w-full">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-default opacity-80">
              {t("Matches")}: {matches.length}
            </span>
            <ShareButton
              getUrl={getShareUrl}
              className="px-4 py-1.5 rounded-lg text-sm font-medium default-button-active"
            />
          </div>
          <div className="custom-scrollbar w-full p-4 border-2 rounded-lg border-gray-300/20 bg-purple-200/10 font-mono text-sm whitespace-pre-wrap break-all textarea-white-theme max-h-60 overflow-y-auto">
            {matches.length === 0 ? (
              <span className="opacity-50">{t("NenhumMatch")}</span>
            ) : (
              segments.map((seg, i) =>
                seg.hit ? (
                  <mark
                    key={i}
                    className="bg-orange-400/40 text-default rounded px-0.5"
                  >
                    {seg.text}
                  </mark>
                ) : (
                  <span key={i}>{seg.text}</span>
                ),
              )
            )}
          </div>
        </div>
      )}

      {/* Lista de matches com grupos */}
      {matches.length > 0 && matches.some((m) => m.groups.length > 0) && (
        <div className="w-full text-sm">
          <span className="font-medium text-default opacity-80">{t("Grupos")}</span>
          <ul className="mt-2 flex flex-col gap-1">
            {matches.map((m, i) => (
              <li key={i} className="font-mono text-default opacity-80">
                <span className="opacity-50">#{i + 1}</span> {m.value}
                {m.groups.length > 0 && (
                  <span className="opacity-60">
                    {" → "}[{m.groups.map((g) => JSON.stringify(g)).join(", ")}]
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
