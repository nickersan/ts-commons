/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import { BiFunction } from "../util/function/BiFunction";
import { Collector } from "./Collector";
import { Consumer } from "../util/function/Consumer";
import { Predicate } from "../util/function/Predicate";
import { Function } from "../util/function/Function";
import { Optional } from "../util/Optional";

/**
 * A sequence of elements supporting sequential bulk operations.
 */
export interface Stream<T>
{
  /**
   * Transform this stream into one consisting of the distinct elements (according to the <code>Object.eq</code>
   * function).
   */
  readonly distinct: Stream<T>;

  /**
   * Returns an <code>Optional</code> containing the first element of this stream or an empty <code>Optional</code> if
   * the stream is empty.
   */
  readonly first: Optional<T>;

  /**
   * Returns an array containing the elements of this <code>Stream</code>.
   */
  readonly toArray: T[];

  /**
   * Returns <code>true</code> if all elements in this <code>Stream</code> match the <code>predicate</code>; otherwise
   * <code>false</code>.
   */
  allMatch(predicate: Predicate<T>): boolean;

  /**
   * Returns <code>true</code> if any elements in this <code>Stream</code> match the <code>predicate</code>; otherwise
   * <code>false</code>.
   */
  anyMatch(predicate: Predicate<T>): boolean;

  /**
   * Performs a reduction operation on the elements of this <code>Stream</code> using the <code>collector</code>.
   */
  collect<R>(collector: Collector<T, any, R>): R;

  /**
   * Transforms this <code>Stream</code> into one consisting of the elements that match the given
   * <code>predicate</code>.
   */
  filter(predicate: Predicate<T>): Stream<T>;

  /**
   * Transforms this <code>Stream</code> into one where each element is replaced with the contents of the
   * <code>Stream</code> produced by applying the <code>mapper</code> to that element.
   */
  flatMap<R>(mapper: Function<T, Stream<R>>): Stream<R>;

  /**
   * Iterates of each element in this <code>Stream</code> invoking the <code>consumer</code> and passing the element.
   */
  forEach(consumer: Consumer<T>): void;

  /**
   * Iterates of each element in this <code>Stream</code> invoking the <code>consumer</code> and passing the element
   * while the <code>consumer</code> returns <code>true</code>.
   */
  forEachWhile(consumer: Function<T, boolean>): void;

  /**
   * Returns a <code>Stream</code> consisting of the elements of this <code>Stream</code> discarding any elements after
   * the <code>maxSize</code>'th elements.
   */
  limit(max: number): Stream<T>;

  /**
   * Transforms this <code>Stream</code> into one consisting of the result of applying the given <code>mapper</code> to
   * the elements of this <code>Stream</code>.
   */
  map<R>(mapper: Function<T, R>): Stream<R>;

  /**
   * Returns the maximal element of this <code>Stream</code> according to the provided <code>comparator</code> (or if
   * none is specified and the element implements <code>Comparable</code> the result of the <code>compareTo</code>
   * method).
   */
  max(comparator?: BiFunction<T, T, number>): Optional<T>;

  /**
   * Returns the minimal element of this <code>Stream</code> according to the provided <code>comparator</code> (or if
   * none is specified and the element implements <code>Comparable</code> the result of the <code>compareTo</code>
   * method).
   */
  min(comparator?: BiFunction<T, T, number>): Optional<T>;

  /**
   * Returns <code>true</code> if none of the elements in this <code>Stream</code> match the <code>predicate</code>;
   * otherwise <code>false</code>.
   */
  noneMatch(predicate: Predicate<T>): boolean;

  /**
   * Returns a <code>Stream</code> containing the elements of this stream and also provide elements to the specified
   * <code>consumer</code> as elements are consumed from the resulting <code>Stream</code>.
   */
  peak(consumer: Consumer<T>): Stream<T>;

  /**
   * Transform this <code>Stream</code> into one consisting of the elements of this <code>Stream</code> sorted using the
   * <code>comparator</code> (or if none is specified and the element implements <code>Comparable</code> the result of
   * the <code>compareTo</code> method).
   */
  sorted(comparator?: BiFunction<T, T, number>): Stream<T>;

  /**
   * Returns a <code>Stream</code> that is a sub-sequence of this <code>Stream<code> discarding the first
   * <code>startingOffset</code> elements of this stream and discarding any elements after the
   * <code>endingOffset</code>'th element of this stream (when <code>endingOffset</code> is specified.
   */
  subStream(startingOffset: number, endingOffset?: number): Stream<T>;
}