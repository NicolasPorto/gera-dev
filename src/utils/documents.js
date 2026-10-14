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

// ── Validação ────────────────────────────────────────────────
// Retornam { valid, reason, expected? }. `reason` é uma chave estável
// (empty | length | chars | repeated | checkDigits) traduzida na UI.

const onlyDigits = (s) => String(s ?? "").replace(/\D/g, "");

export function validateCPF(input) {
  const raw = String(input ?? "").trim();
  if (!raw) return { valid: false, reason: "empty" };
  if (/[^\d.\-\s]/.test(raw)) return { valid: false, reason: "chars" };

  const cpf = onlyDigits(raw);
  if (cpf.length !== 11) return { valid: false, reason: "length" };
  if (/^(\d)\1{10}$/.test(cpf)) return { valid: false, reason: "repeated" };

  const calc = (base) => {
    const sum = [...base].reduce(
      (acc, d, i) => acc + Number(d) * (base.length + 1 - i),
      0,
    );
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };
  const d1 = calc(cpf.slice(0, 9));
  const d2 = calc(cpf.slice(0, 9) + d1);
  const expected = `${d1}${d2}`;

  return cpf.slice(9) === expected
    ? { valid: true, value: cpf }
    : { valid: false, reason: "checkDigits", expected, value: cpf };
}

/** Valida CNPJ numérico e alfanumérico (regra da RFB a partir de 2026). */
export function validateCNPJ(input) {
  const raw = String(input ?? "").trim().toUpperCase();
  if (!raw) return { valid: false, reason: "empty" };
  if (/[^A-Z0-9.\-/\s]/.test(raw)) return { valid: false, reason: "chars" };

  const cnpj = raw.replace(/[^A-Z0-9]/g, "");
  if (cnpj.length !== 14) return { valid: false, reason: "length" };
  // Os dois dígitos verificadores são sempre numéricos.
  if (!/^[A-Z0-9]{12}\d{2}$/.test(cnpj)) return { valid: false, reason: "chars" };
  if (/^(.)\1{13}$/.test(cnpj)) return { valid: false, reason: "repeated" };

  const base = cnpj.slice(0, 12);
  const d1 = calculateCNPJDV(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = calculateCNPJDV(base + d1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const expected = `${d1}${d2}`;
  const alphanumeric = /[A-Z]/.test(base);

  return cnpj.slice(12) === expected
    ? { valid: true, value: cnpj, alphanumeric }
    : { valid: false, reason: "checkDigits", expected, value: cnpj, alphanumeric };
}

/** Detecta se a entrada parece um CPF (11) ou CNPJ (14) pelo tamanho limpo. */
export function detectDocumentType(input) {
  const cleaned = String(input ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (cleaned.length === 14) return "cnpj";
  if (cleaned.length === 11 && /^\d+$/.test(cleaned)) return "cpf";
  return null;
}

export function formatCNPJAlfanumerico(cnpj) {
  if (!cnpj) return "";
  const cleaned = cnpj.toUpperCase().replace(/[^A-Z0-9]/g, "");
  return cleaned.replace(
    /^([A-Z0-9]{2})([A-Z0-9]{3})([A-Z0-9]{3})([A-Z0-9]{4})([A-Z0-9]{2})$/,
    "$1.$2.$3/$4-$5",
  );
}
