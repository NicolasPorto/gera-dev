import { describe, it, expect } from "vitest";
import { diffLines } from "./lineDiff";

describe("diffLines", () => {
  it("detecta linhas iguais", () => {
    expect(diffLines("a\nb", "a\nb")).toEqual([
      { type: "equal", value: "a" },
      { type: "equal", value: "b" },
    ]);
  });

  it("detecta adição e remoção", () => {
    const d = diffLines("a\nb\nc", "a\nx\nc");
    expect(d).toEqual([
      { type: "equal", value: "a" },
      { type: "remove", value: "b" },
      { type: "add", value: "x" },
      { type: "equal", value: "c" },
    ]);
  });

  it("conta linhas só no segundo texto como adição", () => {
    const d = diffLines("a", "a\nb");
    expect(d).toEqual([
      { type: "equal", value: "a" },
      { type: "add", value: "b" },
    ]);
  });
});
