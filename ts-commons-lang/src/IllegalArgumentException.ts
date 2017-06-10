/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import {Exception} from "./Exception";

/**
 * The exception thrown when a method receives an illegal argument.
 */
export class IllegalArgumentException extends Exception
{
  /**
   * Initializes a new <code>IllegalArgumentException</code> with the <code>message</code> and optionally a
   * <code>cause</code>.
   */
  constructor(message: string, cause?: Error)
  {
    super(message, cause);
  }
}