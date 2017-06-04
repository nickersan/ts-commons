/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import { Equalable, eq } from "../Equalable";
import { hash, Hashable } from "../Hashable";
import { Consumer } from "./function/Consumer";

/**
 * A container object which may or may not contain a non-null value.
 */
export class Optional<T> implements Equalable<Optional<T>>, Hashable
{
  /**
   * Initializes a new <code>Optional</code> with the <code>value</code>
   */
  private constructor(private _value: T) {};

  /**
   * Returns the <code>value</code> if present; otherwise throws an error.
   */
  get value(): T
  {
    if (this.present)
    {
      return this._value;
    }
    else
    {
      throw "No value present";
    }
  }

  /**
   * Returns the hash code value.
   */
  get hashCode(): number
  {
    return hash(this._value);
  }

  /**
   * Returns <code>true</code> if a <code>value</code> is present; otherwise <code>false</code>.
   */
  get present(): boolean
  {
    return this._value != undefined && this._value != null;
  }

  /**
   * Returns an empty Optional instance. No value is present for this Optional.
   */
  public static empty<T>(): Optional<T>
  {
    return new Optional<T>(undefined);
  }

  /**
   * Indicates whether some other object is "equal to" this <code>Optional</code>.
   *
   * The other object is considered equal if:
   *
   * <ul>
   *   <li>it is also an Optional and;</li>
   *   <li>both instances have no value present or;</li>
   *   <li>the present values are "equal to" each other via equals().</li>
   * </ul>
   */
  public equals(other: Optional<T>): boolean
  {
    return eq(this._value, other._value);
  }

  /**
   * Have the specified consumer accept the value if a value is present, otherwise do nothing.
   */
  public ifPresent(consumer: Consumer<T>): void
  {
    if (this.present)
    {
      consumer(this._value);
    }
  }

  /**
   * Return an Optional with the specified present value.
   */
  public static of<T>(value: T): Optional<T>
  {
    return new Optional<T>(value);
  }
}