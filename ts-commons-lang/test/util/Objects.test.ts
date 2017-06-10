/// <reference path="../../node_modules/@types/jest/index.d.ts"/>

import { requireNonNullAndDefined, isNotNullOrUndefined, isNullOrUndefined } from "../../src/util/Objects";

describe(
  "Objects",
  () =>
  {
    it(
      "isNullOrUndefined",
      () =>
      {
        expect(isNullOrUndefined({})).toBe(false);
        expect(isNullOrUndefined(null)).toBe(true);
        expect(isNullOrUndefined(undefined)).toBe(true);
      }
    );

    it(
      "isNotNullOrUndefined",
      () =>
      {
        expect(isNotNullOrUndefined({})).toBe(true);
        expect(isNotNullOrUndefined(null)).toBe(false);
        expect(isNotNullOrUndefined(undefined)).toBe(false);
      }
    );

    it(
      "requireNonNullAndDefined",
      () =>
      {
        expect(() => { requireNonNullAndDefined({}, "test") });
        expect(() => { requireNonNullAndDefined(null, "test") }).toThrow("test");
        expect(() => { requireNonNullAndDefined(undefined, "test") }).toThrow("test");
      }
    );
  }
);