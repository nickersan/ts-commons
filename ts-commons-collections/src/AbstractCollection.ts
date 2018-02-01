/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import { Consumer, eq, Function, Object, Predicate, Stream } from "ts-commons-lang";

import { Collection } from "./Collection";

/**
 * This class provides a skeletal implementation of the <code>Collection</code> interface to minimize the effort
 * required to implement this interface. <p>
 */
export abstract class AbstractCollection<E extends Object<E>> implements Collection<E>
{
  /**
   * Returns <code>true</code> if this <code>Collection</code> is <i>empty</i> (has no elements); otherwise
   * <code>false</code>.
   */
  get empty(): boolean
  {
    return this.size == 0;
  }

  /**
   * Returns <code>true</code> if this <code>Collection</code> is not <i>empty</i> (has no elements); otherwise
   * <code>false</code>.
   */
  get notEmpty(): boolean
  {
    return !this.empty;
  }

  /**
   * Returns the number of elements in this <code>Collection</code>.
   */
  public abstract get size(): number;

  /**
   * Returns a <code>Stream</code> containing the elements from this <code>Collection</code>.
   */
  public abstract get stream(): Stream<E>;

  /**
   * Returns the elements in this <code>Collection</code> as an <i>array</i>.
   */
  public get toArray(): E[]
  {
    return this.stream.toArray;
  }

  /**
   * The hash code value for the object.
   */
  public get hashCode(): number
  {
    return this.stream.map((e) => e.hashCode).collect();
  }

  /**
   * Adds the <code>element</code> to this <code>Collection</code>.  Returns <code>true</code> if this
   * <code>Collection</code> is modified as a result of the call.
   */
  public abstract add(element: E): boolean;

  /**
   * Adds all the <code>elements</code> to this <code>Collection</code>.  Returns <code>true</code> if this
   * <code>Collection</code> is modified as a result of the call.
   */
  public abstract addAll(elements: Collection<E>): boolean;

  /**
   * Clears all the elements in this <code>Collection</code>.
   */
  public abstract clear(): void;

  /**
   * Returns <code>true</code> if the <code>element</code> is in this <code>Collection</code> based on the
   * <code>element</code>'s <code>equals</code> method; otherwise <code>false</code>.
   */
  public contains(element: E): boolean
  {
    let result = false;

    this.forEach(
      (e) =>
      {
        if (eq(e, element))
        {
          result = true;
          return false;
        }
        else
        {
          return true;
        }
      }
    );

    return result;
  }

  /**
   * Returns <code>true</code> if all the <code>elements</code> are in this <code>Collection</code> based on the
   * <code>element</code>'s <code>equals</code> method; otherwise <code>false</code>.
   */
  public containsAll(elements: Collection<E>): boolean
  {
    return elements.stream.allMatch((e) => this.contains(e));
  }

  /**
   * Returns <code>true</code> if any of the <code>elements</code> are in this <code>Collection</code> based on the
   * <code>element</code>'s <code>equals</code> method; otherwise <code>false</code>.
   */
  public containsAny(elements: Collection<E>): boolean
  {
    return elements.stream.anyMatch((e) => this.contains(e));
  }

  /**
   * Iterates of each element in this <code>Collection</code> invoking the <code>consumer</code> and passing the
   * element.
   */
  public forEach(consumer: Consumer<E>): void
  {
    this.stream.forEach(consumer);
  }

  /**
   * Iterates of each element in this <code>Collection</code> invoking the <code>consumer</code> and passing the
   * element while the <code>consumer</code> returns <code>true</code>.
   */
  public forEachWhile(consumer: Function<E, boolean>): void
  {
    this.stream.forEach(consumer);
  }

  /**
   * Removes the <code>element</code> from this <code>Collection</code>. Returns <code>true</code> if this
   * <code>Collection</code> is modified as a result of the call.
   */
  public abstract remove(element: E): boolean;

  /**
   * Removes the <code>elements</code> from this <code>Collection</code>. Returns <code>true</code> if this
   * <code>Collection</code> is modified as a result of the call.
   */
  public abstract removeAll(elements: Collection<E>): boolean;

  /**
   * Removes the <code>elements</code> that match the <code>predicate</code> from this <code>Collection</code>. Returns
   * <code>true</code> if this <code>Collection</code> is modified as a result of the call.
   */
  public abstract removeIf(predicate: Predicate<E>): boolean;

  /**
   * Retains the <code>elements</code> in this <code>Collection</code>. Returns <code>true</code> if this
   * <code>Collection</code> is modified as a result of the call.
   */
  public abstract retainAll(elements: Collection<E>): boolean;

  /**
   * Retains the <code>elements</code> match the <code>predicate</code> in this <code>Collection</code>. Returns
   * <code>true</code> if this <code>Collection</code> is modified as a result of the call.
   */
  public abstract retainIf(predicate: Predicate<E>): boolean;

  /**
   * Returns <code>true</code> if this <code>Collection</code> is considered <i>semantically-equal</i> to the
   * <code>other</code>.
   */
  public equals(other: Collection<E>): boolean
  {
    return this.size == other.size && this.containsAll(other);
  }
}
