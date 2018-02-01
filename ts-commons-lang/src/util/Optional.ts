/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import { Consumer } from "./function/Consumer";
import { Equalable, eq } from "../Equalable";
import { Function } from "./function/Function";
import { hash, Hashable } from "../Hashable";
import { NoSuchElementException } from "../NoSuchElementException";
import { Operator } from "./function/Operator";
import { OrElse } from "./OrElse";
import { requireNonNullAndDefined} from "./Objects";
import { Supplier } from "./function/Supplier";

/**
 * A container object which may or may not contain a non-null value.
 */
export class Optional<T> implements Equalable<Optional<T>>, Hashable
{
  private _value: T;

  /**
   * Initializes a new <code>Optional</code> with the <code>value</code>
   */
  private constructor(value: T)
  {
    this._value = value;
  };

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
      throw new NoSuchElementException("No value present");
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
  public ifPresent(consumer: Consumer<T>): OrElse<Operator>
  {
    if (this.present)
    {
      consumer(this._value);
      return { orElse: () => {} };
    }
    else
    {
      return { orElse: (operator: Operator) => { operator(); } };
    }
  }

  /**
   * Have the specified consumer accept the value if a value is present, otherwise do nothing.
   */
  public ifNotPresent(operator: Operator): OrElse<Consumer<T>>
  {
    if (!this.present)
    {
      operator();
      return { orElse: () => {} };
    }
    else
    {
      let value: T = this.value;
      return { orElse: (consumer: Consumer<T>): void => consumer(value) };
    }
  }

  /**
   * Returns an Optional with the specified present value.
   *
   * @throws error if the <code>value</code> is <code>null</code>.
   */
  public static of<T>(value: T): Optional<T>
  {
    requireNonNullAndDefined(value, "Value cannot be null or undefined");
    return new Optional<T>(value);
  }

  /**
   * Returns an Optional with the specified present value.
   */
  public static ofNullable<T>(value: T): Optional<T>
  {
    return new Optional<T>(value);
  }

  /**
   * Returns the value if present, otherwise returns the <code>other</code>.
   */
  public orElse(other: T): T
  {
    return this.present ? this._value : other;
  }

  /**
   * Returns the value if present, otherwise returns the <code>other</code>.
   */
  public orElseGet(other: Supplier<T>): T
  {
    return this.present ? this._value : other();
  }

  /**
   * Returns the value if present, otherwise returns the <code>other</code>.
   */
  public orElseThrow(errorSupplier: Supplier<string>): T
  {
    if (this.present)
    {
      return this._value
    }
    else
    {
      throw errorSupplier();
    }
  }

  /**
   * Returns the result of applying the <code>mapper</code> to the value if present, otherwise returns an <i>empty</i>
   * <code>Optional</code>.
   */
  public map<R>(mapper: Function<T, R>): Optional<R>
  {
    return this.present ? Optional.ofNullable<R>(mapper(this.value)) : Optional.empty<R>();
  }
}