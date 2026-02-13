export function generateCPF() {
  const numbers = Array.from({ length: 9 }, () =>
    Math.floor(Math.random() * 10),
  );

  const calcDigit = (base) => {
    let sum = base.reduce(
      (acc, num, i) => acc + num * (base.length + 1 - i),
      0,
    );
    let rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  const d1 = calcDigit(numbers);
  const d2 = calcDigit([...numbers, d1]);

  return [...numbers, d1, d2].join("");
}

export function generateCNPJ() {
  const numbers = Array.from({ length: 12 }, () =>
    Math.floor(Math.random() * 10),
  );

  const calcDigit = (base) => {
    let weight =
      base.length === 12
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

export function generateCNPJAlfanumerico() {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let cnpjBase = "";

  for (let i = 0; i < 12; i++) {
    cnpjBase += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const dv1 = calculateCNPJDV(cnpjBase, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const dv2 = calculateCNPJDV(
    cnpjBase + dv1,
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
  );

  return cnpjBase + dv1 + dv2;
}

function calculateCNPJDV(base, weights) {
  let sum = 0;
  for (let i = 0; i < base.length; i++) {
    let charCode = base.charCodeAt(i);
    let value;

    // Se for número (48-57 na tabela ASCII), subtrai 48 para pegar o valor real
    if (charCode >= 48 && charCode <= 57) {
      value = charCode - 48;
    } else {
      // Se for letra, a regra da RFB diz para usar o valor ASCII e subtrair 48
      // Ex: 'A' é 65. 65 - 48 = 17.
      value = charCode - 48;
    }
    sum += value * weights[i];
  }

  const remainder = sum % 11;
  return remainder < 2 ? "0" : (11 - remainder).toString();
}

export function generateRG() {
  return Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join(
    "",
  );
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

export function formatCNPJAlfanumerico(cnpj) {
  if (!cnpj) return "";
  const cleaned = cnpj.toUpperCase().replace(/[^A-Z0-9]/g, "");
  return cleaned.replace(
    /^([A-Z0-9]{2})([A-Z0-9]{3})([A-Z0-9]{3})([A-Z0-9]{4})([A-Z0-9]{2})$/,
    "$1.$2.$3/$4-$5",
  );
}
