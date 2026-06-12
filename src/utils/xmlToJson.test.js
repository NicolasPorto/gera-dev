import { describe, it, expect } from "vitest";
import { xmlToJson } from "./xmlToJson";

describe("xmlToJson", () => {
  it("converte atributos (@) e elementos filhos", () => {
    const xml = `<pessoa id="1"><nome>Maria</nome><idade>30</idade></pessoa>`;
    expect(xmlToJson(xml)).toEqual({
      pessoa: { "@id": "1", nome: "Maria", idade: "30" },
    });
  });

  it("agrupa elementos repetidos em array", () => {
    const xml = `<lista><item>a</item><item>b</item></lista>`;
    expect(xmlToJson(xml)).toEqual({ lista: { item: ["a", "b"] } });
  });

  it("elemento simples vira string", () => {
    expect(xmlToJson(`<msg>oi</msg>`)).toEqual({ msg: "oi" });
  });

  it("lança erro para XML inválido ou vazio", () => {
    expect(() => xmlToJson("<a><b></a>")).toThrow();
    expect(() => xmlToJson("   ")).toThrow();
  });
});
