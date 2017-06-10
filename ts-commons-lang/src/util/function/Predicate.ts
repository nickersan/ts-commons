/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

/**
 * Determines if the input object matches some criteria.
 */
export type Predicate<T> = (t: T) => boolean;