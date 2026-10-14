import { describe, it, expect } from "vitest";
import { textStats, topWords, formatDuration, countGraphemes } from "./textStats";

describe("textStats", () => {
  it("texto vazio zera tudo", () => {
    expect(textStats("")).toMatchObject({ characters: 0, words: 0, lines: 0, paragraphs: 0, sentences: 0, bytes: 0 });
  });

  it("conta caracteres, palavras, linhas e parágrafos", () => {
    const s = textStats("Olá mundo. Tudo bem?\n\nSegundo parágrafo!");
    expect(s.words).toBe(6);
    expect(s.sentences).toBe(3);
    expect(s.paragraphs).toBe(2);
    expect(s.lines).toBe(3);
    expect(s.characters).toBe(40);
    expect(s.bytes).toBe(42); // cada "á" ocupa 2 bytes em UTF-8
  });

  it("emoji compostos contam como 1 caractere", () => {
    expect(countGraphemes("👍🏽ok")).toBe(3);
  });

  it("palavras mais frequentes ignoram termos curtos", () => {
    expect(topWords("o dev e o Dev e a API api API", 2)).toEqual([
      { word: "api", count: 3 },
      { word: "dev", count: 2 },
    ]);
  });

  it("formata duração", () => {
    expect(formatDuration(45)).toBe("45 s");
    expect(formatDuration(120)).toBe("2 min");
    expect(formatDuration(150)).toBe("2 min 30 s");
  });
});
