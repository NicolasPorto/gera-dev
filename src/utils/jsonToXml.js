const escapeXml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const escapeAttr = (s) => escapeXml(s).replace(/"/g, "&quot;");

const pad = (n) => "  ".repeat(n);

function buildNode(name, value, indent) {
  // Array -> repete o elemento
  if (Array.isArray(value)) {
    return value.map((v) => buildNode(name, v, indent)).join("\n");
  }

  if (value === null || value === undefined) {
    return `${pad(indent)}<${name}/>`;
  }

  if (typeof value !== "object") {
    return `${pad(indent)}<${name}>${escapeXml(value)}</${name}>`;
  }

  // Objeto: separa atributos (@), texto (#text) e filhos
  const attrs = [];
  let text = "";
  const children = [];
  for (const [k, v] of Object.entries(value)) {
    if (k.startsWith("@")) attrs.push(`${k.slice(1)}="${escapeAttr(v)}"`);
    else if (k === "#text") text = escapeXml(v);
    else children.push([k, v]);
  }
  const attrStr = attrs.length ? " " + attrs.join(" ") : "";

  if (children.length === 0) {
    return text
      ? `${pad(indent)}<${name}${attrStr}>${text}</${name}>`
      : `${pad(indent)}<${name}${attrStr}/>`;
  }

  const inner = children
    .map(([k, v]) => buildNode(k, v, indent + 1))
    .join("\n");
  const textLine = text ? `${pad(indent + 1)}${text}\n` : "";
  return `${pad(indent)}<${name}${attrStr}>\n${textLine}${inner}\n${pad(indent)}</${name}>`;
}

const HEADER = `<?xml version="1.0" encoding="UTF-8"?>\n`;

/**
 * Converte uma string JSON em XML. Lança erro se o JSON for vazio/inválido.
 * Se o JSON tiver uma única chave raiz, ela vira o elemento raiz; senão,
 * o conteúdo é envolvido em <root>.
 */
export function jsonToXml(jsonString) {
  const text = String(jsonString).trim();
  if (!text) throw new Error("JSON vazio");

  let obj;
  try {
    obj = JSON.parse(text);
  } catch {
    throw new Error("JSON inválido");
  }

  if (Array.isArray(obj)) {
    return HEADER + buildNode("root", { item: obj }, 0);
  }
  if (obj === null || typeof obj !== "object") {
    return HEADER + buildNode("root", obj, 0);
  }

  const keys = Object.keys(obj);
  const elementKeys = keys.filter((k) => !k.startsWith("@") && k !== "#text");
  if (keys.length === 1 && elementKeys.length === 1) {
    return HEADER + buildNode(elementKeys[0], obj[elementKeys[0]], 0);
  }
  return HEADER + buildNode("root", obj, 0);
}
