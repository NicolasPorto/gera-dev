import { describe, it, expect } from "vitest";
import { generatePassword, poolSize, strengthLevel } from "./password";

const ALL = { uppercase: true, lowercase: true, numbers: true, symbols: true };

describe("password", () => {
  it("respeita o comprimento", () => {
    for (const len of [6, 12, 30, 64]) {
      expect(generatePassword(ALL, len)).toHaveLength(len);
    }
  });

  it("inclui ao menos um de cada tipo selecionado", () => {
    for (let i = 0; i < 200; i++) {
      const pw = generatePassword(ALL, 16);
      expect(/[A-Z]/.test(pw)).toBe(true);
      expect(/[a-z]/.test(pw)).toBe(true);
      expect(/[0-9]/.test(pw)).toBe(true);
      expect(/[^A-Za-z0-9]/.test(pw)).toBe(true);
    }
  });

  it("retorna null sem nenhum tipo selecionado", () => {
    expect(
      generatePassword(
        { uppercase: false, lowercase: false, numbers: false, symbols: false },
        12,
      ),
    ).toBeNull();
  });

  it("força cresce com entropia (comprimento × alfabeto)", () => {
    const pool = poolSize(ALL);
    expect(strengthLevel(6, 26)).toBeLessThan(strengthLevel(20, pool));
    expect(strengthLevel(20, pool)).toBe(6);
    expect(strengthLevel(0, 0)).toBe(0);
  });
});
