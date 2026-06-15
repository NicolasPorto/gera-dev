import { describe, it, expect } from "vitest";
import { findMatches, highlightSegments } from "./regexMatch";

describe("findMatches", () => {
  it("encontra múltiplos matches com flag global", () => {
    const { matches, error } = findMatches("\\d+", "g", "a1b22c333");
    expect(error).toBeNull();
    expect(matches.map((m) => m.value)).toEqual(["1", "22", "333"]);
  });

  it("captura grupos", () => {
    const { matches } = findMatches("(\\w)(\\d)", "g", "a1 b2");
    expect(matches[0].groups).toEqual(["a", "1"]);
  });

  it("retorna erro para regex inválida", () => {
    const { error } = findMatches("(", "", "abc");
    expect(error).toBeTruthy();
  });

  it("não trava em match de comprimento zero", () => {
    const { matches } = findMatches("a*", "g", "aa");
    expect(matches.length).toBeGreaterThan(0);
  });
});

describe("highlightSegments", () => {
  it("separa trechos com e sem match", () => {
    const { matches } = findMatches("\\d+", "g", "a1b");
    const segs = highlightSegments("a1b", matches);
    expect(segs).toEqual([
      { text: "a", hit: false },
      { text: "1", hit: true },
      { text: "b", hit: false },
    ]);
  });
});
