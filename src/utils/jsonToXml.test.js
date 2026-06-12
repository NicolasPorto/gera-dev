import { describe, it, expect } from "vitest";
import { jsonToXml } from "./jsonToXml";
import { xmlToJson } from "./xmlToJson";

describe("jsonToXml", () => {
  it("usa a chave única como raiz e converte @attr", () => {
    const xml = jsonToXml('{ "pessoa": { "@id": "1", "nome": "Maria" } }');
    expect(xml).toContain('<pessoa id="1">');
    expect(xml).toContain("<nome>Maria</nome>");
  });

  it("arrays viram elementos repetidos", () => {
    const xml = jsonToXml('{ "lista": { "item": ["a", "b"] } }');
    expect(xml).toContain("<item>a</item>");
    expect(xml).toContain("<item>b</item>");
  });

  it("escapa caracteres especiais", () => {
    const xml = jsonToXml('{ "a": "x < y & z" }');
    expect(xml).toContain("x &lt; y &amp; z");
  });

  it("lança erro para JSON inválido ou vazio", () => {
    expect(() => jsonToXml("{ não é json }")).toThrow();
    expect(() => jsonToXml("   ")).toThrow();
  });

  it("round-trip XML -> JSON -> XML -> JSON preserva os dados", () => {
    const original = `<pessoa id="1"><nome>Maria</nome><tags><tag>a</tag><tag>b</tag></tags></pessoa>`;
    const obj1 = xmlToJson(original);
    const xml2 = jsonToXml(JSON.stringify(obj1));
    const obj2 = xmlToJson(xml2);
    expect(obj2).toEqual(obj1);
  });
});
