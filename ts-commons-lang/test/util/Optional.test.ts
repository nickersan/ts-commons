/// <reference path="../../node_modules/@types/jest/index.d.ts"/>

import { Optional } from "../../src/util/Optional";

describe(
  "Optional",
  () =>
  {
    it(
      "of",
      () =>
      {
        let other = "other";
        let value = "test";
        let optional = Optional.of(value);

        expect(optional.present).toBe(true);
        expect(optional.value).toBe(value);
        expect(optional.orElse(other)).toBe(value);
        expect(optional.orElseGet(() => other)).toBe(value);
        expect(optional.orElseThrow(() => "Uh oh")).toBe(value);
        expect(optional.equals(Optional.of(value))).toBe(true);
        expect(optional.equals(Optional.of(other))).toBe(false);
        expect(optional.equals(Optional.empty<string>())).toBe(false);
        expect(optional.hashCode).toBe(3556498);

        const consumer1 = jest.fn();
        const operator1 = jest.fn();
        optional.ifPresent(consumer1).orElse(operator1);
        expect(consumer1).toBeCalledWith(value);
        expect(operator1).not.toBeCalled();

        const operator2 = jest.fn();
        const consumer2 = jest.fn();
        optional.ifNotPresent(operator2).orElse(consumer2);
        expect(operator2).not.toBeCalled();
        expect(consumer2).toBeCalledWith(value);

        expect(() => { Optional.of(null) }).toThrow("Value cannot be null or undefined");
        expect(() => { Optional.of(undefined) }).toThrow("Value cannot be null or undefined");
      }
    );

    it(
      "empty",
      () =>
      {
        let other = "other";
        let optional = Optional.empty();

        expect(optional.present).toBe(false);
        expect(() => optional.value).toThrow("No value present");
        expect(optional.orElse(other)).toBe(other);
        expect(optional.orElseGet(() => other)).toBe(other);
        expect(() => optional.orElseThrow(() => "Uh oh")).toThrow("Uh oh");
        expect(optional.equals(Optional.empty())).toBe(true);
        expect(optional.equals(Optional.of(other))).toBe(false);
        expect(optional.hashCode).toBe(0);

        const consumer1 = jest.fn();
        const operator1 = jest.fn();
        optional.ifPresent(consumer1).orElse(operator1);
        expect(consumer1).not.toBeCalledWith();
        expect(operator1).toBeCalled();

        const operator2 = jest.fn();
        const consumer2 = jest.fn();
        optional.ifNotPresent(operator2).orElse(consumer2);
        expect(operator2).toBeCalled();
        expect(consumer2).not.toBeCalledWith();
      }
    );

    it(
      "ofNullable",
      () =>
      {
        expect(Optional.ofNullable(null).present).toBe(false);
        expect(Optional.ofNullable(undefined).present).toBe(false);
      }
    );

    it(
      "map",
      () =>
      {
        let toLocaleString = (i) => i.toLocaleString();

        expect(Optional.of(1).map(toLocaleString).value).toBe("1");
        expect(Optional.empty().map(toLocaleString).present).toBe(false);
      }
    );
  }
);