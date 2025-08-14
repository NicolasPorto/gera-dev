import { useState, useEffect } from "react";
import { gerarCPF, gerarCNPJ, gerarRG } from "../utils/documentos";

export default function DocumentosGenerator() {
  const [numero, setNumero] = useState("");
  const [ativo, setAtivo] = useState("");

  function handleClick(tipo) {
    setAtivo(tipo);
    if (tipo === "cpf") setNumero(gerarCPF());
    if (tipo === "cnpj") setNumero(gerarCNPJ());
    if (tipo === "rg") setNumero(gerarRG());
  }

  useEffect(() => {
    handleClick("cpf");
  }, []);

  return (
    <div className="p-4 flex flex-col items-center gap-6">
      {/* Botões */}
      <div className="flex gap-4">
        <button
          onClick={() => handleClick("cpf")}
          className={`botao-padrao px-4 py-2 rounded ${
            ativo === "cpf" ? "botao-padrao-clicked" : ""
          }`}
        >
          CPF
        </button>
        <button
          onClick={() => handleClick("cnpj")}
          className={`botao-padrao px-4 py-2 rounded ${
            ativo === "cnpj" ? "botao-padrao-clicked" : ""
          }`}
        >
          CNPJ
        </button>
        <button
          onClick={() => handleClick("rg")}
          className={`botao-padrao px-4 py-2 rounded ${
            ativo === "rg" ? "botao-padrao-clicked" : ""
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
    </div>
  );
}
