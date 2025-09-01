import { useState, useEffect } from "react";
import { gerarCPF, gerarCNPJ, gerarRG } from "../utils/documentos";

function formatarCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function formatarCNPJ(cnpj) {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

function formatarRG(rg) {
  return rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
}

export default function DocumentosGenerator() {
  const [numero, setNumero] = useState("");
  const [numeroSemMascara, setNumeroSemMascara] = useState("");
  const [ativo, setAtivo] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [maskOn, setMaskOn] = useState(false);
  const [hoverRefresh, setHoverRefresh] = useState(false);

  function handleClick(tipo) {
    if (tipo === "copiar") {
      const textoParaCopiar = maskOn ? numero : numeroSemMascara;
      navigator.clipboard.writeText(textoParaCopiar);
      setCopiado(true);

      setTimeout(() => {
        setCopiado(false);
      }, 2000);
      return;
    }

    if (tipo === "mask") {
      setMaskOn(!maskOn);
      return;
    }

    setAtivo(tipo);
    let novoNumero = "";
    if (tipo === "cpf") novoNumero = gerarCPF();
    if (tipo === "cnpj") novoNumero = gerarCNPJ();
    if (tipo === "rg") novoNumero = gerarRG();

    setNumeroSemMascara(novoNumero);
    setNumero(maskOn ? aplicarMascara(tipo, novoNumero) : novoNumero);
  }

  function aplicarMascara(tipo, numero) {
    switch (tipo) {
      case "cpf": return formatarCPF(numero);
      case "cnpj": return formatarCNPJ(numero);
      case "rg": return formatarRG(numero);
      default: return numero;
    }
  }

  useEffect(() => {
    if (numeroSemMascara && ativo) {
      setNumero(maskOn ? aplicarMascara(ativo, numeroSemMascara) : numeroSemMascara);
    }
  }, [maskOn, ativo, numeroSemMascara]);

  useEffect(() => {
    setMaskOn(true);
    handleClick("cnpj");
  }, []);

  return (
    <div className="p-4 flex flex-col items-center gap-6">
      {/* Botões */}
      <div className="flex gap-4">
        <button
          onClick={() => handleClick("cpf")}
          className={`botao-padrao px-4 py-2 rounded ${ativo === "cpf" ? "botao-padrao-clicked" : ""
            }`}
        >
          CPF
        </button>
        <button
          onClick={() => handleClick("cnpj")}
          className={`botao-padrao px-4 py-2 rounded ${ativo === "cnpj" ? "botao-padrao-clicked" : ""
            }`}
        >
          CNPJ
        </button>
        <button
          onClick={() => handleClick("rg")}
          className={`botao-padrao px-4 py-2 rounded ${ativo === "rg" ? "botao-padrao-clicked" : ""
            }`}
        >
          RG
        </button>
      </div>

      {/* Número */}
      {numero && (
        <p className="numero-gerado text-center">
          {numero}
        </p>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => handleClick("copiar")}
          className={`botao-padrao px-4 py-2 rounded flex items-center justify-center`}
        >
          {copiado ? (
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M7 9v6a4 4 0 0 0 4 4h4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1v2Z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M13 3.054V7H9.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 13 3.054ZM15 3v4a2 2 0 0 1-2 2H9v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3Z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        <button
          onClick={() => handleClick(ativo)}
          onMouseEnter={() => setHoverRefresh(true)}
          onMouseLeave={() => setHoverRefresh(false)}
          className={`botao-padrao px-4 py-2 rounded`}
        >
          <svg
            className={`w-6 h-6 text-gray-800 dark:text-white ${hoverRefresh ? 'animate-spin' : ''}`}
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
        <button
          onClick={() => handleClick("mask")}
          className={`botao-padrao px-4 py-2 rounded`}
        >
          {maskOn ? (
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M7.50001 6.49476c-.00222.00067-.00443.00134-.00665.00202-1.36964.41615-2.57189 1.22541-3.40555 1.89335-.42318.33907-.76614.65372-1.00483.88517-.11959.11596-.21369.21169-.2793.27999-.03283.03417-.05857.06153-.07687.08118l-.02184.02361-.00665.00728-.00225.00247-.00152.00167c-.23565.26049-.31736.6255-.21524.9616l1.88966 6.2193c.28122.9255.90731 1.6328 1.59535 2.159.68925.5272 1.4966.9166 2.25327 1.198.76111.2832 1.50814.4708 2.10341.5791.2973.054.5684.0904.7934.1077.1117.0085.2238.0133.3286.0113.0814-.0016.2434-.0076.4111-.0586.1678-.051.3057-.1361.3743-.18.0882-.0566.1786-.123.2667-.1923.1774-.1395.3824-.3205.5994-.5309-.076-.0369-.1525-.0755-.2297-.1152-.6068-.312-1.3433-.7546-2.0675-1.3064-.4898-.3733-1.01068-.8242-1.48988-1.3492-.28662.4467-.87678.5935-1.34124.3253-.47829-.2761-.64217-.8877-.36603-1.366.01906-.033.03873-.0675.05915-.1034.10835-.1902.23774-.4173.40797-.6498C7.73454 14.6941 7.5 13.8935 7.5 13V6.5l.00001-.00524ZM5.72195 11.0461c-.52844.1606-.82665.7191-.6661 1.2476.16056.5284.7191.8266 1.24753.6661l.00957-.003c.52843-.1605.82665-.7191.66609-1.2475-.16056-.5284-.7191-.8266-1.24753-.6661l-.00956.0029Z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M15 4c-1.4315 0-2.8171.42479-3.8089.82152-.5035.2014-.9231.40276-1.21876.55482-.14814.07618-.26601.14043-.34864.1867-.04134.02315-.07393.04184-.09715.05533l-.02775.01624-.00849.00502-.00286.00171-.00195.00117C9.1843 5.82323 9 6.14874 9 6.5V13c0 .9673.39342 1.8261.89875 2.5296.50625.7048 1.16555 1.312 1.80765 1.8013.646.4922 1.3062.8889 1.8442 1.1655.2688.1382.5176.2518.7279.3338.1044.0407.2102.0778.3111.1063.0784.0222.2351.0635.4104.0635.1753 0 .332-.0413.4104-.0635.1009-.0285.2067-.0656.3111-.1063.2103-.082.4591-.1956.7279-.3338.538-.2766 1.1982-.6733 1.8442-1.1655.6421-.4893 1.3014-1.0965 1.8076-1.8013C20.6066 14.8261 21 13.9673 21 13V6.5c0-.35126-.1852-.67728-.4864-.85801l-.001-.00065-.0029-.00171-.0085-.00502-.0278-.01624c-.0232-.01349-.0558-.03218-.0971-.05533-.0826-.04627-.2005-.11052-.3486-.1867-.2957-.15206-.7153-.35342-1.2188-.55482C17.8171 4.42479 16.4315 4 15 4Zm5 2.5.5136-.85801S20.5145 5.64251 20 6.5ZM13 7c-.5523 0-1 .44772-1 1s.4477 1 1 1h.01c.5523 0 1-.44772 1-1s-.4477-1-1-1H13Zm4 0c-.5523 0-1 .44772-1 1s.4477 1 1 1h.01c.5523 0 1-.44772 1-1s-.4477-1-1-1H17Zm-4.7071 4.2929c-.3905.3905-.3905 1.0237 0 1.4142.0269.027.0549.0552.0838.0845.4776.4831 1.243 1.2574 2.6233 1.2574 1.3803 0 2.1457-.7743 2.6232-1.2573.029-.0294.057-.0576.0839-.0846.3905-.3905.3905-1.0237 0-1.4142-.3905-.3905-1.0237-.3905-1.4142 0-.5293.5293-.757.7561-1.2929.7561-.5359 0-.7636-.2268-1.2929-.7561-.3905-.3905-1.0237-.3905-1.4142 0Z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m7.53316 11.8623.00957-.0029m5.58157 7.1424c-.5.515-.9195.8473-1.0611.8903-.4784.1454-5.42881-1.2797-6.23759-3.3305-.80878-2.0507-1.83058-5.8152-1.88967-6.2192-.0591-.40404 1.5599-1.72424 3.59722-2.61073m1.98839 8.05513c-.22637.262-.38955.5599-.55552.8474M13.4999 12c.5.5 1 1.049 2 1.049s1.5-.549 2-1.049m-4-4h.01m3.99 0h.01m-7.01-2.5c0-.28929 2.5-1.5 5-1.5s5 1.13645 5 1.5V12c0 1.9655-4.291 5-5 5-.7432 0-5-3.0345-5-5V5.5Z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}