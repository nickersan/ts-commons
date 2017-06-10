/// <reference path="../../node_modules/@types/jest/index.d.ts"/>

import "../../src/extensions/String";

describe(
  "String (extensions)",
  () =>
  {
    it(
      "contains",
      () =>
      {
        expect("abc def abc def abc".contains("abc")).toBe(true);
        expect("abc def abc def abc".contains("def")).toBe(true);
        expect("abc def abc def abc".contains("xzy")).toBe(false);
      }
    );

    it(
      "indexOfNth",
      () =>
      {
        expect("abc def abc def abc".indexOfNth("abc", 0)).toBe(0);
        expect("abc def abc def abc".indexOfNth("abc", 1)).toBe(8);
        expect("abc def abc def abc".indexOfNth("abc", 2)).toBe(16);
        expect("abc def abc def abc".indexOfNth("abc", 3)).toBe(-1);
        expect("abc def abc def abc".indexOfNth("bcd", 1)).toBe(-1);
        expect("abc def abc def abc".indexOfNth("xzy", 1)).toBe(-1);
      }
    );

    it(
      "startsWith",
      () =>
      {
        expect("abcdef".startsWith("abc")).toBe(true);
        expect("abcdef".startsWith("bcd")).toBe(false);
        expect("abcdef".startsWith("xyz")).toBe(false);
      }
    );
  }
);
