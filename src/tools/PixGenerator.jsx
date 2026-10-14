import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import QRCode from "qrcode";
import { Copy, Download } from "lucide-react";
import { IconButton } from "../components/IconButton";
import { useCopy } from "../hooks/useCopy";
import { useToolState } from "../hooks/useToolState";
import {
  buildPixPayload,
  normalizePixKey,
  validatePixInput,
  PIX_LIMITS,
} from "../utils/pix";

const inputCls =
  "w-full p-3 rounded-lg textarea-text-color textarea-white-theme bg-purple-200/10 border border-gray-300/20 text-default focus:outline-none focus:border-purple-400";

function Field({ label, hint, children }) {
  return (
    <label className="flex flex-col gap-1 text-left">
      <span className="text-xs font-medium text-default opacity-70">
        {label}
        {hint && <span className="opacity-60 font-normal"> · {hint}</span>}
      </span>
      {children}
    </label>
  );
}

export default function PixGenerator() {
  const { t } = useTranslation();
  const { copy } = useCopy();

  // Chave, nome e cidade ficam salvos: quem usa costuma gerar várias cobranças.
  const [key, setKey] = useToolState("pix:key");
  const [name, setName] = useToolState("pix:name");
  const [city, setCity] = useToolState("pix:city");
  const [amount, setAmount] = useState("");
  const [txid, setTxid] = useState("");
  const [description, setDescription] = useState("");
  const [qr, setQr] = useState("");

  const keyInfo = useMemo(() => normalizePixKey(key), [key]);
  const errors = useMemo(() => validatePixInput({ key, name, city }), [key, name, city]);
  const payload = useMemo(
    () =>
      errors.length
        ? ""
        : buildPixPayload({ key, name, city, amount, txid, description }),
    [errors, key, name, city, amount, txid, description],
  );

  useEffect(() => {
    let cancelled = false;
    if (!payload) {
      setQr("");
      return;
    }
    QRCode.toDataURL(payload, {
      width: 320,
      margin: 2,
      errorCorrectionLevel: "M",
      color: { dark: "#1E003E", light: "#FFFFFF" },
    })
      .then((url) => !cancelled && setQr(url))
      .catch(() => !cancelled && setQr(""));
    return () => {
      cancelled = true;
    };
  }, [payload]);

  const download = () => {
    const a = document.createElement("a");
    a.href = qr;
    a.download = "pix-qrcode.png";
    a.click();
  };

  const touched = key || name || city;

  return (
    <div className="p-4 w-full max-w-3xl flex flex-col items-center gap-6">
      <div className="info-card">
        <p className="info-text">💸 {t("InfoPix")}</p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          <Field
            label={t("PixChave")}
            hint={keyInfo.type ? t(`PixTipo_${keyInfo.type}`) : null}
          >
            <input
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder={t("PixChavePlaceholder")}
              className={inputCls}
              autoComplete="off"
            />
          </Field>
          <Field label={t("PixNome")} hint={`${name.length}/${PIX_LIMITS.name}`}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={PIX_LIMITS.name}
              className={inputCls}
            />
          </Field>
          <Field label={t("PixCidade")} hint={`${city.length}/${PIX_LIMITS.city}`}>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              maxLength={PIX_LIMITS.city}
              className={inputCls}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t("PixValor")}>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^\d.,]/g, ""))}
                inputMode="decimal"
                placeholder="0,00"
                className={inputCls}
              />
            </Field>
            <Field label={t("PixTxid")}>
              <input
                value={txid}
                onChange={(e) => setTxid(e.target.value)}
                maxLength={PIX_LIMITS.txid}
                placeholder="***"
                className={inputCls}
              />
            </Field>
          </div>
          <Field label={t("PixDescricao")}>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={PIX_LIMITS.description}
              className={inputCls}
            />
          </Field>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 p-4 rounded-xl border border-purple-400/30 bg-purple-200/5">
          {payload ? (
            <>
              {qr && (
                <div className="p-3 bg-white rounded-lg">
                  <img src={qr} alt={t("GeradorPix")} className="w-56 h-56" />
                </div>
              )}
              <div className="w-full">
                <div className="text-xs font-medium text-default opacity-70 mb-1">
                  {t("PixCopiaCola")}
                </div>
                <textarea
                  readOnly
                  value={payload}
                  onFocus={(e) => e.target.select()}
                  className="w-full h-24 p-3 rounded-lg font-mono text-xs break-all resize-none textarea-text-color textarea-white-theme bg-purple-200/10 border border-gray-300/20 text-default focus:outline-none custom-scrollbar"
                />
              </div>
              <div className="flex gap-2">
                <IconButton
                  label={t("Copiar")}
                  showLabel
                  onClick={() => copy(payload, t("Copiado"))}
                  className="px-4 py-2 rounded-lg"
                >
                  <Copy size={16} />
                </IconButton>
                <IconButton
                  label={t("Baixar")}
                  showLabel
                  onClick={download}
                  disabled={!qr}
                  className="px-4 py-2 rounded-lg"
                >
                  <Download size={16} />
                </IconButton>
              </div>
            </>
          ) : (
            <ul className="text-sm text-default opacity-70 flex flex-col gap-1 text-center">
              {(touched ? errors : ["PixPreencha"]).map((e) => (
                <li key={e}>{t(e)}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
