/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import { Consumer, Function, Object, Predicate, Stream } from "ts-commons-lang";

/**
 * The root interface in the <i>collection hierarchy</i>.  A collection represents a group of objects, known as its
 * <i>elements</i>.
 */
export interface Collection<E extends Object<E>> extends Object<Collection<E>>
{
  /**
   * Returns <code>true</code> if this <code>Collection</code> is <i>empty</i> (has no elements); otherwise
   * <code>false</code>.
   */
  readonly empty: boolean;

  /**
   * Returns <code>true</code> if this <code>Collection</code> is not <i>empty</i> (has no elements); otherwise
   * <code>false</code>.
   */
  readonly notEmpty: boolean;

  /**
   * Returns the number of elements in this <code>Collection</code>.
   */
  readonly size: number;

  /**
   * Returns a <code>Stream</code> containing the elements from this <code>Collection</code>.
   */
  readonly stream: Stream<E>;

  /**
   * Returns the elements in this <code>Collection</code> as an <i>array</i>.
   */
  readonly toArray: E[];

  /**
   * Adds the <code>element</code> to this <code>Collection</code>.  Returns <code>true</code> if this
   * <code>Collection</code> is modified as a result of the call.
   */
  add(element: E): boolean;

  /**
   * Adds all the <code>elements</code> to this <code>Collection</code>.  Returns <code>true</code> if this
   * <code>Collection</code> is modified as a result of the call.
   */
  addAll(elements: Collection<E>): boolean;

  /**
   * Clears all the elements in this <code>Collection</code>.
   */
  clear(): void;

  /**
   * Returns <code>true</code> if the <code>element</code> is in this <code>Collection</code> based on the
   * <code>element</code>'s <code>equals</code> method; otherwise <code>false</code>.
   */
  contains(element: E): boolean;

  /**
   * Returns <code>true</code> if all the <code>elements</code> are in this <code>Collection</code> based on the
   * <code>element</code>'s <code>equals</code> method; otherwise <code>false</code>.
   */
  containsAll(elements: Collection<E>): boolean;

  /**
   * Returns <code>true</code> if any of the <code>elements</code> are in this <code>Collection</code> based on the
   * <code>element</code>'s <code>equals</code> method; otherwise <code>false</code>.
   */
  containsAny(elements: Collection<E>): boolean;

  /**
   * Iterates of each element in this <code>Collection</code> invoking the <code>consumer</code> and passing the
   * element.
   */
  forEach(consumer: Consumer<E>): void;

  /**
   * Iterates of each element in this <code>Collection</code> invoking the <code>consumer</code> and passing the
   * element while the <code>consumer</code> returns <code>true</code>.
   */
  forEachWhile(consumer: Function<E, boolean>): void;

  /**
   * Removes the <code>element</code> from this <code>Collection</code>. Returns <code>true</code> if this
   * <code>Collection</code> is modified as a result of the call.
   */
  remove(element: E): boolean;

  /**
   * Removes the <code>elements</code> from this <code>Collection</code>. Returns <code>true</code> if this
   * <code>Collection</code> is modified as a result of the call.
   */
  removeAll(elements: Collection<E>): boolean;

  /**
   * Removes the <code>elements</code> that match the <code>predicate</code> from this <code>Collection</code>. Returns
   * <code>true</code> if this <code>Collection</code> is modified as a result of the call.
   */
  removeIf(predicate: Predicate<E>): boolean;

  /**
   * Retains the <code>elements</code> in this <code>Collection</code>. Returns <code>true</code> if this
   * <code>Collection</code> is modified as a result of the call.
   */
  retainAll(elements: Collection<E>): boolean;

  /**
   * Retains the <code>elements</code> match the <code>predicate</code> in this <code>Collection</code>. Returns
   * <code>true</code> if this <code>Collection</code> is modified as a result of the call.
   */
  retainIf(predicate: Predicate<E>): boolean;
}