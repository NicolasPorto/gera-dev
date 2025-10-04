import { useState } from "react";
import { useTheme } from "../components/UseTheme";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import * as prismStyles from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTranslation } from "react-i18next";

export default function Base64FileConverter() {
    const [inputBase64, setInputBase64] = useState("");
    const [outputBase64, setOutputBase64] = useState("");
    const [fileName, setFileName] = useState("");
    const [error, setError] = useState(false);
    const [mode, setMode] = useState("file-to-base64");
    const [fileType, setFileType] = useState("pdf");
    const [copied, setCopied] = useState(false);

    const { t } = useTranslation();
    const theme = useTheme();

    const getSyntaxStyle = () => {
        return theme === "white" ? prismStyles.coldarkLight : prismStyles.coldarkDark;
    };

    function handleCopy() {
        navigator.clipboard.writeText(outputBase64);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    function handleFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        setFileName(file.name);

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(",")[1];
            setOutputBase64(base64String);
            setError(false);
        };
        reader.onerror = () => {
            setError(true);
        };
        reader.readAsDataURL(file);
    }

    function handleBase64ToFile() {
        try {
            const link = document.createElement("a");
            link.href = `data:application/${fileType};base64,${inputBase64}`;
            link.download = `download.${fileType}`;
            link.click();
            setError(false);
        } catch (e) {
            setError(true);
        }
    }

    function resetAll() {
        setInputBase64("");
        setOutputBase64("");
        setFileName("");
        setError(false);
    }

    return (
        <div className="flex flex-col items-center justify-center p-6 w-full max-w-3xl mx-auto">
            <div className="w-full flex flex-col items-center gap-4">
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            setMode("file-to-base64");
                            resetAll();
                        }}
                        className={`px-3 py-1 rounded-lg font-medium ${mode === "file-to-base64"
                            ? "default-button"
                            : "default-button-transparent border border-purple-600"
                            }`}
                    >
                        {t("ArquivoParaBase64")}
                    </button>
                    <button
                        onClick={() => {
                            setMode("base64-to-file");
                            resetAll();
                        }}
                        className={`px-3 py-1 rounded-lg font-medium ${mode === "base64-to-file"
                            ? "default-button"
                            : "default-button-transparent border border-purple-600"
                            }`}
                    >
                        {t("Base64ParaArquivo")}
                    </button>
                </div>

                <div className="info-card w-full">
                    <p className="info-text">
                        {mode === "file-to-base64"
                            ? t("InfoArquivoParaBase64")
                            : t("InfoBase64ParaArquivo")
                        }
                    </p>
                </div>

                {mode === "file-to-base64" && (
                    <>
                        <div className="w-full flex flex-col items-center gap-4">
                            {fileName && (
                                <p className="text-footer">{`Arquivo: ${fileName}`}</p>
                            )}

                            {outputBase64 && (
                                <div className="w-full border-2 rounded-lg border-gray-300/20 bg-purple-200/10 font-mono text-sm overflow-y-auto resize-none whitespace-pre-wrap break-all custom-scrollbar textarea-white-theme h-100">
                                    <SyntaxHighlighter
                                        language="plaintext"
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
                                        {outputBase64}
                                    </SyntaxHighlighter>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {mode === "base64-to-file" && (
                    <>
                        <textarea
                            value={inputBase64}
                            onChange={(e) => setInputBase64(e.target.value)}
                            placeholder={t("ColeOBase64")}
                            rows={12}
                            className={`custom-scrollbar w-full p-4 border-2 rounded-lg font-mono text-sm focus:outline-none resize-none transition-all duration-300 ease-in-out h-100 textarea-text-color textarea-white-theme ${error
                                ? "border-red-500 bg-purple-200/10 focus:border-red-600"
                                : "border-gray-300/20 bg-purple-200/10 focus:border-purple-400"
                                }`}
                        ></textarea>

                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <div className="relative group">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setFileType("pdf")}
                                        className={`px-3 py-1 rounded-lg font-medium ${fileType === "pdf" ? "default-button" : "default-button-transparent border border-purple-600"}`}
                                    >
                                        PDF
                                    </button>
                                    <button
                                        onClick={() => setFileType("png")}
                                        className={`px-3 py-1 rounded-lg font-medium ${fileType === "png" ? "default-button" : "default-button-transparent border border-purple-600"}`}
                                    >
                                        PNG
                                    </button>
                                    <button
                                        onClick={() => setFileType("jpg")}
                                        className={`px-3 py-1 rounded-lg font-medium ${fileType === "jpg" ? "default-button" : "default-button-transparent border border-purple-600"}`}
                                    >
                                        JPG
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <div className="p-4 flex flex-col items-center gap-6">
                    <div className="flex gap-4 flex-wrap justify-center">

                        {mode === "file-to-base64" && (
                            <div className="relative group">
                                <input
                                    type="file"
                                    id="fileUpload"
                                    onChange={handleFileUpload}
                                    ref={(ref) => (window.fileInputRef = ref)}
                                    className="hidden"
                                />

                                <button
                                    onClick={() => window.fileInputRef && window.fileInputRef.click()}
                                    className="px-8 py-3 rounded-lg font-medium default-button hover:scale-105 transition-transform"
                                >
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 .087.586l2.977-7.937A1 1 0 0 1 6 10h12V9a2 2 0 0 0-2-2h-4.532l-1.9-2.28A2 2 0 0 0 8.032 4H4Zm2.693 8H6.5l-3 8H18l3-8H6.693Z" clip-rule="evenodd" />
                                    </svg>
                                </button>

                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    {(t("Selecionar"))}
                                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-purple-900"></div>
                                </div>
                            </div>
                        )}

                        {mode === "base64-to-file" && (
                            <div className="relative group">
                                <button
                                    onClick={handleBase64ToFile}
                                    disabled={!inputBase64.trim()}
                                    className={`px-8 py-3 rounded-lg font-medium default-button ${!inputBase64.trim()
                                        ? "default-button-inactive opacity-50 cursor-not-allowed"
                                        : "default-button-active hover:scale-105 transition-transform"
                                        }`}
                                >
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4" />
                                    </svg>
                                </button>

                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    {t("BaixarArquivo")}
                                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-purple-900"></div>
                                </div>
                            </div>
                        )}

                        {outputBase64 && (
                            <div className="relative group">
                                <button
                                    onClick={handleCopy}
                                    className="px-8 py-3 rounded-lg font-medium default-button default-button-active hover:scale-105 transition-transform"
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

                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    {copied ? (t("Copiado", "Copiado")) : (t("Copiar", "Copiar"))}
                                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-purple-900"></div>
                                </div>
                            </div>
                        )}

                        <div className="relative group">
                            <button
                                onClick={resetAll}
                                className="px-8 py-3 rounded-lg font-medium default-button default-button-active hover:scale-105 transition-transform"
                            >
                                <i className="fa-solid fa-eraser fa-lg"></i>
                            </button>

                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                {t("Limpar", "Limpar")}
                                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-purple-900"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
