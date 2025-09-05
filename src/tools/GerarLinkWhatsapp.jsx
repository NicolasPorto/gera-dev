import { useState } from "react";
import InputMask from 'react-input-mask';

export default function GerarLinkWhatsapp() {
    const [phonenumber, setPhoneNumber] = useState("");
    const [infoText, setInfoText] = useState("");
    const [linkWhatsapp, setLinkWhatsapp] = useState("");
    const [linkAlreadyGenerated, setLinkAlreadyGenerated] = useState(false);
    const [copiado, setCopiado] = useState(false);
    const templateUrlWaMe = "https://wa.me/"

    function copiarLink() {
        navigator.clipboard.writeText(linkWhatsapp);
        setCopiado(true);

        setTimeout(() => {
            setCopiado(false);
        }, 2000);
    };

    const gerarLinkWhatsapp = () => {
        let link = templateUrlWaMe + phonenumber.replace(/\D/g, '')
        if (infoText.trim() != "")
            link += `?text=${infoText}`

        setLinkWhatsapp(link)
        setLinkAlreadyGenerated(true)
    };

    const clearInputs = () => {
        setPhoneNumber("");
        setInfoText("");
        setLinkWhatsapp(false);
        setCopiado(false);
        setLinkAlreadyGenerated(false);
    };

    const isButtonDisabled = phonenumber.replace(/\D/g, '').length < 11;
    return (
        <div className="flex flex-col items-centermax-w-3xl">
            <div className="w-full flex flex-col items-center gap-6">
                {!linkAlreadyGenerated ? 
                (
                    <>
                        <div className="w-l">
                            <InputMask
                                type="tel"
                                value={phonenumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="(..) .....-...."
                                mask="(99) 99999-9999"
                                className="w-small p-4 border-2 rounded-lg font-mono text-sm focus:outline-none resize-none transition-all duration-300 ease-in-out textarea-text-color border-gray-300/20 bg-purple-200/10 focus:border-purple-400"
                            />
                        </div>

                        <div className="w-md h-50">
                            <textarea
                                value={infoText}
                                onChange={(e) => setInfoText(e.target.value)}
                                disabled={isButtonDisabled}
                                className="w-md h-50 p-4 border-2 rounded-lg font-mono text-md focus:outline-none resize-none transition-all duration-300 ease-in-out textarea-text-color border-gray-300/20 bg-purple-200/10 focus:border-purple-400"
                            />
                        </div>

                        <div className="p-4 bg-purple-200/10 rounded-lg border-2 border-gray-300/20">
                            <p className="text-default text-sm text-center">
                                💡 Cole um número de telefone válido e a mensagem desejada abaixo
                            </p>
                        </div>
                    </>
                )
                :
                (
                    <>
                        <div className="w-small">
                            <div className="flex gap-4 mb-5">
                                <a 
                                    href={linkWhatsapp}
                                    className="w-small p-4 border-2 rounded-lg font-mono text-sm focus:outline-none resize-none transition-all duration-300 ease-in-out textarea-text-color border-gray-300/20 bg-purple-200/10 focus:border-purple-400"
                                >
                                    Clique aqui para redirecionar
                                </a>
                            </div>
                        </div>
                    </>
                )
            }

                <div className="flex gap-4">
                    <div className="relative group">
                        <button
                            onClick={gerarLinkWhatsapp}
                            disabled={isButtonDisabled || linkAlreadyGenerated}
                            className={`px-8 py-3 rounded-lg font-medium botao-padrao ${(isButtonDisabled || linkAlreadyGenerated)
                                ? "botao-padrao-desativado opacity-50 cursor-not-allowed"
                                : "botao-padrao-ativo hover:scale-105 transition-transform"
                                }`}
                        >
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path fill="currentColor" fill-rule="evenodd" d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z" clip-rule="evenodd"/>
                                <path fill="currentColor" d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"/>
                            </svg>
                        </button>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            Gerar
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-purple-900"></div>
                        </div>
                    </div>

                    <div className="relative group">
                        <button
                            onClick={clearInputs}
                            className="px-8 py-3 rounded-lg font-medium botao-padrao botao-padrao-ativo hover:scale-105 transition-transform"
                        >
                            <i class="fa-solid fa-eraser fa-lg"></i>
                        </button>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            Limpar
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-purple-900"></div>
                        </div>
                    </div>

                    <div className="relative group">
                        <button
                            onClick={copiarLink}
                            disabled={!linkAlreadyGenerated && !copiado}
                            className={`px-8 py-3 rounded-lg font-medium botao-padrao ${!linkAlreadyGenerated && !copiado
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
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            Copiar
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-purple-900"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}