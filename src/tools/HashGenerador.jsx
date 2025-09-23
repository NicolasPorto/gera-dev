import { useState } from "react";
import { useTheme } from "../components/UseTheme";
import { useTranslation } from 'react-i18next';
import CryptoJS from 'crypto-js';

export default function HashGenerator() {
    const [input, setInput] = useState("");
    const [md5Hash, setMd5Hash] = useState("");
    const [sha1Hash, setSha1Hash] = useState("");
    const [sha256Hash, setSha256Hash] = useState("");
    const [error, setError] = useState(false);
    const [outputOn, setOutputOn] = useState(false);
    const [copied, setCopied] = useState({ md5: false, sha1: false, sha256: false });
    const { t } = useTranslation();

    const theme = useTheme();

    function generateHashes() {
        try {
            if (input.trim() === "") {
                setError(true);
                setOutputOn(false);
                return;
            }

            setMd5Hash(CryptoJS.MD5(input).toString());
            setSha1Hash(CryptoJS.SHA1(input).toString());
            setSha256Hash(CryptoJS.SHA256(input).toString());

            setOutputOn(true);
            setError(false);
        } catch (e) {
            setError(true);
            setOutputOn(false);
        }
    }

    function handleInputChange(e) {
        const value = e.target.value;
        setInput(value);
        setError(false);
    }

    function handleNew() {
        setOutputOn(false);
        setMd5Hash("");
        setSha1Hash("");
        setSha256Hash("");
        setInput("");
        setError(false);
        setCopied({ md5: false, sha1: false, sha256: false });
    }

    function handleCopy(hashType) {
        let textToCopy = "";
        switch (hashType) {
            case "md5":
                textToCopy = md5Hash;
                break;
            case "sha1":
                textToCopy = sha1Hash;
                break;
            case "sha256":
                textToCopy = sha256Hash;
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

    const isButtonDisabled = input.trim() === "";

    return (
        <div className="flex flex-col items-center justify-center p-6 w-full max-w-3xl mx-auto">
            <div className="w-full flex flex-col items-center gap-6">
                <div className="info-card w-full">
                    <p className="info-text">
                        {`💡 ${t("InfoHash")}`}
                    </p>
                </div>

                {!outputOn && (
                    <textarea
                        value={input}
                        onChange={handleInputChange}
                        placeholder={t("TextoHash")}
                        className={`custom-scrollbar w-full p-4 border-2 rounded-lg font-mono text-sm focus:outline-none resize-none transition-all duration-300 ease-in-out h-100 textarea-text-color textarea-white-theme ${error
                            ? "border-red-500 bg-purple-200/10 focus:border-red-600"
                            : "border-gray-300/20 bg-purple-200/10 focus:border-purple-400"
                            }`}
                        rows={12}
                    ></textarea>
                )}

                {outputOn && (
                    <div className="w-full flex flex-col gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-default">MD5</span>
                                <div className="relative group">
                                    <button
                                        onClick={() => handleCopy("md5")}
                                        className="p-1 rounded default-button"
                                    >
                                        {copied.md5 ? (
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
                                        {copied.md5 ? (t("Copiado")) : (t("Copiar"))}
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full border-2 rounded-lg border-gray-300/20 bg-purple-200/10 font-mono text-sm overflow-y-auto resize-none custom-scrollbar textarea-text-color textarea-white-theme p-3 break-all">
                                {md5Hash}
                            </div>
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-default">SHA1</span>
                                <div className="relative group">
                                    <button
                                        onClick={() => handleCopy("sha1")}
                                        className="p-1 rounded default-button"
                                    >
                                        {copied.sha1 ? (
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
                                        {copied.sha1 ? (t("Copiado")) : (t("Copiar"))}
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full border-2 rounded-lg border-gray-300/20 bg-purple-200/10 font-mono text-sm overflow-y-auto resize-none custom-scrollbar textarea-text-color textarea-white-theme p-3 break-all">
                                {sha1Hash}
                            </div>
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-default">SHA256</span>
                                <div className="relative group">
                                    <button
                                        onClick={() => handleCopy("sha256")}
                                        className="p-1 rounded default-button"
                                    >
                                        {copied.sha256 ? (
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
                                        {copied.sha256 ? (t("Copiado")) : (t("Copiar"))}
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full border-2 rounded-lg border-gray-300/20 bg-purple-200/10 font-mono text-sm overflow-y-auto resize-none custom-scrollbar textarea-text-color textarea-white-theme p-3 break-all">
                                {sha256Hash}
                            </div>
                        </div>
                    </div>
                )}

                <div className="p-4 flex flex-col items-center gap-6">
                    <div className="flex gap-4 flex-wrap justify-center">
                        {!outputOn && (
                            <div className="relative group">
                                <button
                                    onClick={generateHashes}
                                    disabled={isButtonDisabled}
                                    className={`px-8 py-3 rounded-lg font-medium default-button ${isButtonDisabled
                                        ? "default-button-inactive opacity-50 cursor-not-allowed"
                                        : "default-button-active hover:scale-105 transition-transform"
                                        }`}
                                >
                                    <i class="fa-solid fa-shield fa-lg"></i>
                                </button>

                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    {t("Gerar")}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                </div>
                            </div>
                        )}

                        {outputOn && (
                            <>
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