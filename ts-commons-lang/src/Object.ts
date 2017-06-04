/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

import { Equalable } from "./Equalable";
import { Hashable } from "./Hashable";

/**
 * Combines the two common interfaces (<code>Equalable</code> and <code>Hashable</code>) into one.
 */
export interface Object<T> extends Equalable<T>, Hashable
{
}