/// <reference path="../node_modules/@types/jest/index.d.ts"/>

import { Comparable, compareTo } from "../src/Comparable";

describe(
  "Comparable",
  () =>
  {
    it(
      "compareTo with Comparables",
      () =>
      {
        let comparable1: Comparable<any> = { compareTo: (other) => { return comparable1 == other ? 0 : 1 } };
        expect(compareTo(comparable1, comparable1)).toBe(0);
      }
    );
  }
);
