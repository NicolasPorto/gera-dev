import { useState } from "react";
import { Eraser } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { IconButton } from "../components/IconButton";

export default function HTMLVisualizer() {
    const [htmlCode, setHtmlCode] = useState("");
    const [isPreview, setIsPreview] = useState(false);
    const { t } = useTranslation();

    const viewHTML = () => {
        if (htmlCode.trim()) {
            setIsPreview(true);
        }
    };

    const editHTML = () => {
        setIsPreview(false);
    };

    const clearHTML = () => {
        setHtmlCode("");
        setIsPreview(false);
    };

    const isButtonDisabled = !htmlCode.trim();

    return (
        <div className="flex flex-col items-center justify-center p-6 w-full max-w-5xl mx-auto">
            <div className="w-full flex flex-col items-center gap-6">

                <div className="info-card w-full">
                    <p className="info-text">
                        💡 {t("InfoHTML")}
                    </p>
                </div>

                {!isPreview ? (
                    <textarea
                        value={htmlCode}
                        onChange={(e) => setHtmlCode(e.target.value)}
                        placeholder="<html/>"
                        className="w-full p-4 border-2 rounded-lg font-mono text-sm focus:outline-none resize-none transition-all duration-300 ease-in-out h-96 textarea-text-color textarea-white-theme border-gray-300/20 bg-purple-200/10 focus:border-purple-400 custom-scrollbar"
                        onKeyDown={(e) => {
                            if (e.ctrlKey && e.key === 'Enter') {
                                viewHTML();
                            }
                        }}
                    />
                ) : (
                    <div className="w-full h-96 border-2 border-gray-300/20 rounded-lg bg-white overflow-auto custom-scrollbar">
                        <iframe
                            srcDoc={htmlCode}
                            title="HTML Preview"
                            sandbox="allow-same-origin"
                            className="w-full h-full border-none custom-scrollbar"
                        />
                    </div>
                )}

                <div className="flex gap-4">
                    {!isPreview ? (
                        <IconButton
                            label={t("Visualizar")}
                            onClick={viewHTML}
                            disabled={isButtonDisabled}
                            className={`px-8 py-3 rounded-lg font-medium ${isButtonDisabled
                                ? "default-button-inactive opacity-50 cursor-not-allowed"
                                : "default-button-active hover:scale-105 transition-transform"
                                }`}
                        >
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z" clipRule="evenodd" />
                                </svg>

                            </IconButton>
                    ) : (
                        <IconButton
                            label={t("Editar")}
                            onClick={editHTML}
                            className="px-8 py-3 rounded-lg font-medium default-button-active hover:scale-105 transition-transform"
                        >
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
                                </svg>
                            </IconButton>
                    )}

                    <IconButton
                        label={t("Limpar")}
                        onClick={clearHTML}
                        className="px-8 py-3 rounded-lg font-medium default-button-active hover:scale-105 transition-transform"
                    >
                        <Eraser size={20} />
                    </IconButton>
                </div>

                <div className="info-card">
                    <p className="info-text">
                        ⌨️ {t("AtalhoVisualizar")}
                    </p>
                </div>
            </div>
        </div>
    );
}