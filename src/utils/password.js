export const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
export const NUMBERS = "0123456789";
export const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

export function secureRandomInt(max) {
  if (max <= 0) return 0;
  const c = globalThis.crypto;
  if (c?.getRandomValues) {
    const range = 0x100000000; // 2^32
    const limit = range - (range % max); // descarta o "resto" enviesado
    const buf = new Uint32Array(1);
    let value;
    do {
      c.getRandomValues(buf);
      value = buf[0];
    } while (value >= limit);
    return value % max;
  }
  return Math.floor(Math.random() * max);
}

/** Conjuntos de caracteres ativos conforme as opções. */
export function activeSets(options) {
  const sets = [];
  if (options.uppercase) sets.push(UPPERCASE);
  if (options.lowercase) sets.push(LOWERCASE);
  if (options.numbers) sets.push(NUMBERS);
  if (options.symbols) sets.push(SYMBOLS);
  return sets;
}

/**
 * Gera uma senha garantindo ao menos um caractere de cada tipo selecionado
 * (até o limite do comprimento) e embaralhando o resultado (Fisher-Yates).
 * Retorna null se nenhuma opção estiver marcada.
 */
export function generatePassword(options, length) {
  const sets = activeSets(options);
  if (sets.length === 0) return null;

  const pool = sets.join("");
  const chars = [];

  for (const set of sets.slice(0, length)) {
    chars.push(set[secureRandomInt(set.length)]);
  }
  while (chars.length < length) {
    chars.push(pool[secureRandomInt(pool.length)]);
  }
  for (let i = chars.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join("");
}

/** Tamanho do alfabeto efetivo, para o cálculo de entropia. */
export function poolSize(options) {
  return activeSets(options).reduce((sum, set) => sum + set.length, 0);
}

/**
 * Nível de força (1..6) a partir da entropia = comprimento × log2(alfabeto).
 */
export function strengthLevel(length, alphabet) {
  if (length === 0 || alphabet === 0) return 0;
  const bits = length * Math.log2(alphabet);
  if (bits < 28) return 1; // Muito Fraca
  if (bits < 40) return 2; // Fraca
  if (bits < 60) return 3; // Média
  if (bits < 80) return 4; // Boa
  if (bits < 120) return 5; // Forte
  return 6; // Muito Forte
}
