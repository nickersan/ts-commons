/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import { Collector } from "./Collector";

/**
 * Returns a <code>Collector</code> that sums numbers.
 */
export function sum(): Collector<number, number, number>
{
  let supplier = (): number => 0;
  let accumulator = (total: number, i: number) => total + i;
  let finisher = (total: number) => total;

  return {
    supplier: supplier,
    accumulator: accumulator,
    finisher: finisher
  };
}