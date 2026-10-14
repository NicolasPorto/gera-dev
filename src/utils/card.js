// Números de cartão de TESTE: válidos pelo algoritmo de Luhn e com prefixo
// de bandeira, mas não vinculados a nenhuma conta. Servem para testar
// máscaras, validações de formulário e detecção de bandeira.

export const BRANDS = {
  visa: { name: "Visa", prefixes: ["4"], length: 16, cvv: 3 },
  mastercard: {
    name: "Mastercard",
    prefixes: ["51", "52", "53", "54", "55", ["2221", "2720"]],
    length: 16,
    cvv: 3,
  },
  amex: { name: "American Express", prefixes: ["34", "37"], length: 15, cvv: 4 },
  elo: {
    name: "Elo",
    prefixes: ["401178", "401179", "438935", "457631", "457632", "431274", "451416", "457393", "504175", "506699", "509000", "627780", "636297", "636368", "650031", "650485", "651652", "655000"],
    length: 16,
    cvv: 3,
  },
  hipercard: { name: "Hipercard", prefixes: ["606282", "384100", "384140", "384160"], length: 16, cvv: 3 },
  diners: { name: "Diners Club", prefixes: ["36", "38", ["300", "305"]], length: 14, cvv: 3 },
  discover: { name: "Discover", prefixes: ["6011", "65"], length: 16, cvv: 3 },
};

function randomInt(max) {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return buf[0] % max;
  }
  return Math.floor(Math.random() * max);
}

const onlyDigits = (s) => String(s ?? "").replace(/\D/g, "");

/** Dígito que torna `partial` + dígito válido pelo Luhn. */
export function luhnCheckDigit(partial) {
  const digits = onlyDigits(partial);
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    // Da direita p/ esquerda, dobra as posições pares (já que o DV entra no fim).
    let d = Number(digits[digits.length - 1 - i]);
    if (i % 2 === 0) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return (10 - (sum % 10)) % 10;
}

export function luhnValid(number) {
  const digits = onlyDigits(number);
  if (digits.length < 12) return false;
  return luhnCheckDigit(digits.slice(0, -1)) === Number(digits.at(-1));
}

/** Expande prefixos-faixa (["2221","2720"]) em string concreta aleatória. */
function pickPrefix(prefixes) {
  const p = prefixes[randomInt(prefixes.length)];
  if (!Array.isArray(p)) return p;
  const [from, to] = p.map(Number);
  return String(from + randomInt(to - from + 1));
}

/** Detecta a bandeira pelo prefixo mais específico (mais longo) que casar. */
export function detectBrand(number) {
  const digits = onlyDigits(number);
  let best = null;
  let bestLen = 0;
  for (const [id, brand] of Object.entries(BRANDS)) {
    for (const p of brand.prefixes) {
      if (Array.isArray(p)) {
        const head = Number(digits.slice(0, p[0].length));
        if (digits.length >= p[0].length && head >= Number(p[0]) && head <= Number(p[1]) && p[0].length > bestLen) {
          best = id;
          bestLen = p[0].length;
        }
      } else if (digits.startsWith(p) && p.length > bestLen) {
        best = id;
        bestLen = p.length;
      }
    }
  }
  return best;
}

export function generateCardNumber(brandId = "visa") {
  const brand = BRANDS[brandId] || BRANDS.visa;
  let number = pickPrefix(brand.prefixes);
  while (number.length < brand.length - 1) number += randomInt(10);
  return number + luhnCheckDigit(number);
}

export function generateCard(brandId = "visa", now = new Date()) {
  const brand = BRANDS[brandId] || BRANDS.visa;
  const month = String(1 + randomInt(12)).padStart(2, "0");
  const year = now.getFullYear() + 1 + randomInt(5);
  const cvv = Array.from({ length: brand.cvv }, () => randomInt(10)).join("");
  return {
    brand: brandId,
    number: generateCardNumber(brandId),
    expiry: `${month}/${String(year).slice(-2)}`,
    cvv,
  };
}

/** Agrupa em blocos: Amex 4-6-5, Diners 4-6-4, demais 4-4-4-4. */
export function formatCardNumber(number) {
  const d = onlyDigits(number);
  const brand = detectBrand(d);
  const groups = brand === "amex" ? [4, 6, 5] : brand === "diners" ? [4, 6, 4] : [4, 4, 4, 4, 3];
  const out = [];
  let i = 0;
  for (const g of groups) {
    if (i >= d.length) break;
    out.push(d.slice(i, i + g));
    i += g;
  }
  if (i < d.length) out.push(d.slice(i));
  return out.join(" ");
}
