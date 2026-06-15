// Executa uma regex sobre um texto e retorna os matches (com grupos) ou um erro.
export function findMatches(pattern, flags, text) {
  if (!pattern) return { matches: [], error: null };

  let re;
  try {
    re = new RegExp(pattern, flags);
  } catch (e) {
    return { matches: [], error: e.message };
  }

  const matches = [];
  if (re.global) {
    let m;
    let guard = 0;
    while ((m = re.exec(text)) !== null) {
      matches.push({
        index: m.index,
        value: m[0],
        groups: m.slice(1),
        named: m.groups || null,
      });
      // evita loop infinito em matches de comprimento zero
      if (m.index === re.lastIndex) re.lastIndex++;
      if (++guard > 10000) break;
    }
  } else {
    const m = re.exec(text);
    if (m) {
      matches.push({
        index: m.index,
        value: m[0],
        groups: m.slice(1),
        named: m.groups || null,
      });
    }
  }
  return { matches, error: null };
}

// Quebra o texto em segmentos (com flag de match) para destacar as ocorrências.
export function highlightSegments(text, matches) {
  const segments = [];
  let last = 0;
  for (const m of matches) {
    if (m.value.length === 0 || m.index < last) continue; // pula vazios/sobrepostos
    if (m.index > last) segments.push({ text: text.slice(last, m.index), hit: false });
    segments.push({ text: m.value, hit: true });
    last = m.index + m.value.length;
  }
  if (last < text.length) segments.push({ text: text.slice(last), hit: false });
  return segments;
}
