import { describe, it, expect } from "vitest";
import {
  generateName,
  generateEmail,
  generateLocation,
  generatePhone,
  STATES,
} from "./person";

const stateByUf = Object.fromEntries(STATES.map((s) => [s.uf, s]));
const hasNonAscii = (s) => [...s].some((ch) => ch.charCodeAt(0) > 127);

describe("person", () => {
  it("nome tem dois sobrenomes distintos e fullName coerente", () => {
    for (let i = 0; i < 200; i++) {
      const n = generateName();
      expect(n.surnames).toHaveLength(2);
      expect(n.surnames[0]).not.toBe(n.surnames[1]);
      expect(n.fullName).toBe(
        `${n.firstName} ${n.surnames[0]} ${n.surnames[1]}`,
      );
      expect(["M", "F"]).toContain(n.gender);
    }
  });

  it("email sem acentos e em formato válido", () => {
    for (let i = 0; i < 300; i++) {
      const e = generateEmail(generateName());
      expect(/^[a-z0-9._]+@[a-z0-9.]+$/.test(e)).toBe(true);
      expect(hasNonAscii(e)).toBe(false);
    }
  });

  it("localização geograficamente coerente (cidade/UF/DDD/CEP)", () => {
    for (let i = 0; i < 300; i++) {
      const loc = generateLocation();
      const st = stateByUf[loc.state];
      expect(st).toBeTruthy();
      expect(st.cities).toContain(loc.city);
      expect(st.ddd).toContain(loc.ddd);
      expect(loc.zipCode.startsWith(st.cep)).toBe(true);
      expect(/^\d{5}-\d{3}$/.test(loc.zipCode)).toBe(true);
    }
  });

  it("telefone é celular válido com o DDD informado", () => {
    expect(/^\(11\) 9\d{4}-\d{4}$/.test(generatePhone("11"))).toBe(true);
  });
});
