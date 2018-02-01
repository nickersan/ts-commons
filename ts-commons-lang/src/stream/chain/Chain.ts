/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import { Function } from "../../util/function/Function";
import { Predicate } from "../../util/function/Predicate";
import { Stream } from "../Stream";

/**
 * The interface to an object that performs a chain of operations on an element.
 */
export interface Chain<T, R>
{
  /**
   * Evaluates the given <code>element</code>.
   */
  start(element: T): R[];

  /**
   * Returns a <code>Chain</code> that performs a <i>distinct</i> operation.
   */
  distinct(): Chain<R, R>;

  /**
   * Returns a <code>Chain</code> that <i>filters</i> using the <code>predicate</code>.
   */
  filter(predicate: Predicate<R>): Chain<R, R>;

  /**
   * Returns a <code>Chain</code> that <i>flat-maps</i> using the <code>mapper</code>.
   */
  flatMap<R1>(mapper: Function<R, Stream<R1>>): Chain<R, R1>;

  /**
   * Returns a <code>Chain</code> that <i>maps</i> using the <code>mapper</code>.
   */
  map<R1>(mapper: Function<R, R1>): Chain<R, R1>;
}


