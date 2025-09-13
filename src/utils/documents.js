export function generateCPF() {
  const numbers = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

  const calcDigit = (base) => {
    let sum = base.reduce((acc, num, i) => acc + num * (base.length + 1 - i), 0);
    let rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  const d1 = calcDigit(numbers);
  const d2 = calcDigit([...numbers, d1]);

  return [...numbers, d1, d2].join("");
}

export function generateCNPJ() {
  const numbers = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10));

  const calcDigit = (base) => {
    let weight = base.length === 12
      ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = base.reduce((acc, num, i) => acc + num * weight[i], 0);
    let rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  const d1 = calcDigit(numbers);
  const d2 = calcDigit([...numbers, d1]);

  return [...numbers, d1, d2].join("");
}

export function generateRG() {
  return Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join("");
}


export function formatCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function formatCNPJ(cnpj) {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

export function formatRG(rg) {
  return rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
}
