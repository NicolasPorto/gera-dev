// Conversão entre bases numéricas usando BigInt (suporta números grandes).
const DIGITS = "0123456789abcdefghijklmnopqrstuvwxyz";

/** Interpreta uma string como número numa dada base (2–36) -> BigInt. */
export function parseInBase(str, base) {
  const s = String(str).trim().toLowerCase();
  if (!s) throw new Error("vazio");

  let body = s;
  let negative = false;
  if (body.startsWith("-")) {
    negative = true;
    body = body.slice(1);
  }
  if (!body) throw new Error("inválido");

  const b = BigInt(base);
  let value = 0n;
  for (const ch of body) {
    const d = DIGITS.indexOf(ch);
    if (d < 0 || d >= base) throw new Error(`dígito inválido: ${ch}`);
    value = value * b + BigInt(d);
  }
  return negative ? -value : value;
}

/** Formata um BigInt numa dada base (2–36). */
export function toBase(value, base) {
  if (value === 0n) return "0";
  const negative = value < 0n;
  let v = negative ? -value : value;
  const b = BigInt(base);
  let out = "";
  while (v > 0n) {
    out = DIGITS[Number(v % b)] + out;
    v /= b;
  }
  return (negative ? "-" : "") + out;
}

/** Converte uma string numa base de origem para bin/oct/dec/hex. */
export function convertBases(str, fromBase) {
  const value = parseInBase(str, fromBase);
  return {
    bin: toBase(value, 2),
    oct: toBase(value, 8),
    dec: toBase(value, 10),
    hex: toBase(value, 16),
  };
}
