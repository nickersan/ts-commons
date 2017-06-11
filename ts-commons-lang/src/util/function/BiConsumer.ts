/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

/**
 * An operation which accepts a single input argument and returns no result.
 */
export type BiConsumer<T, U> = (t: T, i: U) => void;