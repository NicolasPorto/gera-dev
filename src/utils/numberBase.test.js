import { describe, it, expect } from "vitest";
import { parseInBase, toBase, convertBases } from "./numberBase";

describe("numberBase", () => {
  it("converte de decimal para todas as bases", () => {
    expect(convertBases("255", 10)).toEqual({
      bin: "11111111",
      oct: "377",
      dec: "255",
      hex: "ff",
    });
  });

  it("interpreta hexadecimal", () => {
    expect(parseInBase("ff", 16)).toBe(255n);
  });

  it("suporta números grandes (BigInt)", () => {
    const big = "123456789012345678901234567890";
    expect(toBase(parseInBase(big, 10), 10)).toBe(big);
  });

  it("trata negativos", () => {
    expect(convertBases("-10", 10).hex).toBe("-a");
  });

  it("lança erro para dígito inválido na base", () => {
    expect(() => parseInBase("2", 2)).toThrow();
  });
});
