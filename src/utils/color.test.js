import { describe, it, expect } from "vitest";
import { normalizeHex, hexToRgb, rgbToHsl } from "./color";

describe("color", () => {
  it("normaliza hex (#rgb, sem #, maiúsculas) e rejeita inválidos", () => {
    expect(normalizeHex("#FFF")).toBe("#ffffff");
    expect(normalizeHex("6a0dad")).toBe("#6a0dad");
    expect(normalizeHex("#6A0DAD")).toBe("#6a0dad");
    expect(normalizeHex("xyz")).toBeNull();
    expect(normalizeHex("#1234")).toBeNull();
  });

  it("converte hex -> rgb", () => {
    expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb("#6a0dad")).toEqual({ r: 106, g: 13, b: 173 });
  });

  it("converte rgb -> hsl", () => {
    expect(rgbToHsl({ r: 0, g: 0, b: 0 })).toEqual({ h: 0, s: 0, l: 0 });
    expect(rgbToHsl({ r: 255, g: 255, b: 255 })).toEqual({ h: 0, s: 0, l: 100 });
    expect(rgbToHsl({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 100, l: 50 });
    expect(rgbToHsl({ r: 0, g: 255, b: 0 })).toEqual({ h: 120, s: 100, l: 50 });
    expect(rgbToHsl({ r: 0, g: 0, b: 255 })).toEqual({ h: 240, s: 100, l: 50 });
  });
});
