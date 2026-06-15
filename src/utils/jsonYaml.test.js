import { describe, it, expect } from "vitest";
import { jsonToYaml, yamlToJson } from "./jsonYaml";

describe("jsonToYaml", () => {
  it("converte JSON em YAML", () => {
    const json = JSON.stringify({ nome: "Maria", tags: ["a", "b"] });
    expect(jsonToYaml(json)).toBe("nome: Maria\ntags:\n  - a\n  - b");
  });

  it("lança erro para JSON inválido", () => {
    expect(() => jsonToYaml("{ nope")).toThrow();
  });
});

describe("yamlToJson", () => {
  it("converte YAML em JSON formatado", () => {
    const yaml = "nome: Maria\nidade: 30";
    expect(yamlToJson(yaml)).toBe('{\n  "nome": "Maria",\n  "idade": 30\n}');
  });

  it("round-trip json -> yaml -> json", () => {
    const json = JSON.stringify({ a: 1, b: [true, null, "x"] }, null, 2);
    expect(yamlToJson(jsonToYaml(json))).toBe(json);
  });

  it("lança erro para YAML inválido", () => {
    expect(() => yamlToJson("a: : :\n  - [")).toThrow();
  });
});
