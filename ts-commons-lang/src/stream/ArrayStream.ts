/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import { AbstractStream } from "./AbstractStream";
import { Chain } from "./chain/Chain";
import { Consumer } from "../util/function/Consumer";
import { eq } from "../Equalable";
import { Function } from "../util/function/Function";
import { Optional } from "../util/Optional";
import { Predicate } from "../util/function/Predicate";
import { Stream } from "./Stream";
import { BiFunction } from "../util/function/BiFunction";

/**
 * An implementation of <code>Stream</code> that is based on an <i>array</i>.
 */
export class ArrayStream<T> extends AbstractStream<T>
{
  /**
   * Initializes a new <code>ArrayStream</code> with an array.
   */
  private constructor(private _array: T[], chain?: Chain<any, T>)
  {
    super(chain);
  }

  /**
   * Iterates of each element in this <code>Stream</code> invoking the <code>consumer</code> and passing the element
   * while the <code>consumer</code> returns <code>true</code>.
   */
  public forEachWhile(consumer: Function<T, boolean>): void
  {
  }

  /**
   * Returns a <code>Stream</code> consisting of the elements of this <code>Stream</code> discarding any elements after
   * the <code>maxSize</code>'th elements.
   */
  public limit(max: number): Stream<T>
  {
    return null;
  }

  /**
   * Transforms this <code>Stream</code> into one consisting of the result of applying the given <code>mapper</code> to
   * the elements of this <code>Stream</code>.
   */
  public map<R>(mapper: Function<T, R>): Stream<R>
  {
    return null;
  }

  /**
   * Returns the maximal element of this <code>Stream</code> according to the provided <code>comparator</code> (or if
   * none is specified and the element implements <code>Comparable</code> the result of the <code>compareTo</code>
   * method).
   */
  public max(comparator?: BiFunction<T, T, number>): Optional<T>
  {
    return null;
  }

  /**
   * Returns the minimal element of this <code>Stream</code> according to the provided <code>comparator</code> (or if
   * none is specified and the element implements <code>Comparable</code> the result of the <code>compareTo</code>
   * method).
   */
  public min(comparator?: BiFunction<T, T, number>): Optional<T>
  {
    return null;
  }

  /**
   * Returns <code>true</code> if none of the elements in this <code>Stream</code> match the <code>predicate</code>;
   * otherwise <code>false</code>.
   */
  public noneMatch(predicate: Predicate<T>): boolean
  {
    return false;
  }

  /**
   * Returns an <code>ArrayStream</code> containing the <code>array</code>.
   */
  public static of<T>(array: T[]): ArrayStream<T>
  {
    return new ArrayStream<T>(array);
  }

  /**
   * Returns a <code>Stream</code> containing the elements of this stream and also provide elements to the specified
   * <code>consumer</code> as elements are consumed from the resulting <code>Stream</code>.
   */
  public peak(consumer: Consumer<T>): Stream<T>
  {
    return null;
  }

  /**
   * Transform this <code>Stream</code> into one consisting of the elements of this <code>Stream</code> sorted using the
   * <code>comparator</code> (or if none is specified and the element implements <code>Comparable</code> the result of
   * the <code>compareTo</code> method).
   */
  public sorted(comparator?: BiFunction<T, T, number>): Stream<T>
  {
    return null;
  }

  /**
   * Returns a <code>Stream</code> that is a sub-sequence of this <code>Stream<code> discarding the first
   * <code>startingOffset</code> elements of this stream and discarding any elements after the
   * <code>endingOffset</code>'th element of this stream (when <code>endingOffset</code> is specified.
   */
  public subStream(startingOffset: number, endingOffset?: number): Stream<T>
  {
    return null;
  }

  /**
   * Returns a new instance of <code>ArrayStream</code> initialized with the <code>array</code> contained in this
   * <code>ArrayStream</code> and the given <code>chain</code>.
   */
  protected newInstance(chain: Chain<any, T>): Stream<T>
  {
    return new ArrayStream<T>(this._array, chain);
  }

  /**
   * Iterates over the <i>elements</i> passing each to the <code>consumer</code> in tern.
   */
  protected iterate(f: Function<any, boolean>): void
  {
    for (let element of this._array)
    {
      if (!f(element))
      {
        break;
      }
    }
  }

  /**
   * Returns the index of the <code>element</code> in the <code>array</code> or <code>-1</code> if the
   * <code>element</code> is not present.
   */
  private indexOf(array: T[], element: T)
  {
    for (let i = 0; i < array.length; i++)
    {
      if (eq(array[i], element))
      {
        return i;
      }
    }

    return -1;
  }
}