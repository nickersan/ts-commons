/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import { ArrayStream } from "./ArrayStream";
import { Chain } from "./chain/Chain";
import { Collector } from "./Collector";
import { Consumer } from "../util/function/Consumer";
import { Function } from "../util/function/Function";
import { Optional } from "../util/Optional";
import { Predicate } from "../util/function/Predicate";
import { Stream } from "./Stream";
import { BiFunction } from "../util/function/BiFunction";
import { NoopChain } from "./chain/NoopChain";

/**
 * An implementation of <code>Stream</code> that is based on an <i>array</i>.
 */
export abstract class AbstractStream<T> implements Stream<T>
{
  /**
   * Initializes a new <code>AbstractStream</code> with the <code>_chain</code>.  If no <code>Chain</code> is specified
   * a <code>NoopChain</code> will be created.
   */
  protected constructor(private _chain?: Chain<any, T>)
  {
    if (!this._chain) this._chain = new NoopChain<T>();
  }

  /**
   * Transform this stream into one consisting of the distinct elements (according to the <code>Object.eq</code>
   * function).
   */
  get distinct(): Stream<T>
  {
    return this.newInstance(this._chain.distinct());
  }

  /**
   * Returns an <code>Optional</code> containing the first element of this stream or an empty <code>Optional</code> if
   * the stream is empty.
   */
  get first(): Optional<T>
  {
    let first = Optional.empty<T>();

    this.iterate(
      (element) =>
      {
        first = Optional.ofNullable(element);
        return false;
      }
    );

    return first;
  }

  /**
   * Returns an array containing the elements of this <code>Stream</code>.
   */
  get toArray(): T[]
  {
    let array: T[] = [];

    this.iterate(
      (element) =>
      {
        this.evaluate(element).ifPresent((e) => array.push(e));
        return true;
      }
    );

    return array;
  }

  /**
   * Returns <code>true</code> if all elements in this <code>Stream</code> match the <code>predicate</code>; otherwise
   * <code>false</code>.
   */
  public allMatch(predicate: Predicate<T>): boolean
  {
    let match = true;

    this.iterate(
      (element) =>
      {
        let e = this.evaluate(element);

        if (e.present)
        {
          match = predicate(e.value);
        }

        return match;
      }
    );

    return match;
  }

  /**
   * Returns <code>true</code> if any elements in this <code>Stream</code> match the <code>predicate</code>; otherwise
   * <code>false</code>.
   */
  public anyMatch(predicate: Predicate<T>): boolean
  {
    let match = false;

    this.iterate(
      (element) =>
      {
        let e = this.evaluate(element);

        if (e.present)
        {
          match = predicate(e.value);
        }

        return !match;
      }
    );

    return match;
  }

  /**
   * Performs a reduction operation on the elements of this <code>Stream</code> using the <code>collector</code>.
   */
  public collect<R>(collector: Collector<T, any, R>): R
  {
    let elements = collector.supplier();

    this.iterate(
      (element) =>
      {
        this.evaluate(element).ifPresent((e) => collector.accumulator(elements, e));
        return true;
      }
    );

    return collector.finisher(elements);
  }

  /**
   * Transforms this <code>Stream</code> into one consisting of the elements that match the given
   * <code>predicate</code>.
   */
  public filter(predicate: Predicate<T>): Stream<T>
  {
    return this.newInstance(this._chain.filter(predicate));
  }

  /**
   * Transforms this <code>Stream</code> into one where each element is replaced with the contents of the
   * <code>Stream</code> produced by applying the <code>mapper</code> to that element.
   */
  public flatMap<R>(mapper: Function<T, Stream<R>>): Stream<R>
  {
    let mapped: R[] = [];

    for (let element of this._array)
    {
      mapper(element).forEach((e) => mapped.push(e));
    }

    return new ArrayStream(mapped);
  }

  /**
   * Iterates of each element in this <code>Stream</code> invoking the <code>consumer</code> and passing the element.
   */
  public forEach(consumer: Consumer<T>): void
  {
    this.iterate(
      (element) =>
      {
        let result = this.evaluate(element);
        result.ifPresent(consumer);
        return true;
      }
    );
  }

  /**
   * Iterates of each element in this <code>Stream</code> invoking the <code>consumer</code> and passing the element
   * while the <code>consumer</code> returns <code>true</code>.
   */
  abstract forEachWhile(consumer: Function<T, boolean>): void;

  /**
   * Returns a <code>Stream</code> consisting of the elements of this <code>Stream</code> discarding any elements after
   * the <code>maxSize</code>'th elements.
   */
  abstract limit(max: number): Stream<T>;

  /**
   * Transforms this <code>Stream</code> into one consisting of the result of applying the given <code>mapper</code> to
   * the elements of this <code>Stream</code>.
   */
  abstract map<R>(mapper: Function<T, R>): Stream<R>;

  /**
   * Returns the maximal element of this <code>Stream</code> according to the provided <code>comparator</code> (or if
   * none is specified and the element implements <code>Comparable</code> the result of the <code>compareTo</code>
   * method).
   */
  abstract max(comparator?: BiFunction<T, T, number>): Optional<T>;

  /**
   * Returns the minimal element of this <code>Stream</code> according to the provided <code>comparator</code> (or if
   * none is specified and the element implements <code>Comparable</code> the result of the <code>compareTo</code>
   * method).
   */
  abstract min(comparator?: BiFunction<T, T, number>): Optional<T>;

  /**
   * Returns <code>true</code> if none of the elements in this <code>Stream</code> match the <code>predicate</code>;
   * otherwise <code>false</code>.
   */
  abstract noneMatch(predicate: Predicate<T>): boolean;

  /**
   * Returns a <code>Stream</code> containing the elements of this stream and also provide elements to the specified
   * <code>consumer</code> as elements are consumed from the resulting <code>Stream</code>.
   */
  abstract peak(consumer: Consumer<T>): Stream<T>;

  /**
   * Transform this <code>Stream</code> into one consisting of the elements of this <code>Stream</code> sorted using the
   * <code>comparator</code> (or if none is specified and the element implements <code>Comparable</code> the result of
   * the <code>compareTo</code> method).
   */
  abstract sorted(comparator?: BiFunction<T, T, number>): Stream<T>;

  /**
   * Returns a <code>Stream</code> that is a sub-sequence of this <code>Stream<code> discarding the first
   * <code>startingOffset</code> elements of this stream and discarding any elements after the
   * <code>endingOffset</code>'th element of this stream (when <code>endingOffset</code> is specified.
   */
  abstract subStream(startingOffset: number, endingOffset?: number): Stream<T>;

  /**
   * Evaluates the <code>element</code> using the <code>Chain</code>.
   */
  protected evaluate(element: any): Optional<T>
  {
    return this._chain.start(element);
  }

  /**
   * Iterates over the <i>elements</i> passing each to the <code>consumer</code> in tern.
   */
  protected abstract iterate(f: Function<any, boolean>): void;

  /**
   * Returns a new instance of a particular <code>Stream</code> initializing it with the given <code>chain</code>.
   */
  protected abstract newInstance(chain: Chain<any, T>): Stream<T>;
}