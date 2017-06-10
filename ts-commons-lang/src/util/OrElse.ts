/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

/**
 * An interface use to make alternative operations read nicely in code.
 * <p/>
 * For example:
 * <code>
 *   object.if(X).orElse(Y);
 * </code>
 */
export interface OrElse<T>
{
  /**
   * Captures the <code>t</code>.
   */
  orElse(t: T): void;
}