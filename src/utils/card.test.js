import { describe, it, expect } from "vitest";
import { BRANDS, luhnValid, luhnCheckDigit, detectBrand, generateCard, formatCardNumber } from "./card";

describe("cartão de teste (Luhn)", () => {
  it("valida números de teste conhecidos", () => {
    expect(luhnValid("4242 4242 4242 4242")).toBe(true); // Stripe
    expect(luhnValid("5555555555554444")).toBe(true);
    expect(luhnValid("378282246310005")).toBe(true);
    expect(luhnValid("4242424242424241")).toBe(false);
    expect(luhnCheckDigit("424242424242424")).toBe(2);
  });

  it("detecta a bandeira pelo prefixo mais específico", () => {
    expect(detectBrand("4242424242424242")).toBe("visa");
    expect(detectBrand("5555555555554444")).toBe("mastercard");
    expect(detectBrand("2221000000000009")).toBe("mastercard");
    expect(detectBrand("378282246310005")).toBe("amex");
    expect(detectBrand("6362970000457013")).toBe("elo");
    expect(detectBrand("6062825624254001")).toBe("hipercard");
    expect(detectBrand("1234")).toBe(null);
  });

  it("gera cartões válidos e da bandeira pedida", () => {
    for (const id of Object.keys(BRANDS)) {
      for (let i = 0; i < 50; i++) {
        const card = generateCard(id, new Date(2026, 0, 1));
        expect(card.number).toHaveLength(BRANDS[id].length);
        expect(luhnValid(card.number)).toBe(true);
        expect(detectBrand(card.number)).toBe(id);
        expect(card.cvv).toHaveLength(BRANDS[id].cvv);
        expect(card.expiry).toMatch(/^(0[1-9]|1[0-2])\/(2[7-9]|3[01])$/);
      }
    }
  });

  it("agrupa os dígitos por bandeira", () => {
    expect(formatCardNumber("4242424242424242")).toBe("4242 4242 4242 4242");
    expect(formatCardNumber("378282246310005")).toBe("3782 822463 10005");
  });
});
