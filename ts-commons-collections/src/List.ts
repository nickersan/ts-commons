/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import { BiFunction, Object } from "ts-commons-lang";

import { Collection } from "./Collection";

/**
 * An ordered specialization of <code>Collection</code>.
 */
export interface List<E extends Object<E>> extends Collection<E>
{
  /**
   * Adds the <code>element</code> at the given <code>index</code>.
   */
  addAt(element: E, index: number): boolean;

  /**
   * Adds the <code>elements</code> at the given <code>index</code>.
   */
  addAllAt(elements: Collection<E>, index: number): boolean;

  /**
   * Returns the element at the given <code>index</code>.
   */
  get(index: number): E;

  /**
   * Sets the element at the given <code>index</code>.
   */
  set(index: number, element: E): void;

  /**
   * Sorts this <code>List</code> using the <code>comparator</code> to compare elements.
   */
  sort(comparator: BiFunction<E, E, number>): void;
}