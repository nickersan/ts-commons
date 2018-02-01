/// <reference path="../../../node_modules/@types/jest/index.d.ts"/>

import "../../../src/extensions/Array"

import { Chain } from "../../../src/stream/chain/Chain";
import { NoopChain } from "../../../src/stream/chain/NoopChain";

describe(
  "Chain",
  () =>
  {
    it(
      "distinct",
      () =>
      {
        let distinct: Chain<number, number> = new NoopChain<number>().distinct();
        let result: number[] = [];

        for (let element of [1, 2, 3, 3, 4, 2, 5])
        {
          result.pushAll(distinct.start(element));
        }

        expect(result).toEqual([1, 2, 3, 4, 5]);
      }
    );

    it(
      "filter",
      () =>
      {
        let filter: Chain<number, number> = new NoopChain<number>().filter((i) => i % 2 == 0);
        let result: number[] = [];

        for (let element of [1, 2, 3, 4, 5, 6, 7])
        {
          result.pushAll(filter.start(element));
        }

        expect(result).toEqual([2, 4, 6]);
      }
    );

    it(
      "map",
      () =>
      {
        let map: Chain<number, string> = new NoopChain<number>().map((i) => i.toLocaleString());
        let result: string[] = [];

        for (let element of [1, 2, 3])
        {
          result.pushAll(map.start(element));
        }

        expect(result).toEqual(["1", "2", "3"]);
      }
    );

    it(
      "flatMap",
      () =>
      {
        let flatMap: Chain<number, number> = new NoopChain<number[]>().flatMap((array) => array.stream());
        let result: number[] = [];

        for (let element of [[1, 2, 3], [4, 5], [6, 7, 8, 9]])
        {
          result.pushAll(flatMap.start(element));
        }

        expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      }
    );
  }
);