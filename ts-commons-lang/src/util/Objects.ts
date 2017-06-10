/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import { NullOrUndefinedException } from "../NullOrUndefinedException";

/**
 * Returns <code>true</code> if the <code>value</code> is <code>null</code> or <i>undefined</i>; otherwise
 * <code>false</code>.
 */
export function isNullOrUndefined(value: any): boolean
{
  return value == null || typeof(value) === "undefined";
}

/**
 * Returns <code>true</code> if the <code>value</code> is not <code>null</code> or <i>undefined</i>; otherwise
 * <code>false</code>.
 */
export function isNotNullOrUndefined(value: any): boolean
{
  return !isNullOrUndefined(value);
}

/**
 * Checks the given <code>value</code> is not <code>null</code> or <i>undefined</i> and throws a
 * <code>NullOrUndefinedException</code> if it is.
 */
export function requireNonNullAndDefined(value: any, message?: string): void
{
  if (isNullOrUndefined(value))
  {
    throw new NullOrUndefinedException(isNotNullOrUndefined(message) ? message : "Null or undefined not allowed");
  }
}
