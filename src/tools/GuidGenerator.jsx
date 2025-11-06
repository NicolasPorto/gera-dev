import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

export default function GuidGenerator() {
    const [guid, setGuid] = useState("");
    const [copied, setCopied] = useState(false);
    const [hoverRefresh, setHoverRefresh] = useState(false);
    const [error, setError] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        generateGuid();
    }, []);

    const generateGuid = () => {
        setGuid(uuidv4());
    };

    const copyGuid = () => {
        navigator.clipboard.writeText(guid);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };


    return (
        <div className="p-4 flex flex-col items-center gap-6 w-full">

            {guid && (
                <p
                    className='ml-3 text-default text-3xl font-bold'>
                    {guid}
                </p>
            )}

            <div className="flex gap-2">
                <div className="relative group">
                    <button
                        onClick={copyGuid}
                        className={`px-8 py-3 rounded-lg font-medium default-button default-button-active hover:scale-105 transition-transform`}
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
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all width:auto duration-200">
                        {t("Copiar")}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                </div>
                
                <div className="relative group">
                        <button
                            onClick={() => setGuid(guid.toLowerCase())}
                            className={`px-8 py-3 rounded-lg font-medium default-button default-button-active hover:scale-105 transition-transform`}
                        >
                            <i class="fa-solid fa-circle-arrow-up fa-rotate-180 fa-lg"></i>
                        </button>

                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all width:auto duration-200">
                            {t("Letras Minúsculas")}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                    </div>

                    <div className="relative group">
                        <button
                            onClick={() => setGuid(guid.toUpperCase())}
                            className={`px-8 py-3 rounded-lg font-medium default-button default-button-active hover:scale-105 transition-transform`}
                        >
                            <i class="fa-solid fa-circle-arrow-up fa-lg"></i>
                        </button>

                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all width:auto duration-200">
                            {t("Letras Maiúsculas")}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                    </div>

                    <div className="relative group">
                        <button
                            onClick={generateGuid}
                            onMouseEnter={() => setHoverRefresh(true)}
                            onMouseLeave={() => setHoverRefresh(false)}
                            className={`px-8 py-3 rounded-lg font-medium default-button default-button-active hover:scale-105 transition-transform`}
                        >
                        <svg
                            className={`w-6 h-6 ${hoverRefresh ? 'animate-spin' : ''}`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4" />
                        </svg>
                    </button>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all width:auto duration-200">
                        {t("Recarregar")}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}