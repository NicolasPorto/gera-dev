import { describe, it, expect } from "vitest";
import { cronParse } from "./cronExplain";

describe("cronParse", () => {
  it("parseia uma expressão válida com step e range", () => {
    const r = cronParse("*/5 0 * * 1-5");
    expect(r.valid).toBe(true);
    expect(r.fields[0].parts).toEqual([{ type: "step", n: 5 }]);
    expect(r.fields[1].parts).toEqual([{ type: "value", v: 0 }]);
    expect(r.fields[4].parts).toEqual([{ type: "range", a: 1, b: 5 }]);
  });

  it("aceita listas", () => {
    const r = cronParse("0,30 * * * *");
    expect(r.fields[0].parts).toEqual([
      { type: "value", v: 0 },
      { type: "value", v: 30 },
    ]);
  });

  it("rejeita número de campos errado", () => {
    expect(cronParse("* * * *").valid).toBe(false);
  });

  it("rejeita valor fora do intervalo", () => {
    expect(cronParse("60 * * * *").valid).toBe(false);
  });
});
