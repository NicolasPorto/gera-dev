// Conversão CSV <-> JSON.
// Parser de CSV com suporte a aspas duplas, vírgulas e quebras de linha dentro
// de campos, e aspas escapadas ("").

function parseCsv(text, delimiter = ",") {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];

    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
      continue;
    }

    if (c === '"') {
      inQuotes = true;
    } else if (c === delimiter) {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c === "\r") {
      // ignora; o \n cuida da quebra
    } else {
      field += c;
    }
  }
  // último campo/linha (se houver conteúdo)
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

/** CSV -> array de objetos (pronto para JSON.stringify). */
export function csvToJson(csv, delimiter = ",") {
  const text = String(csv).trim();
  if (!text) throw new Error("CSV vazio");

  const rows = parseCsv(text, delimiter);
  if (rows.length === 0) throw new Error("CSV inválido");

  const headers = rows[0];
  return rows.slice(1).map((cells) => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = cells[i] !== undefined ? cells[i] : "";
    });
    return obj;
  });
}

function escapeCell(value, delimiter) {
  const s = value == null ? "" : String(value);
  if (s.includes('"') || s.includes(delimiter) || s.includes("\n") || s.includes("\r")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

/** JSON (array de objetos ou objeto único) -> CSV. */
export function jsonToCsv(jsonString, delimiter = ",") {
  const text = String(jsonString).trim();
  if (!text) throw new Error("JSON vazio");

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("JSON inválido");
  }

  const arr = Array.isArray(data) ? data : [data];
  if (arr.length === 0) return "";
  if (arr.some((row) => typeof row !== "object" || row === null || Array.isArray(row))) {
    throw new Error("Esperado um array de objetos");
  }

  // União das chaves, preservando a ordem de primeira ocorrência.
  const headers = [];
  const seen = new Set();
  for (const row of arr) {
    for (const key of Object.keys(row)) {
      if (!seen.has(key)) {
        seen.add(key);
        headers.push(key);
      }
    }
  }

  const lines = [headers.map((h) => escapeCell(h, delimiter)).join(delimiter)];
  for (const row of arr) {
    lines.push(headers.map((h) => escapeCell(row[h], delimiter)).join(delimiter));
  }
  return lines.join("\n");
}
