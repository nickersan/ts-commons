/// <reference path="../../node_modules/@types/jest/index.d.ts"/>

import { ArrayStream } from "../../src/stream/ArrayStream";

describe(
  "ArrayStream",
  () =>
  {
    it(
      "distinct",
      () =>
      {
        expect(ArrayStream.of<number>([1, 2, 2, 3, 4, 5, 4]).distinct.toArray).toEqual([1, 2, 3, 4, 5]);
      }
    );

    it(
      "first",
      () =>
      {
        expect(ArrayStream.of<number>([1, 2, 3]).first.value).toEqual(1);
      }
    );

    it(
      "allMatch",
      () =>
      {
        expect(ArrayStream.of<number>([1, 1, 1]).allMatch((number) => number == 1)).toBe(true);
        expect(ArrayStream.of<number>([1, 2, 1]).allMatch((number) => number == 1)).toBe(false);
      }
    );

    it(
      "anyMatch",
      () =>
      {
        expect(ArrayStream.of<number>([1, 2, 1]).anyMatch((number) => number == 2)).toBe(true);
        expect(ArrayStream.of<number>([1, 1, 1]).anyMatch((number) => number == 2)).toBe(false);
      }
    );

    it(
      "collect",
      () =>
      {
        let results = {};
        let result = 6;

        let supplier = jest.fn();
        supplier.mockReturnValueOnce(results);

        let accumulator = jest.fn();

        let finisher = jest.fn();
        finisher.mockReturnValueOnce(result);

        let collector = { supplier: supplier, accumulator: accumulator, finisher: finisher };

        expect(ArrayStream.of<number>([1, 2, 3]).collect(collector)).toBe(result);

        expect(supplier).toHaveBeenCalledTimes(1);
        expect(accumulator).toBeCalledWith(results, 1);
        expect(accumulator).toBeCalledWith(results, 2);
        expect(accumulator).toBeCalledWith(results, 3);
        expect(finisher).toBeCalledWith(results);
      }
    );

    it(
      "filter",
      () =>
      {
        expect(ArrayStream.of<number>([1, 2, 3, 4, 5, 6]).filter((number) => number % 2 == 0).toArray).toEqual([2, 4, 6]);
      }
    );

    it(
      "flatMap",
      () =>
      {
        expect(ArrayStream.of<number[]>([[1, 2], [3, 4, 5], [6]]).flatMap((array) => ArrayStream.of(array)).toArray).toEqual([1, 2, 3, 4, 5, 6]);
      }
    );

    it(
      "forEach",
      () =>
      {
        let consumer = jest.fn();

        ArrayStream.of<number>([1, 2, 3]).forEach(consumer);

        expect(consumer).toBeCalledWith(1);
        expect(consumer).toBeCalledWith(2);
        expect(consumer).toBeCalledWith(3);
      }
    );
  }
);
