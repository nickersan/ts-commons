/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import "../../extensions/Array"

import { Chain } from "./Chain";
import { eq } from "../../Equalable";
import { Function } from "../../util/function/Function";
import { Predicate } from "../../util/function/Predicate";
import { Stream } from "../Stream";

/**
 * An abstract base implementation of <code>Chain</code>.
 */
export abstract class AbstractChain<T, R> implements Chain<T, R>
{
  protected next: AbstractChain<any, any>;
  private head: AbstractChain<any, any>;

  /**
   * Initializes a new <code>AbstractChain</code>.
   */
  constructor()
  {
    this.head = this;
  }

  /**
   * Evaluates the given <code>element</code>.
   */
  public start(element: T): R[]
  {
    return this.head.evaluate(element);
  }

  /**
   * Returns a <code>Chain</code> that performs a <i>distinct</i> operation.
   */
  public distinct(): Chain<R, R>
  {
    return this.connect(new DistinctChain<R>());
  }

  /**
   * Returns a <code>Chain</code> that performs a <i>filter</i> operation using the <code>predicate</code>.
   */
  public filter(predicate: Predicate<R>): Chain<R, R>
  {
    return this.connect(new FilterChain<R>(predicate));
  }

  /**
   * Returns a <code>Chain</code> that <i>flat-maps</i> using the <code>mapper</code>.
   */
  public flatMap<R1>(mapper: Function<R, Stream<R1>>): Chain<R, R1>
  {
    return this.connect(new FlatMapChain<R, R1>(mapper));
  }

  /**
   * Returns a <code>Chain</code> that <i>maps</i> using the <code>mapper</code>.
   */
  public map<R1>(mapper: Function<R, R1>): Chain<R, R1>
  {
    return this.connect(new MappingChain<R, R1>(mapper));
  }

  /**
   * Evaluates the given <code>element</code>.
   */
  public abstract evaluate(element: T): R[];

  /**
   * Evaluates the next <code>Chain</code> if there is one; otherwise wraps the <code>element</code> in an
   * <code>Optional</code> and returns it.
   */
  protected evaluateNextOr(element: R): R[]
  {
    return this.next ? this.next.evaluate(element) : [element];
  }

  /**
   * Connects the <code>chain</code> to this <code>Chain</code>.
   */
  private connect<R1>(chain: AbstractChain<R, R1>): Chain<R, R1>
  {
    chain.head = this.head;
    this.next = chain;

    return chain;
  }
}

/**
 * A specialization of <code>Chain</code> that performs a <i>distinct</i> operation.
 */
class DistinctChain<T> extends AbstractChain<T, T>
{
  private elements: T[] = [];

  /**
   * Evaluates that the given <code>element</code> has not been seen before (is distinct).
   */
  public evaluate(element: T): T[]
  {
    if (!this.elements.some((e) => eq(e, element)))
    {
      this.elements.push(element);
      return this.evaluateNextOr(element);
    }
    else
    {
      return [];
    }
  }
}

/**
 * A specialization of <code>Chain</code> that performs a <i>distinct</i> operation.
 */
class FilterChain<T> extends AbstractChain<T, T>
{
  /**
   * Initializes a new <code>FilterChain</code> with the <code>predicate</code> to filter with.
   */
  constructor(private predicate: Predicate<T>)
  {
    super();
  }

  /**
   * Evaluates that the given <code>element</code> passes the <code>predicate</code>.
   */
  public evaluate(element: T): T[]
  {
    if (this.predicate(element))
    {
      return this.evaluateNextOr(element);
    }
    else
    {
      return [];
    }
  }
}

class FlatMapChain<T, R> extends AbstractChain<T, R>
{
  /**
   * Initializes a new <code>FilterChain</code> with the <code>predicate</code> to filter with.
   */
  constructor(private mapper: Function<T, Stream<R>>)
  {
    super();
  }

  /**
   * Evaluates that the given <code>element</code> passes the <code>predicate</code>.
   */
  public evaluate(element: T): R[]
  {
    let result: R[] = [];
    this.mapper(element).forEach((e) => result.pushAll(this.evaluateNextOr(e)));
    return result;
  }
}

/**
 * A specialization of <code>Chain</code> that performs a <i>map</i> operation.
 */
class MappingChain<T, R> extends AbstractChain<T, R>
{
  /**
   * Initializes a new <code>FilterChain</code> with the <code>predicate</code> to filter with.
   */
  constructor(private mapper: Function<T, R>)
  {
    super();
  }

  /**
   * Evaluates that the given <code>element</code> passes the <code>predicate</code>.
   */
  public evaluate(element: T): R[]
  {
    return this.evaluateNextOr(this.mapper(element));
  }
}