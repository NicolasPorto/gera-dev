import { describe, it, expect } from "vitest";
import { buildPixPayload, crc16, normalizePixKey, formatAmount, validatePixInput } from "./pix";

describe("pix", () => {
  it("reproduz o exemplo do manual do BR Code (Banco Central)", () => {
    const payload = buildPixPayload({
      key: "123e4567-e12b-12d1-a456-426655440000",
      name: "Fulano de Tal",
      city: "BRASILIA",
    });
    expect(payload).toBe(
      "00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266554400005204000053039865802BR5913Fulano de Tal6008BRASILIA62070503***63041D3D",
    );
  });

  it("o CRC final confere com o resto do payload", () => {
    const p = buildPixPayload({ key: "dev@geradev.com.br", name: "José", city: "São Paulo", amount: "10,5", txid: "PEDIDO-42" });
    expect(crc16(p.slice(0, -4))).toBe(p.slice(-4));
    expect(p).toContain("540510.50");
    expect(p).toContain("5904Jose");
    expect(p).toContain("6009Sao Paulo");
    expect(p).toContain("0508PEDIDO42");
  });

  it("normaliza os tipos de chave", () => {
    expect(normalizePixKey("Dev@GeraDev.com.br")).toEqual({ type: "email", value: "dev@geradev.com.br" });
    expect(normalizePixKey("123.456.789-09")).toEqual({ type: "cpf", value: "12345678909" });
    expect(normalizePixKey("11.222.333/0001-81")).toEqual({ type: "cnpj", value: "11222333000181" });
    expect(normalizePixKey("(11) 98765-4321")).toEqual({ type: "phone", value: "+5511987654321" });
    expect(normalizePixKey("+55 11 98765-4321")).toEqual({ type: "phone", value: "+5511987654321" });
  });

  it("formata valor e valida campos obrigatórios", () => {
    expect(formatAmount("")).toBe("");
    expect(formatAmount("0")).toBe("");
    expect(formatAmount("1234,5")).toBe("1234.50");
    expect(validatePixInput({ key: "", name: "", city: "" })).toEqual(["PixErroChave", "PixErroNome", "PixErroCidade"]);
    expect(validatePixInput({ key: "a@b.co", name: "A", city: "B" })).toEqual([]);
  });
});
