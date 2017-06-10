/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import { Object, Predicate } from "ts-commons-lang";

/**
 *
 */
export interface Collection<E extends Object<E>> extends Object<Collection<E>>
{
  /**
   *
   */
  readonly empty: boolean;

  /**
   *
   */
  readonly size: number;

  /**
   *
   */
  add(element: E): boolean;

  /**
   *
   */
  addAll(collection: Collection<E>): boolean;

  /**
   *
   */
  clear(): void;

  /**
   *
   */
  contains(element: E): boolean;

  /**
   *
   */
  containsAll(collection: Collection<E>): boolean;

  /**
   *
   */
  remove(element: E): boolean;

  /**
   *
   */
  removeAll(collection: Collection<E>): boolean;

  /**
   *
   */
  removeIf(predicate: Predicate<E>): boolean;

  /**
   *
   */
  retainAll(collection: Collection<E>): boolean;

  /**
   *
   */
  retainIf(predicate: Predicate<E>): boolean;

  /**
   *
   */
  toArray(): E[];
}