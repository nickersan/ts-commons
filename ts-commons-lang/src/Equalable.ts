/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

/**
 * The interface implemented by classes that can have their instances compared for <i>equality</code>.
 */
export interface Equalable<T>
{
  /**
   * Returns <code>true</code> if this <code>Equalable</code> is considered <i>semantically-equal</i> to the
   * <code>other</code>.
   */
  equals(other: T): boolean;
}

/**
 * Returns <code>true</code> if the <code>left</code> and <code>right</code> arguments are <i>equal</i> - this method
 * check for an <code>equals</code> method and use it if present; otherwise the arguments are compared with
 * <code>==</code>.
 */
export function eq(left: any, right: any): boolean
{
  return left && left.equals ? left.equals(right) : left == right;
}
