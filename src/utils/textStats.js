// Estatísticas de texto para o contador de caracteres/palavras.

const segmenter =
  typeof Intl !== "undefined" && Intl.Segmenter
    ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
    : null;

/** Conta caracteres "visíveis" (grafemas): emoji 👍🏽 e "é" combinado contam 1. */
export function countGraphemes(text) {
  if (!text) return 0;
  if (segmenter) {
    let n = 0;
    for (const _ of segmenter.segment(text)) n++;
    return n;
  }
  return [...text].length;
}

export const WORDS_PER_MINUTE_READ = 200;
export const WORDS_PER_MINUTE_SPEAK = 130;

export function textStats(text = "") {
  const words = text.trim() ? text.trim().split(/\s+/) : [];
  const sentences = (text.match(/[^.!?…]*[\p{L}\p{N}][^.!?…]*(?:[.!?…]+|$)/gu) || [])
    .filter((s) => s.trim());

  return {
    characters: countGraphemes(text),
    charactersNoSpaces: countGraphemes(text.replace(/\s/g, "")),
    words: words.length,
    sentences: sentences.length,
    paragraphs: text.split(/\n\s*\n/).filter((p) => p.trim()).length,
    lines: text ? text.split(/\r\n|\r|\n/).length : 0,
    bytes: new TextEncoder().encode(text).length,
    readingSeconds: Math.ceil((words.length / WORDS_PER_MINUTE_READ) * 60),
    speakingSeconds: Math.ceil((words.length / WORDS_PER_MINUTE_SPEAK) * 60),
  };
}

/** Palavras mais frequentes (>= 3 letras, sem diferenciar maiúsculas). */
export function topWords(text = "", limit = 5) {
  const counts = new Map();
  for (const raw of text.toLowerCase().match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || []) {
    if ([...raw].length < 3) continue;
    counts.set(raw, (counts.get(raw) || 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([word, count]) => ({ word, count }));
}

/** Formata segundos como "2 min 30 s" / "45 s". */
export function formatDuration(seconds) {
  if (seconds < 60) return `${seconds} s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s ? `${m} min ${s} s` : `${m} min`;
}

/** Limites populares exibidos como barras de progresso. */
export const TEXT_LIMITS = [
  { id: "tweet", labelKey: "LimiteTweet", max: 280 },
  { id: "metaTitle", labelKey: "LimiteMetaTitle", max: 60 },
  { id: "metaDescription", labelKey: "LimiteMetaDescription", max: 160 },
  { id: "sms", labelKey: "LimiteSMS", max: 160 },
  { id: "instagram", labelKey: "LimiteInstagram", max: 2200 },
];
