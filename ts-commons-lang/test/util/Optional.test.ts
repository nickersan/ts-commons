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
        let value = "test";
        let optional = Optional.of(value);

        expect(optional.present).toBe(true);
        expect(optional.value).toBe(value);
        expect(optional.equals(Optional.of(value))).toBe(true);
        expect(optional.equals(Optional.of("other"))).toBe(false);
        expect(optional.equals(Optional.empty<string>())).toBe(false);
        expect(optional.hashCode).toBe(3556498);

        const consumer = jest.fn();
        optional.ifPresent(consumer);
        expect(consumer).toBeCalledWith(value);
      }
    );

    it(
      "empty",
      () =>
      {
        let optional = Optional.empty();

        expect(optional.present).toBe(false);
        expect(() => optional.value).toThrow("No value present");
        expect(optional.equals(Optional.empty())).toBe(true);
        expect(optional.equals(Optional.of("other"))).toBe(false);
        expect(optional.hashCode).toBe(0);

        const consumer = jest.fn();
        optional.ifPresent(consumer);
        expect(consumer).not.toBeCalled();
      }
    );
  }
);