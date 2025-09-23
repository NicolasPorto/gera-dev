import { useState } from "react";
import { useTheme } from "../components/UseTheme";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as prismStyles from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTranslation } from 'react-i18next';

export default function JWTDecoderEncoder() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState(null);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState({ header: false, payload: false, all: false });
  const { t } = useTranslation();

  const theme = useTheme();

  function decodeJWT() {
    try {
      setError(false);

      if (!token.trim()) {
        setError(true);
        setDecoded(null);
        return;
      }

      const cleanToken = token.trim().replace(/\s/g, '');

      const parts = cleanToken.split('.');
      if (parts.length !== 3) {
        setError(true);
        setDecoded(null);
        return;
      }

      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      const signature = parts[2];

      const currentTime = Math.floor(Date.now() / 1000);
      const isExpired = payload.exp && payload.exp < currentTime;

      setDecoded({
        header,
        payload,
        signature,
        isExpired,
        expirationDate: payload.exp ? new Date(payload.exp * 1000).toLocaleString() : null,
        issuedAt: payload.iat ? new Date(payload.iat * 1000).toLocaleString() : null,
        currentTime: new Date().toLocaleString()
      });

    } catch (e) {
      setError(true);
      setDecoded(null);
    }
  }

  function handleTokenChange(e) {
    const value = e.target.value;
    setToken(value);
    setError(false);
    setDecoded(null);
  }

  function handleNew() {
    setToken("");
    setDecoded(null);
    setError(false);
  }

  function handleCopy(hashType) {
    let textToCopy = "";
    switch (hashType) {
      case "payload":
        textToCopy = formatJSON(decoded.payload);
        break;
      case "header":
        textToCopy = formatJSON(decoded.header);
        break;
      case "all":
        textToCopy = formatJSON(decoded);
        break;
      case "signature":
        textToCopy = decoded.signature;
        break;
      default:
        return;
    }

    navigator.clipboard.writeText(textToCopy);
    setCopied({ ...copied, [hashType]: true });

    setTimeout(() => {
      setCopied({ ...copied, [hashType]: false });
    }, 2000);
  }

  function formatJSON(obj) {
    return JSON.stringify(obj, null, 2);
  }

  const getSyntaxStyle = () => {
    return theme === 'white' ? prismStyles.coldarkLight : prismStyles.coldarkDark;
  };

  const isButtonDisabled = token.trim() === "";

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full max-w-4xl mx-auto">
      <div className="w-full flex flex-col items-center gap-6">

        {!decoded && (
          <>
            <div className="info-card w-full">
              <p className="info-text">
                {`💡 ${t("InfoJWTDecoderEncoder")}`}
              </p>
            </div>
            <textarea
              value={token}
              onChange={handleTokenChange}
              placeholder={t("TokenPlaceholder")}
              className={`custom-scrollbar w-full p-4 border-2 rounded-lg font-mono text-sm focus:outline-none resize-none transition-all duration-300 ease-in-out h-32 textarea-text-color textarea-white-theme ${error
                ? "border-red-500 bg-red-50/10 focus:border-red-600 error"
                : "border-gray-300/20 bg-purple-200/10 focus:border-purple-400"
                }`}
              rows={4}
            ></textarea>
          </>
        )}

        {decoded && (
          <div className="text-default w-full space-y-6">
            <div className={`p-4 rounded-lg border-2 ${decoded.isExpired
              ? "bg-red-900/20 border-red-500"
              : "bg-green-900/20 border-green-500"
              }`}>
              <div className="flex items-center gap-2">
                <i className={`fa-solid ${decoded.isExpired ? "fa-clock text-red-400" : "fa-check-circle text-green-400"
                  }`}></i>
                <span className="font-medium">
                  {decoded.isExpired
                    ? t("TokenExpirado")
                    : t("TokenValido")}
                </span>
              </div>
              {decoded.expirationDate && (
                <p className="text-sm mt-1">
                  {t("ExpiraEm")}: {decoded.expirationDate}
                </p>
              )}
            </div>

            <div className="w-full border-2 rounded-lg border-gray-300/20 bg-purple-200/10 text-sm textarea-white-theme">
              <div className="p-3 border-b sub-header flex justify-between items-center">
                <h3 className="font-mono font-bold text-purple-600">
                  HEADER: <span className="text-default">ALGORITHM & TOKEN TYPE</span>
                </h3>
                <div className="relative group">
                  <button
                    onClick={() => handleCopy("header")}
                    className="p-1 rounded default-button"
                  >
                    {copied.header ? (
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M7 9v6a4 4 0 0 0 4 4h4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1v2Z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M13 3.054V7H9.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 13 3.054ZM15 3v4a2 2 0 0 1-2 2H9v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3Z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {copied.header ? (t("Copiado")) : (t("Copiar"))}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>
              <div className="font-mono text-sm">
                <SyntaxHighlighter
                  language="json"
                  style={getSyntaxStyle()}
                  customStyle={{
                    background: 'transparent',
                    padding: '1rem',
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
                  {formatJSON(decoded.header)}
                </SyntaxHighlighter>
              </div>
            </div>

            <div className="w-full border-2 rounded-lg border-gray-300/20 bg-purple-200/10 text-sm textarea-white-theme">
              <div className="p-3 border-b sub-header flex justify-between items-center">
                <h3 className="font-mono font-bold text-purple-600">
                  PAYLOAD: <span className="text-default">DATA</span>
                </h3>

                <div className="relative group">
                  <button
                    onClick={() => handleCopy("payload")}
                    className="p-1 rounded default-button"
                  >
                    {copied.payload ? (
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M7 9v6a4 4 0 0 0 4 4h4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1v2Z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M13 3.054V7H9.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 13 3.054ZM15 3v4a2 2 0 0 1-2 2H9v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3Z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {copied.payload ? (t("Copiado")) : (t("Copiar"))}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>
              <div className="font-mono text-sm">
                <SyntaxHighlighter
                  language="json"
                  style={getSyntaxStyle()}
                  customStyle={{
                    background: 'transparent',
                    padding: '1rem',
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
                  {formatJSON(decoded.payload)}
                </SyntaxHighlighter>
              </div>
            </div>

            <div className="w-full border-2 rounded-lg border-gray-300/20 bg-purple-200/10 text-sm textarea-white-theme">
              <div className="p-3 border-b sub-header flex justify-between items-center">
                <h3 className="font-mono font-bold text-purple-600">
                  SIGNATURE: <span className="text-default">VERIFY SIGNATURE</span>
                </h3>
                <div className="relative group">
                  <button
                    onClick={() => handleCopy("signature")}
                    className="p-1 rounded default-button"
                  >
                    {copied.signature ? (
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M7 9v6a4 4 0 0 0 4 4h4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1v2Z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M13 3.054V7H9.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 13 3.054ZM15 3v4a2 2 0 0 1-2 2H9v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3Z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  <div className="z-50 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {copied.signature ? (t("Copiado")) : (t("Copiar"))}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-default mb-2">
                  {t("SignatureInfo")}
                </p>
                <div className="font-mono text-xs bg-black/20 text-default p-2 rounded break-all">
                  {decoded.signature}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {decoded.issuedAt && (
                <div className="p-3 border-2 rounded-lg border-gray-300/20 bg-purple-200/10 textarea-white-theme">
                  <h4 className="font-medium text-purple-600 text-sm">
                    <i className="fa-solid fa-clock mr-2 text-purple-600"></i>
                    {t("EmitidoEm", "Emitido em")}
                  </h4>
                  <p className="text-sm">{decoded.issuedAt}</p>
                </div>
              )}
              <div className="p-3 border-2 rounded-lg border-gray-300/20 bg-purple-200/10 textarea-white-theme">
                <h4 className="font-medium text-purple-600 text-sm">
                  <i className="fa-solid fa-calendar mr-2 text-purple-600"></i>
                  {t("HoraAtual", "Hora atual")}
                </h4>
                <p className="text-sm">{decoded.currentTime}</p>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 flex flex-col items-center gap-6">
          <div className="flex gap-4 flex-wrap justify-center">
            {!decoded ? (
              <div className="relative group">
                <button
                  onClick={decodeJWT}
                  disabled={isButtonDisabled}
                  className={`px-8 py-3 rounded-lg font-medium default-button ${isButtonDisabled
                    ? "default-button-inactive opacity-50 cursor-not-allowed"
                    : "default-button-active hover:scale-105 transition-transform"
                    }`}
                >
                  <i className="fa-solid fa-unlock fa-lg"></i>
                </button>

                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {t("Decodificar")}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="relative group">
                  <button
                    onClick={() => {
                      handleCopy("all");
                    }}
                    disabled={isButtonDisabled}
                    className={`px-8 py-3 rounded-lg font-medium default-button ${isButtonDisabled
                      ? "default-button-inactive opacity-50 cursor-not-allowed"
                      : "default-button-active hover:scale-105 transition-transform"
                      }`}
                  >
                    {copied.all ? (
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
                    {copied.all ? t("Copiado") : t("Copiar")}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>

                <div className="relative group">
                  <button
                    onClick={() => {
                      setDecoded(null);
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
                    {t("Limpar", "Limpar")}
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