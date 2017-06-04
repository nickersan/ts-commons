/// <reference path="../node_modules/@types/jest/index.d.ts"/>

import { Equalable, eq } from "../src/Equalable";

describe(
  "Equalable",
  () =>
  {
    it(
      "eq with primitives",
      () =>
      {
        expect(eq(true, true)).toBe(true);
        expect(eq(true, false)).toBe(false);

        expect(eq(1, 1)).toBe(true);
        expect(eq(1, 2)).toBe(false);

        expect(eq("Same", "Same")).toBe(true);
        expect(eq("Same", "Different")).toBe(false);
      }
    );

    it(
      "eq with Equalables",
      () =>
      {
        let equalable1: Equalable<any> = { equals: (other) => { return equalable1 == other } };
        expect(eq(equalable1, equalable1)).toBe(true);

        let equalable2: Equalable<any> = { equals: (other) => { return equalable2 == other } };
        expect(eq(equalable1, equalable2)).toBe(false);
        expect(eq(equalable2, equalable1)).toBe(false);
      }
    );
  }
);
