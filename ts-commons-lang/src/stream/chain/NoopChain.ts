/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import { AbstractChain } from "./AbstractChain";

/**
 * An implementation of <code>Chain</code> that performs no-operation on any <code>element</code> it receives.
 */
export class NoopChain<T> extends AbstractChain<T, T>
{
  /**
   * Performs no evaluation, simply passes the <code>element</code> down the chain.
   */
  public evaluate(element: T): T[]
  {
    return this.evaluateNextOr(element);
  }
}
