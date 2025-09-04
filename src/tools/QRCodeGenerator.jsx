import { useState, useRef } from "react";
import QRCode from "qrcode";

export default function QrCodeGenerator() {
    const [url, setUrl] = useState("");
    const [qrImage, setQrImage] = useState("");
    const canvasRef = useRef(null);

    const generateQR = async () => {
        if (url.trim()) {
            try {
                const dataUrl = await QRCode.toDataURL(url.trim(), {
                    width: 200,
                    margin: 2,
                    color: {
                        dark: "#1E003E",
                        light: "#FFFFFF"
                    }
                });
                setQrImage(dataUrl);
            } catch (err) {
                console.error("Erro ao gerar QR Code:", err);
            }
        }
    };

    const clearQR = () => {
        setUrl("");
        setQrImage("");
    };

    const downloadQR = () => {
        if (!qrImage) return;

        let downloadLink = document.createElement("a");
        downloadLink.href = qrImage;
        downloadLink.download = "qrcode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const isButtonDisabled = !url.trim();

    return (
        <div className="flex flex-col items-center justify-center p-6 w-full max-w-3xl mx-auto">
            <div className="w-full flex flex-col items-center gap-6">

                <div className="mt-6 p-4 bg-purple-200/10 rounded-lg border-2 border-gray-300/20">
                    <p className="text-default text-sm text-center">
                        💡 Cole qualquer link abaixo para gerar um QR Code.
                        Use o botão de download para salvar a imagem.
                    </p>
                </div>

                <div className="w-full">
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://exemplo.com"
                        className="w-full p-4 border-2 rounded-lg font-mono text-sm focus:outline-none resize-none transition-all duration-300 ease-in-out textarea-text-color border-gray-300/20 bg-purple-200/10 focus:border-purple-400"
                        onKeyPress={(e) => e.key === "Enter" && generateQR()}
                    />
                </div>

                <div className="flex gap-4">
                    <div className="relative group">
                        <button
                            onClick={generateQR}
                            disabled={isButtonDisabled}
                            className={`px-8 py-3 rounded-lg font-medium botao-padrao ${isButtonDisabled
                                ? "botao-padrao-desativado opacity-50 cursor-not-allowed"
                                : "botao-padrao-ativo hover:scale-105 transition-transform"
                                }`}
                        >
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M4 4h6v6H4V4Zm10 10h6v6h-6v-6Zm0-10h6v6h-6V4Zm-4 10h.01v.01H10V14Zm0 4h.01v.01H10V18Zm-3 2h.01v.01H7V20Zm0-4h.01v.01H7V16Zm-3 2h.01v.01H4V18Zm0-4h.01v.01H4V14Z" />
                                <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01v.01H7V7Zm10 10h.01v.01H17V17Z" />
                            </svg>
                        </button>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            Gerar
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-purple-900"></div>
                        </div>
                    </div>

                    <div className="relative group">
                        <button
                            onClick={clearQR}
                            className="px-8 py-3 rounded-lg font-medium botao-padrao botao-padrao-ativo hover:scale-105 transition-transform"
                        >
                            <i class="fa-solid fa-eraser fa-lg"></i>
                        </button>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            Limpar
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-purple-900"></div>
                        </div>
                    </div>
                </div>

                {qrImage && (
                    <div className="flex flex-col items-center gap-4 p-6 bg-purple-200/10 rounded-lg border-2 border-gray-300/20">
                        <div className="p-4 bg-white rounded-lg">
                            <img
                                src={qrImage}
                                alt="QR Code"
                                className="w-48 h-48"
                                ref={canvasRef}
                            />
                        </div>

                        <p className="text-default text-sm text-center max-w-md">
                            QR Code gerado para:{" "}<br />
                            <span className="font-mono text-purple-400 break-all">
                                {url}
                            </span>
                        </p>

                        <div className="relative group">
                            <button
                                onClick={downloadQR}
                                className="px-6 py-2 rounded-lg font-medium botao-padrao botao-padrao-ativo hover:scale-105 transition-transform"
                            >
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path clipRule="evenodd" d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z" Rule="evenodd" />
                                    <path clipRule="evenodd" d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" Rule="evenodd" />
                                </svg>
                            </button>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                Download PNG
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-purple-900"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}