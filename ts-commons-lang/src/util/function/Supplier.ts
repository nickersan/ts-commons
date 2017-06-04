/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

/**
 * A supplier of objects. The result objects are either created during the invocation or by some prior action.
 */
export type Supplier<T> = () => T;