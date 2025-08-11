import { useState } from "react";

export default function CpfGenerator() {
  const [cpf, setCpf] = useState("");

  function gerarCPF() {
    const numeros = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
    const calcDigito = (base) => {
      let soma = base.reduce((acc, num, i) => acc + num * (base.length + 1 - i), 0);
      let resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };
    const d1 = calcDigito(numeros);
    const d2 = calcDigito([...numeros, d1]);
    setCpf([...numeros, d1, d2].join(""));
  }

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="font-bold mb-2">Gerador de CPF</h2>
      <button
        onClick={gerarCPF}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Gerar CPF
      </button>
      {cpf && <p className="mt-2 font-mono">{cpf}</p>}
    </div>
  );
}
