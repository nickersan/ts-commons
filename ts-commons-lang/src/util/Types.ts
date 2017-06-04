/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

const TYPE_BOOLEAN = "boolean";
const TYPE_NUMBER = "number";
const TYPE_OBJECT = "object";
const TYPE_STRING = "string";

/**
 * Returns <code>true</code> if the <code>value</code> is an <i>array</i>; otherwise <code>false</code>.
 */
export function isArray(value: any): boolean
{
  return value != null && typeof(value) === TYPE_OBJECT && Array.isArray(value);
}

/**
 * Returns <code>true</code> if the <code>value</code> is a <code>boolean</code>; otherwise <code>false</code>.
 */
export function isBoolean(value: any): boolean
{
  return typeof(value) === TYPE_BOOLEAN;
}

/**
 * Returns <code>true</code> if the <code>value</code> is a <code>number</code>; otherwise <code>false</code>.
 */
export function isNumber(value: any): boolean
{
  return typeof(value) === TYPE_NUMBER;
}

/**
 * Returns <code>true</code> if the <code>value</code> is an <i>object</i>; otherwise <code>false</code>.
 */
export function isObject(value: any): boolean
{
  return value != null && typeof(value) === TYPE_OBJECT && !isArray(value);
}

/**
 * Returns <code>true</code> if the <code>value</code> is a <code>string</code>; otherwise <code>false</code>.
 */
export function isString(value: any): boolean
{
  return typeof(value) === TYPE_STRING;
}