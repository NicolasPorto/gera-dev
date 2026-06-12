function elementToJson(node) {
  const obj = {};

  for (const attr of node.attributes) {
    obj[`@${attr.name}`] = attr.value;
  }

  const elements = [];
  let text = "";
  for (const child of node.childNodes) {
    if (child.nodeType === 1) {
      elements.push(child); // elemento
    } else if (child.nodeType === 3 || child.nodeType === 4) {
      text += child.nodeValue; // texto / CDATA
    }
  }
  text = text.trim();

  // Folha (sem filhos elemento)
  if (elements.length === 0) {
    if (Object.keys(obj).length === 0) return text; // só texto -> string
    if (text) obj["#text"] = text;
    return obj;
  }

  for (const el of elements) {
    const key = el.nodeName;
    const value = elementToJson(el);
    if (key in obj) {
      if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
      obj[key].push(value);
    } else {
      obj[key] = value;
    }
  }
  if (text) obj["#text"] = text;
  return obj;
}

/**
 * Converte uma string XML em objeto JS (pronto para JSON.stringify).
 * Lança erro se o XML for vazio ou malformado.
 */
export function xmlToJson(xmlString) {
  const text = String(xmlString).trim();
  if (!text) throw new Error("XML vazio");

  const doc = new DOMParser().parseFromString(text, "application/xml");
  if (doc.querySelector("parsererror")) {
    throw new Error("XML inválido");
  }

  const root = doc.documentElement;
  return { [root.nodeName]: elementToJson(root) };
}
