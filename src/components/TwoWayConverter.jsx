import { useState } from "react";
import { Eraser, Copy, Check, Pencil, ArrowLeftRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { IconButton } from "./IconButton";
import { ShareButton } from "./ShareButton";
import { CodeOutput } from "./CodeOutput";
import { useToolState } from "../hooks/useToolState";

export function TwoWayConverter({ toolKey, forward, backward }) {
  const { t } = useTranslation();
  const [mode, setMode] = useState(forward.id);
  const [input, setInput, getShareUrl] = useToolState(toolKey, "", {
    shareParam: "s",
  });
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);
  const [outputOn, setOutputOn] = useState(false);
  const [copied, setCopied] = useState(false);

  const active = mode === forward.id ? forward : backward;

  function switchMode(id) {
    setMode(id);
    setOutputOn(false);
    setOutput("");
    setError(false);
  }

  function convert() {
    try {
      setOutput(active.convert(input));
      setOutputOn(true);
      setError(false);
    } catch {
      setError(true);
      setOutputOn(false);
      setOutput("");
    }
  }

  function handleClear() {
    setOutputOn(false);
    setOutput("");
    setInput("");
    setError(false);
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const disabled = input.trim() === "";

  const modeBtn = (m) => (
    <button
      onClick={() => switchMode(m.id)}
      className={`px-3 py-1 rounded-lg font-medium ${
        mode === m.id
          ? "default-button"
          : "default-button-transparent border border-purple-600"
      }`}
    >
      {t(m.labelKey)}
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full max-w-3xl mx-auto">
      <div className="w-full flex flex-col items-center gap-6">
        <div className="flex gap-2">
          {modeBtn(forward)}
          {modeBtn(backward)}
        </div>

        <div className="info-card w-full">
          <p className="info-text">🔁 {t(active.infoKey)}</p>
        </div>

        {!outputOn && (
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            placeholder={active.placeholder}
            className={`custom-scrollbar w-full p-4 border-2 rounded-lg font-mono text-sm focus:outline-none resize-none transition-all duration-300 ease-in-out h-100 textarea-text-color textarea-white-theme ${
              error
                ? "border-red-500 bg-purple-200/10 focus:border-red-600"
                : "border-gray-300/20 bg-purple-200/10 focus:border-purple-400"
            }`}
            rows={12}
          ></textarea>
        )}

        {outputOn && <CodeOutput value={output} language={active.outLang} />}

        {error && !outputOn && (
          <p className="text-red-400 text-sm -mt-2">{t(active.errorKey)}</p>
        )}

        <div className="flex flex-wrap justify-center gap-4">
          {!outputOn && (
            <>
              <IconButton
                label={t("Converter")}
                onClick={convert}
                disabled={disabled}
                className={`px-8 py-3 rounded-lg font-medium ${
                  disabled
                    ? "default-button-inactive opacity-50 cursor-not-allowed"
                    : "default-button-active hover:scale-105 transition-transform"
                }`}
              >
                <ArrowLeftRight size={20} />
              </IconButton>
              {!disabled && <ShareButton getUrl={getShareUrl} />}
            </>
          )}

          {outputOn && (
            <>
              <IconButton
                label={copied ? t("Copiado") : t("Copiar")}
                onClick={handleCopy}
                className="px-8 py-3 rounded-lg font-medium default-button-active hover:scale-105 transition-transform"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </IconButton>

              <IconButton
                label={t("Editar")}
                onClick={() => setOutputOn(false)}
                className="px-8 py-3 rounded-lg font-medium default-button-active hover:scale-105 transition-transform"
              >
                <Pencil size={20} />
              </IconButton>

              <IconButton
                label={t("Limpar")}
                onClick={handleClear}
                className="px-8 py-3 rounded-lg font-medium default-button-active hover:scale-105 transition-transform"
              >
                <Eraser size={20} />
              </IconButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
