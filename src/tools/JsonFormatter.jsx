import { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);
  const [outputOn, setOutputOn] = useState(false);
  const [copiado, setCopiado] = useState(false);

  function formatarJSON() {
    try {
      const obj = JSON.parse(input);
      const jsonBonito = JSON.stringify(obj, null, 2);
      setOutput(jsonBonito);
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
            className={`w-full p-4 border-2 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 resize-none ${error
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-purple-300"
              } background-default text-default`}
            rows={12}
          ></textarea>
        )}

        {outputOn && (
          <>
            <div className="w-full p-4 border-2 border-gray-300 rounded-lg font-mono text-sm background-default text-default h-120 overflow-y-auto resize-none whitespace-pre-wrap break-all">
              <SyntaxHighlighter
                language="json"
                style={coldarkDark}
                customStyle={{
                  background: 'transparent',
                  padding: '1rem',
                  margin: 0,
                  fontSize: '0.875rem'
                }}
                codeTagProps={{
                  style: {
                    fontFamily: 'monospace'
                  }
                }}
              >
                {output}
              </SyntaxHighlighter>
            </div>
          </>
        )}

        <div className="p-4 flex flex-col items-center gap-6">
          <div className="flex gap-4">
            {!outputOn && (
              <button
                onClick={formatarJSON}
                disabled={isButtonDisabled}
                className={`px-8 py-3 rounded-lg font-medium text-lg botao-padrao ${isButtonDisabled
                  ? "botao-padrao-desativado opacity-50 cursor-not-allowed"
                  : "botao-padrao-ativo hover:scale-105 transition-transform"
                  }`}
              >
                Formatar
              </button>
            )}

            {outputOn && (
              <>
                <button
                  onClick={() => {
                    handleCopiar();
                  }}
                  disabled={isButtonDisabled}
                  className={`px-8 py-3 rounded-lg font-medium text-lg botao-padrao ${isButtonDisabled
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
                  className={`px-8 py-3 rounded-lg font-medium text-lg botao-padrao ${isButtonDisabled
                    ? "botao-padrao-desativado opacity-50 cursor-not-allowed"
                    : "botao-padrao-ativo hover:scale-105 transition-transform"
                    }`}
                >
                  Editar
                </button>
                <button
                  onClick={() => {
                    handleNovo()
                  }}
                  disabled={isButtonDisabled}
                  className={`px-8 py-3 rounded-lg font-medium text-lg botao-padrao ${isButtonDisabled
                    ? "botao-padrao-desativado opacity-50 cursor-not-allowed"
                    : "botao-padrao-ativo hover:scale-105 transition-transform"
                    }`}
                >
                  Novo
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}