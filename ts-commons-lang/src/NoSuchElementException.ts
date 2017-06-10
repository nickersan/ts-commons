/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import {Exception} from "./Exception";

/**
 * The exception thrown by various accessor methods to indicate that the element being requested does not exist.
 */
export class NoSuchElementException extends Exception
{
  /**
   * Initializes a new <code>NoSuchElementException</code> with the <code>message</code> and optionally a
   * <code>cause</code>.
   */
  constructor(message: string, cause?: Error)
  {
    super(message, cause);
  }
}