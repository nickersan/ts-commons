/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

/**
 * Applies a function to the input arguments, yielding an appropriate result.
 */
export type BiFunction<T, U, R> = (t: T, u: T) => R;