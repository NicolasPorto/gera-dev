import { describe, it, expect } from "vitest";
import { csvToJson, jsonToCsv } from "./csvJson";

describe("csvToJson", () => {
  it("converte CSV simples em array de objetos", () => {
    const csv = "nome,idade\nMaria,30\nJoão,25";
    expect(csvToJson(csv)).toEqual([
      { nome: "Maria", idade: "30" },
      { nome: "João", idade: "25" },
    ]);
  });

  it("respeita aspas, vírgulas e quebras dentro de campos", () => {
    const csv = 'nome,obs\n"Silva, Maria","linha1\nlinha2"\n"Aspas ""x""",ok';
    expect(csvToJson(csv)).toEqual([
      { nome: "Silva, Maria", obs: "linha1\nlinha2" },
      { nome: 'Aspas "x"', obs: "ok" },
    ]);
  });

  it("lança erro para CSV vazio", () => {
    expect(() => csvToJson("   ")).toThrow();
  });
});

describe("jsonToCsv", () => {
  it("converte array de objetos em CSV", () => {
    const json = JSON.stringify([
      { nome: "Maria", idade: 30 },
      { nome: "João", idade: 25 },
    ]);
    expect(jsonToCsv(json)).toBe("nome,idade\nMaria,30\nJoão,25");
  });

  it("escapa campos com vírgula/aspas e une chaves de objetos diferentes", () => {
    const json = JSON.stringify([{ a: "x,y" }, { b: 'z"w' }]);
    expect(jsonToCsv(json)).toBe('a,b\n"x,y",\n,"z""w"');
  });

  it("round-trip csv -> json -> csv", () => {
    const csv = "nome,idade\nMaria,30\nJoão,25";
    expect(jsonToCsv(JSON.stringify(csvToJson(csv)))).toBe(csv);
  });

  it("lança erro para JSON inválido", () => {
    expect(() => jsonToCsv("{ não é json")).toThrow();
  });
});
