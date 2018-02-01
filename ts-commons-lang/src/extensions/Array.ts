/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 */

import { ArrayStream } from "../stream/ArrayStream";
import { Stream } from "../stream/Stream";

/**
 * Extensions to the standard <code>Array</code> class.
 */
interface Array<T>
{
  /**
   * Pushes all the <code>elements</code> into this array.
   */
  pushAll(elements: T[]): void;

  /**
   * Returns this array as a <code>Stream</code>.
   */
  stream(): Stream<T>;
}

if (!Array.prototype.pushAll)
{
  Array.prototype.pushAll = function(elements: any[])
  {
    elements.forEach((e) => this.push(e));
  }
}

if (!Array.prototype.stream)
{
  Array.prototype.stream = function()
  {
    return new ArrayStream<any>(this);
  }
}