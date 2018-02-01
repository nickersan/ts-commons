/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import "./extensions/String"

/**
 * A specialization of <code>Error</code> that allows exception chaining.
 */
export class Exception extends Error
{
  private _cause?: Error;

  /**
   * Initializes a new <code>Exception</code> with the <code>message</code> and optionally a <code>cause</code>.
   */
  constructor(message: string, cause?: Error)
  {
    super(message);
    this._cause = cause;
  }

  /**
   * Returns the cause.
   */
  get cause()
  {
    return this._cause;
  }

  /**
   * Returns a <code>string</code> representation of this <code>Exception</code>.
   */
  public toString(): string
  {
    let s = this.stack;
    s = this.constructor.name + ": " + this.message + "\n    " + s.substr(s.indexOfNth("at", 1));

    if (this._cause)
    {
      s += "\nCaused by: " + this._cause.toString();
    }

    return s;
  }
}