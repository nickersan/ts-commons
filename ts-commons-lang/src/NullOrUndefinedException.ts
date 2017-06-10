/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import { Exception } from "./Exception";

/**
 * The exception thrown when a <code>null</code> or <i>undefined</i> is encountered.
 */
export class NullOrUndefinedException extends Exception
{
  /**
   * Initializes a new <code>NullOrUndefinedException</code> with the <code>message</code> and optionally a
   * <code>cause</code>.
   */
  constructor(message: string, cause?: Error)
  {
    super(message, cause);
  }
}