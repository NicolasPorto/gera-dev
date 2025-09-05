export function gerarCPF() {
  const numeros = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

  const calcDigito = (base) => {
    let soma = base.reduce((acc, num, i) => acc + num * (base.length + 1 - i), 0);
    let resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const d1 = calcDigito(numeros);
  const d2 = calcDigito([...numeros, d1]);

  return [...numeros, d1, d2].join("");
}

export function gerarCNPJ() {
  const numeros = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10));

  const calcDigito = (base) => {
    let peso = base.length === 12
      ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let soma = base.reduce((acc, num, i) => acc + num * peso[i], 0);
    let resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const d1 = calcDigito(numeros);
  const d2 = calcDigito([...numeros, d1]);

  return [...numeros, d1, d2].join("");
}

export function gerarRG() {
  return Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join("");
}


export function formatarCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function formatarCNPJ(cnpj) {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

export function formatarRG(rg) {
  return rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
}
