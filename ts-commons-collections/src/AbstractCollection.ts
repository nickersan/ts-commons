/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import { Object } from "ts-commons-lang";

import {Collection} from "./Collection";

/**
 *
 */
export abstract class AbstractCollection<E extends Object<E>> implements Collection<E>
{
  get empty(): boolean
  {
    return this.size == 0;
  }

  abstract get size(): number;

  abstract get hashCode(): number;

  public abstract add(element: E): boolean;

  public abstract addAll(collection: Collection<E>): boolean;

  public abstract clear(): void;

  public abstract contains(element: E): boolean;

  public abstract containsAll(collection: Collection<E>): boolean;

  public abstract equals(other: Collection<E>): boolean;


}
