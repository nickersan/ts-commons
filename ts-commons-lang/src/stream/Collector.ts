/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import { BiConsumer } from "../util/function/BiConsumer";
import { Function } from "../util/function/Function";
import { Supplier } from "../util/function/Supplier";

/**
 * A reduction operation that folds input elements into a mutable result container.
 */
export interface Collector<T, A, R>
{
  /**
   * Returns a <code>BiConsumer</code> that folds a value into a mutable result container.
   */
  readonly accumulator: BiConsumer<A, T>;

  /**
   * Returns a <code>Function</code> that performs the final transformation from the intermediate accumulation type
   * <code>A</code> to the final result type <code>R</code>.
   */
  readonly finisher: Function<A, R>;

  /**
   * Returns function that creates a new mutable result container.
   */
  readonly supplier: Supplier<A>;
}
