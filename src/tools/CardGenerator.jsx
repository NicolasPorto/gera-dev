import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Copy, CircleCheck, CircleX } from "lucide-react";
import { IconButton } from "../components/IconButton";
import { useCopy } from "../hooks/useCopy";
import {
  BRANDS,
  generateCard,
  formatCardNumber,
  luhnValid,
  detectBrand,
} from "../utils/card";

const inputCls =
  "p-2 rounded-lg textarea-text-color textarea-white-theme bg-purple-200/10 border border-gray-300/20 text-default focus:outline-none focus:border-purple-400";

const makeBatch = (brand, count) =>
  Array.from({ length: count }, () => generateCard(brand));

export default function CardGenerator() {
  const { t } = useTranslation();
  const { copy } = useCopy();
  const [brand, setBrand] = useState("visa");
  const [count, setCount] = useState(5);
  const [formatted, setFormatted] = useState(true);
  const [cards, setCards] = useState(() => makeBatch("visa", 5));
  const [check, setCheck] = useState("");

  const run = (b = brand, c = count) => setCards(makeBatch(b, c));
  const show = (n) => (formatted ? formatCardNumber(n) : n);
  const asText = cards
    .map((c) => `${show(c.number)} | ${c.expiry} | ${c.cvv}`)
    .join("\n");

  const checked = useMemo(() => {
    const digits = check.replace(/\D/g, "");
    if (!digits) return null;
    return { valid: luhnValid(digits), brand: detectBrand(digits) };
  }, [check]);

  return (
    <div className="p-4 w-full max-w-3xl flex flex-col items-center gap-6">
      <div className="info-card">
        <p className="info-text">🧪 {t("InfoCartao")}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {Object.entries(BRANDS).map(([id, b]) => (
          <button
            key={id}
            onClick={() => {
              setBrand(id);
              run(id, count);
            }}
            className={`px-3 py-1 rounded-lg font-medium text-sm ${
              brand === id
                ? "default-button"
                : "default-button-transparent border border-purple-600"
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <label className="flex items-center gap-2 text-sm text-default opacity-80">
          {t("Quantidade")}
          <input
            type="number"
            min="1"
            max="50"
            value={count}
            onChange={(e) => {
              const c = Math.min(50, Math.max(1, Number(e.target.value) || 1));
              setCount(c);
              run(brand, c);
            }}
            className={`w-20 font-mono ${inputCls}`}
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-default opacity-80 cursor-pointer">
          <input
            type="checkbox"
            checked={formatted}
            onChange={(e) => setFormatted(e.target.checked)}
            className="accent-purple-600"
          />
          {t("Mascara")}
        </label>
        <IconButton label={t("Gerar")} showLabel onClick={() => run()} className="px-4 py-2 rounded-lg" />
        <IconButton label={t("CopiarTudo")} showLabel onClick={() => copy(asText, t("Copiado"))} className="px-4 py-2 rounded-lg">
          <Copy size={16} />
        </IconButton>
      </div>

      <div className="w-full overflow-x-auto custom-scrollbar">
        <table className="w-full text-sm text-default">
          <thead>
            <tr className="text-left text-xs opacity-60">
              <th className="py-2 px-3 font-medium">{t("NumeroCartao")}</th>
              <th className="py-2 px-3 font-medium">{t("Validade")}</th>
              <th className="py-2 px-3 font-medium">CVV</th>
              <th className="py-2 px-3" />
            </tr>
          </thead>
          <tbody>
            {cards.map((c, i) => (
              <tr key={i} className="border-t border-gray-300/10">
                <td className="py-2 px-3 font-mono whitespace-nowrap">{show(c.number)}</td>
                <td className="py-2 px-3 font-mono">{c.expiry}</td>
                <td className="py-2 px-3 font-mono">{c.cvv}</td>
                <td className="py-2 px-3 text-right">
                  <IconButton
                    label={t("Copiar")}
                    onClick={() => copy(c.number, t("Copiado"))}
                    className="px-2 py-1.5 rounded-lg"
                  >
                    <Copy size={14} />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="w-full flex flex-col gap-2 pt-4 border-t border-white/10">
        <h2 className="text-sm font-semibold text-default opacity-90">{t("ValidarCartao")}</h2>
        <input
          value={check}
          onChange={(e) => setCheck(e.target.value)}
          placeholder={t("CartaoPlaceholder")}
          inputMode="numeric"
          className={`w-full p-3 font-mono ${inputCls}`}
        />
        {checked && (
          <p className={`flex items-center gap-2 text-sm ${checked.valid ? "text-green-500" : "text-red-500"}`}>
            {checked.valid ? <CircleCheck size={18} /> : <CircleX size={18} />}
            {checked.valid ? t("CartaoValido") : t("CartaoInvalido")}
            <span className="text-default opacity-70">
              · {checked.brand ? BRANDS[checked.brand].name : t("BandeiraDesconhecida")}
            </span>
          </p>
        )}
      </section>
    </div>
  );
}
