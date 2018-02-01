/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import {IllegalArgumentException} from "./IllegalArgumentException";
/**
 * The interface implemented by classes that can have their instances compared for <i>order</code>.
 */
export interface Comparable<T>
{
  /**
   * Compares this object with the <code>other</code> for order.
   */
  compareTo(other: T): number;
}

/**
 * Returns <code>true</code> if the <code>left</code> and <code>right</code> arguments are <i>equal</i> - this method
 * check for an <code>equals</code> method and use it if present; otherwise the arguments are compared with
 * <code>==</code>.
 */
export function compareTo(left: any, right: any): number
{
  if (left && left.compareTo)
  {
    return left.compareTo(right);
  }
  else
  {
    throw new IllegalArgumentException("Objects must implement compareTo");
  }
}
