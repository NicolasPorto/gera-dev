import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Copy, Eraser } from "lucide-react";
import { IconButton } from "../components/IconButton";
import { useCopy } from "../hooks/useCopy";
import { useToolState } from "../hooks/useToolState";
import { textStats, topWords, formatDuration, TEXT_LIMITS } from "../utils/textStats";

function Stat({ label, value }) {
  return (
    <div className="p-3 rounded-lg bg-purple-200/10 border border-gray-300/20 text-center">
      <div className="text-2xl font-bold text-default tabular-nums">{value}</div>
      <div className="text-xs text-default opacity-60">{label}</div>
    </div>
  );
}

function LimitBar({ label, used, max }) {
  const pct = Math.min(100, (used / max) * 100);
  const over = used > max;
  return (
    <div>
      <div className="flex justify-between text-xs text-default mb-1">
        <span className="opacity-70">{label}</span>
        <span className={`tabular-nums ${over ? "text-red-500 font-semibold" : "opacity-70"}`}>
          {used}/{max}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-purple-200/10 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${over ? "bg-red-500" : pct > 85 ? "bg-yellow-400" : "bg-purple-500"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function TextCounter() {
  const { t, i18n } = useTranslation();
  const { copy } = useCopy();
  const [text, setText] = useToolState("text-counter");

  const stats = useMemo(() => textStats(text), [text]);
  const frequent = useMemo(() => topWords(text, 6), [text]);
  const nf = useMemo(() => new Intl.NumberFormat(i18n.language), [i18n.language]);

  const cards = [
    ["Caracteres", stats.characters],
    ["CaracteresSemEspaco", stats.charactersNoSpaces],
    ["Palavras", stats.words],
    ["Frases", stats.sentences],
    ["Paragrafos", stats.paragraphs],
    ["Linhas", stats.lines],
  ];

  return (
    <div className="p-4 w-full max-w-3xl flex flex-col gap-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {cards.map(([key, value]) => (
          <Stat key={key} label={t(key)} value={nf.format(value)} />
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("ContadorPlaceholder")}
          autoFocus
          className="w-full h-64 p-4 rounded-lg text-sm leading-relaxed resize-y textarea-text-color textarea-white-theme bg-purple-200/10 border border-gray-300/20 text-default focus:outline-none focus:border-purple-400 custom-scrollbar"
        />
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-default opacity-70">
          <span>
            {t("TempoLeitura")}: {formatDuration(stats.readingSeconds)} · {t("TempoFala")}:{" "}
            {formatDuration(stats.speakingSeconds)} · {nf.format(stats.bytes)} bytes (UTF-8)
          </span>
          <div className="flex gap-2 opacity-100">
            <IconButton label={t("Copiar")} onClick={() => copy(text, t("Copiado"))} className="px-3 py-2 rounded-lg">
              <Copy size={16} />
            </IconButton>
            <IconButton label={t("Limpar")} onClick={() => setText("")} className="px-3 py-2 rounded-lg">
              <Eraser size={16} />
            </IconButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-default opacity-90">{t("LimitesPopulares")}</h2>
          {TEXT_LIMITS.map((l) => (
            <LimitBar key={l.id} label={t(l.labelKey)} used={stats.characters} max={l.max} />
          ))}
        </section>
        <section>
          <h2 className="text-sm font-semibold text-default opacity-90 mb-3">{t("PalavrasFrequentes")}</h2>
          {frequent.length ? (
            <ul className="flex flex-wrap gap-2">
              {frequent.map(({ word, count }) => (
                <li
                  key={word}
                  className="px-2.5 py-1 rounded-full text-xs text-default bg-purple-500/20 border border-purple-400/30"
                >
                  {word} <span className="opacity-60">×{count}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-default opacity-50">—</p>
          )}
        </section>
      </div>
    </div>
  );
}
