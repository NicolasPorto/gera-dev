import { useState } from "react";
import { useTheme } from "../components/UseTheme"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as prismStyles from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTranslation } from 'react-i18next';
import { classToJson, jsonToCSharpTop } from "../utils/jsonClassConverter";

export default function JsonClassConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);
  const [outputOn, setOutputOn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState("auto");
  const { t } = useTranslation();

  const theme = useTheme();

  function process() {
    try {
      let detectedMode = mode;

      if (mode === "auto") {
        detectedMode = detectAutoMode(input);
      }

      if (detectedMode === "json-to-csharp") {
        const parsed = JSON.parse(input);
        const classCode = jsonToCSharpTop(parsed, "Root");
        setOutput(classCode);
      } else {
        const json = classToJson(input);
        setOutput(JSON.stringify(json, null, 2));
      }
      setOutputOn(true);
      setError(false);
    } catch (e) {
      console.log(e);
      setError(true);
      setOutputOn(false);
      setOutput("");
    }
  }

  function detectAutoMode(text) {
    const trimmed = text.trim();
    if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
      return "json-to-csharp";
    }
    if (trimmed.includes("class") && trimmed.includes("{")) {
      return "csharp-to-json";
    }
    return "json-to-csharp";
  }

  function handleInputChange(e) {
    const value = e.target.value;
    setInput(value);

    if (!outputOn && value.trim().length > 0) {
      detectAutoMode(value);
      setMode("auto");
    }

    setError(false);
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

  function setManualMode(newMode) {
    setMode(newMode);
    setOutputOn(false);
    setOutput("");
    setError(false);
  }

  const getSyntaxStyle = () => {
    return theme === 'white' ? prismStyles.coldarkLight : prismStyles.coldarkDark;
  };

  const isButtonDisabled = input.trim() === "";
  const modeDetected = detectAutoMode(input);
  const displayMode = mode === "auto" ? modeDetected : mode;

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full max-w-3xl mx-auto">
      <div className="w-full flex flex-col items-center gap-6">
        <div className="flex flex-col sm:flex-row items-center justify-center w-full mb-1 gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setManualMode("json-to-csharp")}
              className={`px-3 py-1 rounded-lg font-medium ${mode === "json-to-csharp" ? "default-button" : "default-button-transparent border border-purple-600"}`}
            >
              JSON → C#
            </button>
            <button
              onClick={() => setManualMode("csharp-to-json")}
              className={`px-3 py-1 rounded-lg font-medium ${mode === "csharp-to-json" ? "default-button" : "default-button-transparent border border-purple-600"}`}
            >
              C# → JSON
            </button>
            <button
              onClick={() => setManualMode("auto")}
              className={`px-3 py-1 rounded-lg font-medium ${mode === "auto" ? "default-button" : "default-button-transparent border border-purple-600"}`}
            >
              Auto
            </button>
          </div>
        </div>

        <div className="info-card w-full">
          <p className="info-text">
            💡 {displayMode === "json-to-csharp"
              ? t("InfoJsonToCsharp")
              : t("InfoCsharpToJson")
            }
          </p>
        </div>

        {!outputOn && (
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder={displayMode === "json-to-csharp" ? '{ "name": "John", "age": 30 }' : "public class Root { public string Name { get; set; } }"}
            className={`w-full p-4 border-2 rounded-lg font-mono text-sm focus:outline-none resize-none transition-all duration-300 ease-in-out h-100 textarea-text-color custom-scrollbar textarea-white-theme ${error
              ? "border-red-500 bg-purple-200/10 focus:border-red-600"
              : "border-gray-300/20 bg-purple-200/10 focus:border-purple-400"
              }`}
            rows={12}
          />
        )}

        {outputOn && (
          <div className="w-full border-2 rounded-lg border-gray-300/20 bg-purple-200/10 font-mono text-sm overflow-y-auto resize-none whitespace-pre-wrap break-all custom-scrollbar textarea-white-theme h-100">
            <SyntaxHighlighter
              language={displayMode === "json-to-csharp" ? "csharp" : "json"}
              style={getSyntaxStyle()}
              customStyle={{
                background: 'transparent',
                padding: '0.6rem',
                margin: 0,
                fontSize: '0.775rem'
              }}
              codeTagProps={{
                style: { fontFamily: 'monospace' }
              }}
            >
              {output}
            </SyntaxHighlighter>
          </div>
        )}

        <div className="p-4 flex flex-col items-center gap-6">
          <div className="flex gap-4 flex-wrap justify-center">
            {!outputOn && (
              <div className="relative group">
                <button
                  onClick={process}
                  disabled={isButtonDisabled}
                  className={`px-8 py-3 rounded-lg font-medium default-button ${isButtonDisabled
                    ? "default-button-inactive opacity-50 cursor-not-allowed"
                    : "default-button-active hover:scale-105 transition-transform"
                    }`}
                >
                  {displayMode === "json-to-csharp" ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50" fill="white">
                      <path d="M25 2c-.715 0-1.43.18-2.066.539L6.09 12.004C4.8 12.727 4 14.082 4 15.535v18.93c0 1.454.8 2.81 2.09 3.532l16.844 9.465C23.57 47.82 24.285 48 25 48s1.43-.18 2.066-.539L43.91 38c1.29-.727 2.09-2.082 2.09-3.535V15.535c0-1.453-.8-2.81-2.09-3.532L27.066 2.54C26.43 2.18 25.715 2 25 2Zm0 11c3.781 0 7.277 1.754 9.543 4.738l-4.383 2.54C28.844 18.836 26.973 18 25 18c-3.86 0-7 3.14-7 7s3.14 7 7 7c1.973 0 3.844-.836 5.16-2.277l4.383 2.539C32.277 35.246 28.781 37 25 37c-6.617 0-12-5.383-12-12s5.383-12 12-12Zm10 7h2v2h2v-2h2v2h2v2h-2v2h2v2h-2v2h-2v-2h-2v2h-2v-2h-2v-2h2v-2h-2v-2h2v-2Zm2 4v2h2v-2h-2Z" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-filetype-json" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM4.151 15.29a1.2 1.2 0 0 1-.111-.449h.764a.58.58 0 0 0 .255.384q.105.073.25.114.142.041.319.041.245 0 .413-.07a.56.56 0 0 0 .255-.193.5.5 0 0 0 .084-.29.39.39 0 0 0-.152-.326q-.152-.12-.463-.193l-.618-.143a1.7 1.7 0 0 1-.539-.214 1 1 0 0 1-.352-.367 1.1 1.1 0 0 1-.123-.524q0-.366.19-.639.192-.272.528-.422.337-.15.777-.149.456 0 .779.152.326.153.5.41.18.255.2.566h-.75a.56.56 0 0 0-.12-.258.6.6 0 0 0-.246-.181.9.9 0 0 0-.37-.068q-.324 0-.512.152a.47.47 0 0 0-.185.384q0 .18.144.3a1 1 0 0 0 .404.175l.621.143q.326.075.566.211a1 1 0 0 1 .375.358q.135.222.135.56 0 .37-.188.656a1.2 1.2 0 0 1-.539.439q-.351.158-.858.158-.381 0-.665-.09a1.4 1.4 0 0 1-.478-.252 1.1 1.1 0 0 1-.29-.375m-3.104-.033a1.3 1.3 0 0 1-.082-.466h.764a.6.6 0 0 0 .074.27.5.5 0 0 0 .454.246q.285 0 .422-.164.137-.165.137-.466v-2.745h.791v2.725q0 .66-.357 1.005-.355.345-.985.345a1.6 1.6 0 0 1-.568-.094 1.15 1.15 0 0 1-.407-.266 1.1 1.1 0 0 1-.243-.39m9.091-1.585v.522q0 .384-.117.641a.86.86 0 0 1-.322.387.9.9 0 0 1-.47.126.9.9 0 0 1-.47-.126.87.87 0 0 1-.32-.387 1.55 1.55 0 0 1-.117-.641v-.522q0-.386.117-.641a.87.87 0 0 1 .32-.387.87.87 0 0 1 .47-.129q.265 0 .47.129a.86.86 0 0 1 .322.387q.117.255.117.641m.803.519v-.513q0-.565-.205-.973a1.46 1.46 0 0 0-.59-.63q-.38-.22-.916-.22-.534 0-.92.22a1.44 1.44 0 0 0-.589.628q-.205.407-.205.975v.513q0 .562.205.973.205.407.589.626.386.217.92.217.536 0 .917-.217.384-.22.589-.626.204-.41.205-.973m1.29-.935v2.675h-.746v-3.999h.662l1.752 2.66h.032v-2.66h.75v4h-.656l-1.761-2.676z" />
                    </svg>
                  }
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                  {displayMode === "json-to-csharp" ? t("JsonParaCsharp") : t("CsharpParaJson")}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            )}

            {outputOn && (
              <>
                <div className="relative group">
                  <button
                    onClick={() => {
                      handleCopy();
                    }}
                    disabled={isButtonDisabled}
                    className={`px-8 py-3 rounded-lg font-medium default-button ${isButtonDisabled
                      ? "default-button-inactive opacity-50 cursor-not-allowed"
                      : "default-button-active hover:scale-105 transition-transform"
                      }`}
                  >
                    {copied ? (
                      <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M7 9v6a4 4 0 0 0 4 4h4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1v2Z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M13 3.054V7H9.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 13 3.054ZM15 3v4a2 2 0 0 1-2 2H9v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3Z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>

                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {copied ? t("Copiado") : t("Copiar")}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>

                <div className="relative group">
                  <button
                    onClick={() => {
                      setOutputOn(false);
                    }}
                    className="px-8 py-3 rounded-lg font-medium default-button default-button-active hover:scale-105 transition-transform"
                  >
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.020.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {t("Editar")}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>

                <div className="relative group">
                  <button
                    onClick={handleNew}
                    className="px-8 py-3 rounded-lg font-medium default-button default-button-active hover:scale-105 transition-transform"
                  >
                    <i className="fa-solid fa-eraser fa-lg"></i>
                  </button>

                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {t("Limpar")}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
