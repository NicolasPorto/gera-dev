import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Copy } from "lucide-react";
import { IconButton } from "../components/IconButton";
import { useCopy } from "../hooks/useCopy";
import { normalizeHex, hexToRgb, rgbToHsl } from "../utils/color";

export default function ColorConverter() {
  const { t } = useTranslation();
  const { copy } = useCopy();
  const [input, setInput] = useState("#6a0dad");

  const hex = useMemo(() => normalizeHex(input), [input]);
  const values = useMemo(() => {
    if (!hex) return null;
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb);
    return {
      hex,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    };
  }, [hex]);

  const rows = values
    ? [
        { label: "HEX", value: values.hex },
        { label: "RGB", value: values.rgb },
        { label: "HSL", value: values.hsl },
      ]
    : [];

  return (
    <div className="p-4 w-full max-w-xl flex flex-col items-center gap-6">
      <div className="info-card">
        <p className="info-text">🎨 {t("InfoCor")}</p>
      </div>

      <div className="w-full flex items-center gap-3">
        <input
          type="color"
          value={hex || "#000000"}
          onChange={(e) => setInput(e.target.value)}
          aria-label={t("InfoCor")}
          className="w-12 h-12 rounded-lg border border-gray-300/20 bg-transparent cursor-pointer shrink-0"
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="#6a0dad"
          className={`flex-1 p-3 rounded-lg font-mono textarea-text-color textarea-white-theme bg-purple-200/10 border text-default focus:outline-none ${
            hex ? "border-gray-300/20 focus:border-purple-400" : "border-red-500"
          }`}
        />
      </div>

      {values ? (
        <div className="w-full flex flex-col gap-2">
          <div
            className="w-full h-20 rounded-lg border border-gray-300/20"
            style={{ backgroundColor: values.hex }}
          />
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
        <p className="text-default opacity-60">{t("CorInvalida")}</p>
      )}
    </div>
  );
}
