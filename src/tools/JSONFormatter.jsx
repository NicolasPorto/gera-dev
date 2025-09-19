import { useState } from "react";
import { useTheme } from "../components/UseTheme"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as prismStyles from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTranslation } from 'react-i18next';

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);
  const [outputOn, setOutputOn] = useState(false);
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  function format() {
    try {
      const obj = JSON.parse(input);
      const jsonPretty = JSON.stringify(obj, null, 2);
      setOutput(jsonPretty);
      setOutputOn(true);
      setError(false);
    } catch (e) {
      setError(true);
      setOutputOn(false);
      setOutput("");
    }
  }

  function handleNew() {
    setOutputOn(false);
    setOutput("");
    setInput("");
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
    return;
  }

  const isButtonDisabled = input.trim() === "";

  const theme = useTheme();

  const getSyntaxStyle = () => {
    return theme === 'white' ? prismStyles.coldarkLight : prismStyles.coldarkDark;
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full max-w-3xl mx-auto">
      <div className="w-full flex flex-col items-center gap-6">
        {!outputOn && (
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            placeholder={"{}"}
            className={`custom-scrollbar w-full p-4 border-2 rounded-lg font-mono text-sm focus:outline-none resize-none transition-all duration-300 ease-in-out h-100 textarea-text-color textarea-white-theme ${error
              ? "border-red-500 bg-purple-200/10 focus:border-red-600"
              : "border-gray-300/20 bg-purple-200/10 focus:border-purple-400"
              }`}
            rows={12}
          ></textarea>
        )}

        {outputOn && (
          <>
            <div className="w-full border-2 rounded-lg border-gray-300/20 bg-purple-200/10 font-mono text-sm overflow-y-auto resize-none whitespace-pre-wrap break-all custom-scrollbar textarea-white-theme h-100">
              <SyntaxHighlighter
                language="json"
                style={getSyntaxStyle()}
                customStyle={{
                  background: 'transparent',
                  padding: '0.6rem',
                  margin: 0,
                  fontSize: '0.775rem',
                  wordBreak: 'break-all',
                  whiteSpace: 'pre-wrap'
                }}
                codeTagProps={{
                  style: {
                    fontFamily: 'monospace',
                    wordBreak: 'break-all',
                    whiteSpace: 'pre-wrap'
                  }
                }}
                wrapLongLines={true}
              >
                {output}
              </SyntaxHighlighter>
            </div>
          </>
        )}

        <div className="p-4 flex flex-col items-center gap-6">
          <div className="flex gap-4">
            {!outputOn && (
              <div className="relative group">
                <button
                  onClick={format}
                  disabled={isButtonDisabled}
                  className={`px-8 py-3 rounded-lg font-medium default-button ${isButtonDisabled
                    ? "default-button-inactive opacity-50 cursor-not-allowed"
                    : "default-button-active hover:scale-105 transition-transform"
                    }`}
                >
                  <i className="fa-solid fa-wrench fa-lg"></i>
                </button>

                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {t("Formatar")}
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
                    disabled={isButtonDisabled}
                    className={`px-8 py-3 rounded-lg font-medium default-button ${isButtonDisabled
                      ? "default-button-inactive opacity-50 cursor-not-allowed"
                      : "default-button-active hover:scale-105 transition-transform"
                      }`}
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
                    onClick={() => {
                      handleNew()
                    }}
                    disabled={isButtonDisabled}
                    className={`px-8 py-3 rounded-lg font-medium default-button ${isButtonDisabled
                      ? "default-button-inactive opacity-50 cursor-not-allowed"
                      : "default-button-active hover:scale-105 transition-transform"
                      }`}
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