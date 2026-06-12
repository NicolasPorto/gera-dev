import { describe, it, expect } from "vitest";
import {
  generateCPF,
  generateCNPJ,
  generateCNPJAlfanumerico,
  formatCPF,
  formatCNPJ,
} from "./documents";

function isValidCPF(cpf) {
  if (!/^\d{11}$/.test(cpf)) return false;
  const d = cpf.split("").map(Number);
  const calc = (n) => {
    let sum = 0;
    for (let i = 0; i < n; i++) sum += d[i] * (n + 1 - i);
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };
  return d[9] === calc(9) && d[10] === calc(10);
}

function isValidCNPJ(cnpj) {
  if (!/^\d{14}$/.test(cnpj)) return false;
  const d = cnpj.split("").map(Number);
  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const calc = (len, w) => {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += d[i] * w[i];
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };
  return d[12] === calc(12, w1) && d[13] === calc(13, w2);
}

describe("documents", () => {
  it("gera CPFs com dígitos verificadores válidos", () => {
    for (let i = 0; i < 500; i++) {
      expect(isValidCPF(generateCPF())).toBe(true);
    }
  });

  it("gera CNPJs com dígitos verificadores válidos", () => {
    for (let i = 0; i < 500; i++) {
      expect(isValidCNPJ(generateCNPJ())).toBe(true);
    }
  });

  it("gera CNPJ alfanumérico no formato esperado", () => {
    for (let i = 0; i < 100; i++) {
      const c = generateCNPJAlfanumerico();
      expect(c).toHaveLength(14);
      expect(/^[0-9A-Z]{12}\d{2}$/.test(c)).toBe(true);
    }
  });

  it("formata CPF e CNPJ", () => {
    expect(formatCPF("12345678909")).toBe("123.456.789-09");
    expect(formatCNPJ("11222333000181")).toBe("11.222.333/0001-81");
  });
});
