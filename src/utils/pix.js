// Geração do "PIX copia e cola" (BR Code estático, padrão EMV® QRCPS-MPM
// adotado pelo Banco Central). Sem dependências — o QR é desenhado pela UI.

import { validateCPF, validateCNPJ } from "./documents.js";

/** Campo EMV: id (2) + tamanho (2) + valor. */
const field = (id, value) => `${id}${String(value.length).padStart(2, "0")}${value}`;

/** CRC16-CCITT-FALSE (poly 0x1021, init 0xFFFF), exigido no campo 63. */
export function crc16(payload) {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let b = 0; b < 8; b++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

/** Remove acentos e caracteres fora do ASCII imprimível (bancos rejeitam). */
const toAscii = (s) =>
  String(s ?? "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\x20-\x7E]/g, "")
    .trim();

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Identifica o tipo de chave e devolve no formato que o DICT espera:
 * CPF/CNPJ só dígitos, telefone +55..., e-mail minúsculo, aleatória (EVP) como está.
 */
export function normalizePixKey(input) {
  const key = String(input ?? "").trim();
  if (!key) return { type: null, value: "" };

  if (key.includes("@")) return { type: "email", value: key.toLowerCase() };
  if (UUID_RE.test(key)) return { type: "evp", value: key.toLowerCase() };

  const digits = key.replace(/\D/g, "");
  if (key.startsWith("+")) return { type: "phone", value: `+${digits}` };
  if (digits.length === 14 && validateCNPJ(digits).valid)
    return { type: "cnpj", value: digits };
  if (digits.length === 11 && validateCPF(digits).valid)
    return { type: "cpf", value: digits };
  if (digits.length === 10 || digits.length === 11)
    return { type: "phone", value: `+55${digits}` };
  if (digits.length === 12 || digits.length === 13)
    return { type: "phone", value: `+${digits}` };

  return { type: "unknown", value: key };
}

/** Formata valor em reais para o campo 54 ("10.50"). Vazio/0 => sem valor. */
export function formatAmount(amount) {
  const n = Number(String(amount ?? "").replace(",", "."));
  if (!Number.isFinite(n) || n <= 0) return "";
  return n.toFixed(2);
}

export const PIX_LIMITS = { name: 25, city: 15, txid: 25, description: 40 };

/**
 * Monta o payload completo do PIX estático.
 * @param {{ key: string, name: string, city: string, amount?: string|number,
 *           txid?: string, description?: string }} data
 */
export function buildPixPayload({ key, name, city, amount, txid, description }) {
  const { value: pixKey } = normalizePixKey(key);
  const merchantName = toAscii(name).slice(0, PIX_LIMITS.name);
  const merchantCity = toAscii(city).slice(0, PIX_LIMITS.city);
  const info = toAscii(description).slice(0, PIX_LIMITS.description);
  const id =
    String(txid ?? "")
      .replace(/[^A-Za-z0-9]/g, "")
      .slice(0, PIX_LIMITS.txid) || "***";
  const value = formatAmount(amount);

  const account =
    field("00", "br.gov.bcb.pix") +
    field("01", pixKey) +
    (info ? field("02", info) : "");

  const payload =
    field("00", "01") +
    field("26", account) +
    field("52", "0000") +
    field("53", "986") +
    (value ? field("54", value) : "") +
    field("58", "BR") +
    field("59", merchantName) +
    field("60", merchantCity) +
    field("62", field("05", id)) +
    "6304";

  return payload + crc16(payload);
}

/** Erros de preenchimento (chaves i18n) — vazio quando está tudo certo. */
export function validatePixInput({ key, name, city }) {
  const errors = [];
  const { type, value } = normalizePixKey(key);
  if (!value) errors.push("PixErroChave");
  else if (type === "unknown") errors.push("PixErroChaveInvalida");
  if (!toAscii(name)) errors.push("PixErroNome");
  if (!toAscii(city)) errors.push("PixErroCidade");
  // O campo 26 inteiro precisa caber em 99 caracteres.
  if (value.length > 77) errors.push("PixErroChaveInvalida");
  return [...new Set(errors)];
}
