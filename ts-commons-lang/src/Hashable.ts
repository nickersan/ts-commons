/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import { isArray, isBoolean, isNumber, isObject, isString } from "./util/Types"

export const HASH_FALSE = 1237;
export const HASH_TRUE = 1231;
export const HASH_OFFSET = 31;
export const BIT_MASK_32 = 0xffffffff;

/**
 * The interface implemented by classes that provide a hash.
 * <p/>
 * <strong>
 *   NOTE: when generating a hash only immutable fields should be used!  Failure to do so may bave unexpected
 *         consequences in classes that use the hash code.
 * </strong>
 */
export interface Hashable
{
  /**
   * The hash code value for the object.
   */
  readonly hashCode: number;
}

/**
 * Returns a hash of the value.
 */
export function hash(value: any): number
{
  if (value && value.hashCode)
  {
    return value.hashCode;
  }
  else if (isBoolean(value))
  {
    return value ? HASH_TRUE : HASH_FALSE;
  }
  else if (isNumber(value))
  {
    return value & BIT_MASK_32;
  }
  else if (isString(value))
  {
    let hash = 0;

    if (value.length > 0)
    {
      for (let i = 0; i < value.length; i++)
      {
        hash = (HASH_OFFSET * hash + value.charCodeAt(i)) & BIT_MASK_32;
      }
    }

    return hash;
  }
  else if (isArray(value) || isObject(value))
  {
    return hash(JSON.stringify(value));
  }
  else
  {
    return 0;
  }
}