import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as prismStyles from 'react-syntax-highlighter/dist/esm/styles/prism';
import xmlFormat from 'xml-formatter';

function useTheme() {
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  });

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme') || 'dark';
          setTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}

export default function XmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);
  const [outputOn, setOutputOn] = useState(false);
  const [copiado, setCopiado] = useState(false);

  function formatarXml() {
    try {
      const xmlFormatado = xmlFormat(input);
      setOutput(xmlFormatado);
      setOutputOn(true);
      setError(false);
    } catch (e) {
      setError(true);
      setOutputOn(false);
      setOutput("");
    }
  }

  function minificarXml() {
    try {
      const xmlMinificado = xmlFormat.minify(input, {
        filter: (node) => node.type !== 'Comment',
        collapseContent: true
      });
      setOutput(xmlMinificado);
      setOutputOn(true);
      setError(false);
    } catch (e) {
      setError(true);
      setOutputOn(false);
      setOutput("");
    }
  }

  function handleNovo() {
    setOutputOn(false);
    setOutput("");
    setInput("");
  }

  function handleCopiar() {
    navigator.clipboard.writeText(output);
    setCopiado(true);

    setTimeout(() => {
      setCopiado(false);
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
            placeholder={"<xml>"}
            className={`w-full p-4 border-2 rounded-lg font-mono text-sm focus:outline-none resize-none transition-all duration-300 ease-in-out h-100  textarea-text-color ${error
              ? "border-red-500 bg-purple-200/10 focus:border-red-600"
              : "border-gray-300/20 bg-purple-200/10 focus:border-purple-400"
              }`}
            rows={12}
          ></textarea>
        )}

        {outputOn && (
          <div className={`w-full h-100 textarea-text-color ${
              error ? "border-red-500 bg-purple-200/10 focus:border-red-600" : "border-gray-300/20 bg-purple-200/10 focus:border-purple-400"
            }`}>
            <SyntaxHighlighter
              language="xml"
              style={getSyntaxStyle()}
              customStyle={{
                background: 'transparent',
                padding: '0.6rem',
                margin: 0,
                fontSize: '0.775rem'
              }}
              codeTagProps={{
                style: {
                  fontFamily: 'monospace'
                }
              }}
              className="border-2 rounded-lg border-gray-300/20 bg-purple-200/10 font-mono text-sm overflow-y-auto resize-none whitespace-pre-wrap break-all custom-scrollbar textarea-white-theme h-100"
            >
              {output}
            </SyntaxHighlighter>
          </div>
        )}

        <div className="p-4 flex flex-col items-center gap-6">
          <div className="flex gap-4">
            {!outputOn && (
              <>
                <button
                  onClick={formatarXml}
                  disabled={isButtonDisabled}
                  className={`px-8 py-3 rounded-lg font-medium botao-padrao ${isButtonDisabled
                    ? "botao-padrao-desativado opacity-50 cursor-not-allowed"
                    : "botao-padrao-ativo hover:scale-105 transition-transform"
                    }`}
                >
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3v4a1 1 0 0 1-1 1H5m5 4-2 2 2 2m4-4 2 2-2 2m5-12v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"/>
                  </svg>
                </button>
                <button
                  onClick={minificarXml}
                  disabled={isButtonDisabled}
                  className={`px-8 py-3 rounded-lg font-medium botao-padrao ${isButtonDisabled
                    ? "botao-padrao-desativado opacity-50 cursor-not-allowed"
                    : "botao-padrao-ativo hover:scale-105 transition-transform"
                    }`}
                >
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h4V4m12 4h-4V4M4 16h4v4m12-4h-4v4"/>
                  </svg>
                </button>
              </>
            )}

            {outputOn && (
              <>
                <button
                  onClick={() => {
                    handleCopiar();
                  }}
                  disabled={isButtonDisabled}
                  className={`px-8 py-3 rounded-lg font-medium botao-padrao ${isButtonDisabled
                    ? "botao-padrao-desativado opacity-50 cursor-not-allowed"
                    : "botao-padrao-ativo hover:scale-105 transition-transform"
                    }`}
                >
                  {copiado ? (
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
                <button
                  onClick={() => {
                    setOutputOn(false);
                  }}
                  disabled={isButtonDisabled}
                  className={`px-8 py-3 rounded-lg font-medium botao-padrao ${isButtonDisabled
                    ? "botao-padrao-desativado opacity-50 cursor-not-allowed"
                    : "botao-padrao-ativo hover:scale-105 transition-transform"
                    }`}
                >
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd" />
                    <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    handleNovo()
                  }}
                  disabled={isButtonDisabled}
                  className={`px-8 py-3 rounded-lg font-medium botao-padrao ${isButtonDisabled
                    ? "botao-padrao-desativado opacity-50 cursor-not-allowed"
                    : "botao-padrao-ativo hover:scale-105 transition-transform"
                    }`}
                >
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14"/>
                </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}