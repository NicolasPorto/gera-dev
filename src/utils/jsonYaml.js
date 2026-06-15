import yaml from "js-yaml";

/** JSON -> YAML. Lança erro se o JSON for vazio/inválido. */
export function jsonToYaml(jsonString) {
  const text = String(jsonString).trim();
  if (!text) throw new Error("JSON vazio");

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("JSON inválido");
  }
  return yaml.dump(data, { indent: 2, lineWidth: -1 }).trimEnd();
}

/** YAML -> JSON (string formatada). Lança erro se o YAML for vazio/inválido. */
export function yamlToJson(yamlString) {
  const text = String(yamlString).trim();
  if (!text) throw new Error("YAML vazio");

  let data;
  try {
    data = yaml.load(text);
  } catch {
    throw new Error("YAML inválido");
  }
  if (data === undefined) throw new Error("YAML inválido");
  return JSON.stringify(data, null, 2);
}
