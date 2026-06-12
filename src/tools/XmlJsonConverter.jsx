import { useState } from "react";
import { Eraser, Copy, Check, Pencil, ArrowLeftRight } from "lucide-react";
import { useTheme } from "../components/UseTheme";
import { SyntaxHighlighter, coldarkLight, coldarkDark } from "../components/prism";
import { useTranslation } from "react-i18next";
import { IconButton } from "../components/IconButton";
import { xmlToJson } from "../utils/xmlToJson";
import { jsonToXml } from "../utils/jsonToXml";

const PLACEHOLDERS = {
  "xml-to-json": '<pessoa id="1">\n  <nome>Maria</nome>\n  <idade>30</idade>\n</pessoa>',
  "json-to-xml": '{\n  "pessoa": {\n    "@id": "1",\n    "nome": "Maria"\n  }\n}',
};

export default function XmlJsonConverter() {
  const [mode, setMode] = useState("xml-to-json");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);
  const [outputOn, setOutputOn] = useState(false);
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();

  const isXmlToJson = mode === "xml-to-json";
  const getSyntaxStyle = () => (theme === "white" ? coldarkLight : coldarkDark);

  function switchMode(newMode) {
    setMode(newMode);
    setOutputOn(false);
    setOutput("");
    setError(false);
  }

  function convert() {
    try {
      const result = isXmlToJson
        ? JSON.stringify(xmlToJson(input), null, 2)
        : jsonToXml(input);
      setOutput(result);
      setOutputOn(true);
      setError(false);
    } catch {
      setError(true);
      setOutputOn(false);
      setOutput("");
    }
  }

  function handleNew() {
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

  const isButtonDisabled = input.trim() === "";

  const modeBtn = (id, label) => (
    <button
      onClick={() => switchMode(id)}
      className={`px-3 py-1 rounded-lg font-medium ${
        mode === id
          ? "default-button"
          : "default-button-transparent border border-purple-600"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full max-w-3xl mx-auto">
      <div className="w-full flex flex-col items-center gap-6">
        <div className="flex gap-2">
          {modeBtn("xml-to-json", t("XmlParaJson"))}
          {modeBtn("json-to-xml", t("JsonParaXml"))}
        </div>

        <div className="info-card w-full">
          <p className="info-text">
            🔁 {t(isXmlToJson ? "InfoXmlToJson" : "InfoJsonToXml")}
          </p>
        </div>

        {!outputOn && (
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            placeholder={PLACEHOLDERS[mode]}
            className={`custom-scrollbar w-full p-4 border-2 rounded-lg font-mono text-sm focus:outline-none resize-none transition-all duration-300 ease-in-out h-100 textarea-text-color textarea-white-theme ${
              error
                ? "border-red-500 bg-purple-200/10 focus:border-red-600"
                : "border-gray-300/20 bg-purple-200/10 focus:border-purple-400"
            }`}
            rows={12}
          ></textarea>
        )}

        {outputOn && (
          <div className="w-full border-2 rounded-lg border-gray-300/20 bg-purple-200/10 font-mono text-sm overflow-y-auto resize-none whitespace-pre-wrap break-all custom-scrollbar textarea-white-theme h-100">
            <SyntaxHighlighter
              language={isXmlToJson ? "json" : "xml"}
              style={getSyntaxStyle()}
              customStyle={{
                background: "transparent",
                padding: "0.6rem",
                margin: 0,
                fontSize: "0.775rem",
                wordBreak: "break-all",
                whiteSpace: "pre-wrap",
              }}
              codeTagProps={{
                style: {
                  fontFamily: "monospace",
                  wordBreak: "break-all",
                  whiteSpace: "pre-wrap",
                },
              }}
              wrapLongLines={true}
            >
              {output}
            </SyntaxHighlighter>
          </div>
        )}

        {error && !outputOn && (
          <p className="text-red-400 text-sm -mt-2">
            {t(isXmlToJson ? "XmlInvalido" : "JsonInvalido")}
          </p>
        )}

        <div className="flex gap-4">
          {!outputOn && (
            <IconButton
              label={t("Converter")}
              onClick={convert}
              disabled={isButtonDisabled}
              className={`px-8 py-3 rounded-lg font-medium ${
                isButtonDisabled
                  ? "default-button-inactive opacity-50 cursor-not-allowed"
                  : "default-button-active hover:scale-105 transition-transform"
              }`}
            >
              <ArrowLeftRight size={20} />
            </IconButton>
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
                onClick={handleNew}
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
