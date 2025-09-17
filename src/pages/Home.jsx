import { useTranslation, Trans } from 'react-i18next';
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <svg
                className="w-20 h-20 text-default mb-8"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                    clipRule="evenodd"
                />
            </svg>

            <div className="max-w-md mx-auto">
                <h1 className="text-2xl font-bold text-default mb-3">
                    GeraDev Tools
                </h1>
                <div className="text-gray-400 text-footer opacity-70 hover:opacity-100 transition-opacity duration-300 mt-4 mb-4">
                    <div className="flex flex-col items-center sm:flex-row justify-center">
                        <span className="text-[10px] sm:text-xs font-light mb-1 sm:mb-0 sm:mr-1">
                            2025 © {t("DesenvolvidoPor")}{" "}
                        </span>
                        <div className="flex">
                            <a
                                href="https://github.com/NicolasPorto"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] sm:text-xs font-medium hover:underline mx-1 transition-all"
                            >
                                Nicolas Porto
                            </a>
                            <span className="text-[10px] sm:text-xs font-light mx-1">{t("e")}</span>
                            <a
                                href="https://github.com/LuisQuintino"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] sm:text-xs font-medium hover:underline mx-1 transition-all"
                            >
                                Luis Venturini
                            </a>
                        </div>
                    </div>
                </div>
                <p className="text-default mb-4 leading-relaxed">
                    {t("Sobre")}
                </p>

                <Link
                    to="/conversor-json-class"
                    className="block info-card animation-info-card"
                >
                    <div className="info-header">
                        <Sparkles className="icon" />
                        <h2 className="info-title">{t("NovaFuncionalidade")}</h2>
                    </div>
                    <p className="info-text">
                        <Trans i18nKey="NovaFuncionalidadeInfo" components={{ strong: <strong /> }} />
                    </p>
                </Link>

                {/* <div className="info-card">
                    <p className="info-text">
                        🛡️ {t("AvisoSobre")}
                    </p>
                </div> */}

            </div>
        </div>
    );
}

export default Home;
