/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import {Exception} from "./Exception";

/**
 * The exception thrown to indicate that an index of some sort is out of range.
 */
export class IndexOutOfBoundsException extends Exception
{
  /**
   * Initializes a new <code>IndexOutOfBoundsException</code> with the <code>message</code> and optionally a
   * <code>cause</code>.
   */
  constructor(message: string, cause?: Error)
  {
    super(message, cause);
  }
}