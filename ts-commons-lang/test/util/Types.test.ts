/// <reference path="../../node_modules/@types/jest/index.d.ts"/>

import { Optional } from "../../src/util/Optional";
import { isArray, isBoolean, isNumber, isObject, isString } from "../../src/util/Types";

describe(
  "Types",
  () =>
  {
    it(
      "isArray",
      () =>
      {
        expect(isArray([])).toBe(true);
        expect(isArray([1, 2, 3])).toBe(true);

        expect(isArray(undefined)).toBe(false);
        expect(isArray(null)).toBe(false);
        expect(isArray(true)).toBe(false);
        expect(isArray(123)).toBe(false);
        expect(isArray("test")).toBe(false);
        expect(isArray({})).toBe(false);
      }
    );

    it(
      "isBoolean",
      () =>
      {
        expect(isBoolean(true)).toBe(true);
        expect(isBoolean(false)).toBe(true);

        expect(isBoolean(undefined)).toBe(false);
        expect(isBoolean(null)).toBe(false);
        expect(isBoolean(123)).toBe(false);
        expect(isBoolean("test")).toBe(false);
        expect(isBoolean({})).toBe(false);
      }
    );

    it(
      "isNumber",
      () =>
      {
        expect(isNumber(123)).toBe(true);
        expect(isNumber(123.45)).toBe(true);

        expect(isNumber(undefined)).toBe(false);
        expect(isNumber(null)).toBe(false);
        expect(isNumber(true)).toBe(false);
        expect(isNumber(false)).toBe(false);
        expect(isNumber("test")).toBe(false);
        expect(isNumber({})).toBe(false);
      }
    );

    it(
      "isObject",
      () =>
      {
        expect(isObject({})).toBe(true);
        expect(isObject(Optional.empty())).toBe(true);

        expect(isObject(undefined)).toBe(false);
        expect(isObject(null)).toBe(false);
        expect(isObject(true)).toBe(false);
        expect(isObject(false)).toBe(false);
        expect(isObject(123)).toBe(false);
        expect(isObject("test")).toBe(false);
      }
    );

    it(
      "isString",
      () =>
      {
        expect(isString("test")).toBe(true);

        expect(isString(undefined)).toBe(false);
        expect(isString(null)).toBe(false);
        expect(isString(true)).toBe(false);
        expect(isString(false)).toBe(false);
        expect(isString(123)).toBe(false);
        expect(isString({})).toBe(false);
      }
    );
  }
);