import { useState, useEffect } from "react";

export default function VerificadorMeuIp() {
  const [meuIp, setMeuIp] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [hoverRefresh, setHoverRefresh] = useState(false);
  const [carregando, setCarregando] = useState(false);

  function copiarIp() {
    navigator.clipboard.writeText(meuIp);
    setCopiado(true);

    setTimeout(() => {
      setCopiado(false);
    }, 2000);
  };

  function buscarIp() {
    setCarregando(true);
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setMeuIp(data.ip);
        setCarregando(false);
      })
      .catch(error => {
        console.log(error);
        setCarregando(false);
      });
  };

  useEffect(() => {
    buscarIp();
  }, []);

  return (
    <div className="p-4 flex flex-col items-center gap-6">
      <p className="ml-3 text-default font-medium">
        Seu IP público é:
      </p>

      {carregando ? (
        <div className="flex items-center justify-center h-10">
          <div className="animate-pulse flex space-x-1">
            <div className="h-3 w-3 bg-gray-500 rounded-full animation-delay-100"></div>
            <div className="h-3 w-3 bg-gray-500 rounded-full animation-delay-300"></div>
            <div className="h-3 w-3 bg-gray-500 rounded-full animation-delay-500"></div>
          </div>
        </div>
      ) : (
        <p className="ml-3 text-default text-3xl font-bold">
          {meuIp}
        </p>
      )}

      <div className="flex gap-2">
        <div className="relative group">
          <button
            onClick={() => copiarIp()}
            disabled={carregando || !meuIp}
            className={`botao-padrao px-4 py-2 rounded flex items-center justify-center ${(carregando || !meuIp) ? 'opacity-50 cursor-not-allowed' : ''}`}
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
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>

        <div className="relative group">
          <button
            onClick={() => buscarIp()}
            onMouseEnter={() => setHoverRefresh(true)}
            onMouseLeave={() => setHoverRefresh(false)}
            className={`botao-padrao px-4 py-2 rounded ${carregando ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={carregando}
          >
            <svg
              className={`w-6 h-6 ${hoverRefresh && !carregando ? 'animate-spin' : ''}`}
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
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            {carregando ? "Carregando..." : "Recarregar"}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-full p-4 bg-purple-200/10 rounded-lg border-2 border-gray-300/20 infos-white-theme">
          <p className="text-default text-sm text-center ">
            ❗ Um endereço IP público é um identificador exclusivo atribuído pelo seu Provedor de Serviços de Internet (ISP)
            que permite a comunicação direta com outros dispositivos e redes na Internet. Ele funciona como a "morada" principal
            da sua rede, normalmente associada ao seu roteador, e permite que o tráfego da Internet chegue à sua rede doméstica ou
            empresarial, enquanto os dispositivos dentro da rede usam endereços IP privados.
          </p>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .animate-pulse div {
            animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          .animation-delay-100 {
            animation-delay: 0.1s;
          }
          .animation-delay-300 {
            animation-delay: 0.3s;
          }
          .animation-delay-500 {
            animation-delay: 0.5s;
          }
        `}
      </style>
    </div>
  );
}