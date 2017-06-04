/// <reference path="../node_modules/@types/jest/index.d.ts"/>

import { Hashable, hash, HASH_TRUE, HASH_FALSE } from "../src/Hashable";

describe(
  "Hashable",
  () =>
  {
    it(
      "hash with primitives",
      () =>
      {
        expect(hash(true)).toBe(HASH_TRUE);
        expect(hash(false)).toBe(HASH_FALSE);

        expect(hash(12)).toBe(12);
        expect(hash(12.34)).toBe(12);

        expect(hash("test")).toBe(3556498);

        expect(hash({ value: "test" })).toBe(-2064553875);
        expect(hash([{ value: "test" }])).toBe(-115931499);
      }
    );
  }
);