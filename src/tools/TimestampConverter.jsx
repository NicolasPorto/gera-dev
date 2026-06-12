import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Copy } from "lucide-react";
import { IconButton } from "../components/IconButton";
import { useCopy } from "../hooks/useCopy";

function parseEpoch(value) {
  const trimmed = String(value).trim();
  if (!trimmed) return null;
  const n = Number(trimmed);
  if (Number.isNaN(n)) return null;
  const digits = String(Math.trunc(Math.abs(n))).length;
  const ms = digits >= 13 ? n : n * 1000;
  const date = new Date(ms);
  return Number.isNaN(date.getTime()) ? null : date;
}

export default function TimestampConverter() {
  const { t } = useTranslation();
  const { copy } = useCopy();
  const [epoch, setEpoch] = useState(() =>
    String(Math.floor(Date.now() / 1000)),
  );

  const date = useMemo(() => parseEpoch(epoch), [epoch]);

  const rows = date
    ? [
        { label: "ISO 8601", value: date.toISOString() },
        { label: t("DataLocal"), value: date.toLocaleString() },
        { label: "UTC", value: date.toUTCString() },
        {
          label: t("EpochSegundos"),
          value: String(Math.floor(date.getTime() / 1000)),
        },
        { label: t("EpochMillis"), value: String(date.getTime()) },
      ]
    : [];

  return (
    <div className="p-4 w-full max-w-xl flex flex-col items-center gap-6">
      <div className="info-card">
        <p className="info-text">⏱ {t("InfoTimestamp")}</p>
      </div>

      <div className="w-full flex gap-2">
        <input
          type="text"
          inputMode="numeric"
          value={epoch}
          onChange={(e) => setEpoch(e.target.value)}
          placeholder="1700000000"
          className="flex-1 p-3 rounded-lg font-mono textarea-text-color textarea-white-theme bg-purple-200/10 border border-gray-300/20 text-default focus:outline-none focus:border-purple-400"
        />
        <IconButton
          label={t("Agora")}
          showLabel
          onClick={() => setEpoch(String(Math.floor(Date.now() / 1000)))}
          className="px-4 py-2 rounded-lg font-medium"
        />
      </div>

      {date ? (
        <div className="w-full flex flex-col gap-2">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-2 p-3 rounded-lg bg-purple-200/10 border border-gray-300/20"
            >
              <div className="min-w-0">
                <div className="text-xs text-default opacity-60">
                  {row.label}
                </div>
                <div className="font-mono text-sm text-default truncate">
                  {row.value}
                </div>
              </div>
              <IconButton
                label={t("Copiar")}
                onClick={() => copy(row.value, t("Copiado"))}
                className="px-3 py-2 rounded-lg shrink-0"
              >
                <Copy size={16} />
              </IconButton>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-default opacity-60">{t("TimestampInvalido")}</p>
      )}
    </div>
  );
}
