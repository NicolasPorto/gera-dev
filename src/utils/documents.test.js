import { describe, it, expect } from "vitest";
import {
  generateCPF,
  generateCNPJ,
  generateCNPJAlfanumerico,
  formatCPF,
  formatCNPJ,
  validateCPF,
  validateCNPJ,
  detectDocumentType,
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

describe("validação de documentos", () => {
  it("valida CPFs gerados e formatados", () => {
    for (let i = 0; i < 200; i++) {
      const cpf = generateCPF();
      expect(validateCPF(cpf).valid).toBe(true);
      expect(validateCPF(formatCPF(cpf)).valid).toBe(true);
    }
  });

  it("aponta o motivo do CPF inválido", () => {
    expect(validateCPF("").reason).toBe("empty");
    expect(validateCPF("123").reason).toBe("length");
    expect(validateCPF("111.111.111-11").reason).toBe("repeated");
    expect(validateCPF("123.456.789-00")).toMatchObject({ reason: "checkDigits", expected: "09" });
    expect(validateCPF("123a4567890").reason).toBe("chars");
  });

  it("valida CNPJ numérico e alfanumérico", () => {
    expect(validateCNPJ("11.222.333/0001-81").valid).toBe(true);
    expect(validateCNPJ("11.222.333/0001-80")).toMatchObject({ reason: "checkDigits", expected: "81" });
    // Exemplo oficial da Receita Federal para o CNPJ alfanumérico.
    expect(validateCNPJ("12.ABC.345/01DE-35")).toMatchObject({ valid: true, alphanumeric: true });
    for (let i = 0; i < 200; i++) {
      expect(validateCNPJ(generateCNPJ()).valid).toBe(true);
      expect(validateCNPJ(generateCNPJAlfanumerico()).valid).toBe(true);
    }
  });

  it("detecta o tipo pelo tamanho", () => {
    expect(detectDocumentType("123.456.789-09")).toBe("cpf");
    expect(detectDocumentType("11.222.333/0001-81")).toBe("cnpj");
    expect(detectDocumentType("12ABC34501DE35")).toBe("cnpj");
    expect(detectDocumentType("123")).toBe(null);
  });
});
