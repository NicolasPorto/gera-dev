// Parser de expressões cron de 5 campos (minuto hora dia-do-mês mês dia-da-semana).
// Retorna estrutura validada; a formatação em linguagem natural fica na UI (i18n).

const FIELDS = [
  { name: "minute", min: 0, max: 59 },
  { name: "hour", min: 0, max: 23 },
  { name: "dom", min: 1, max: 31 },
  { name: "month", min: 1, max: 12 },
  { name: "dow", min: 0, max: 6 },
];

const inRange = (v, spec) => v >= spec.min && v <= spec.max;

function parseSegment(seg, spec) {
  if (seg === "*") return { type: "every" };

  const step = seg.match(/^(.+)\/(\d+)$/);
  if (step) {
    const base = step[1];
    const n = parseInt(step[2], 10);
    if (n <= 0) return null;
    if (base === "*") return { type: "step", n };
    const rng = base.match(/^(\d+)-(\d+)$/);
    if (rng) {
      const a = +rng[1];
      const b = +rng[2];
      if (!inRange(a, spec) || !inRange(b, spec) || a > b) return null;
      return { type: "rangeStep", a, b, n };
    }
    return null;
  }

  const rng = seg.match(/^(\d+)-(\d+)$/);
  if (rng) {
    const a = +rng[1];
    const b = +rng[2];
    if (!inRange(a, spec) || !inRange(b, spec) || a > b) return null;
    return { type: "range", a, b };
  }

  if (/^\d+$/.test(seg)) {
    const v = +seg;
    if (!inRange(v, spec)) return null;
    return { type: "value", v };
  }

  return null;
}

function parseField(token, spec) {
  const parts = [];
  for (const seg of token.split(",")) {
    const p = parseSegment(seg, spec);
    if (!p) return null;
    parts.push(p);
  }
  return parts;
}

export function cronParse(expr) {
  const tokens = String(expr).trim().split(/\s+/);
  if (tokens.length !== 5) {
    return { valid: false, error: "Esperado 5 campos" };
  }
  const fields = [];
  for (let i = 0; i < 5; i++) {
    const parts = parseField(tokens[i], FIELDS[i]);
    if (!parts) return { valid: false, error: `Campo inválido: ${FIELDS[i].name}` };
    fields.push({ name: FIELDS[i].name, raw: tokens[i], parts });
  }
  return { valid: true, fields };
}
