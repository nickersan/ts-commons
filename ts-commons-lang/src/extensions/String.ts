/*
 * https://github.com/nickersan/ts-commons
 *
 * Copyright (c) 2017 Nick Holt
 * Licensed under the MIT license.
 *
 */

/**
 * Extensions to the standard <code>string</code> class.
 */
interface String
{
  /**
   * Returns <code>true</code> if this <code>string</code> <i>contains</code> the given <code>subStr</code>;
   * otherwise <code>false</code>.
   */
  contains(subStr: string): boolean;

  /**
   * Returns the index of the <code>n</code>th <code>substr</code> in this <code>string</code> or <code>-1</code> if
   * there is no <code>n</code>th instance of the <code>substr</code>.
   * <p/>
   * <code>n</code> is zero based so that passing <code>0</code> finds the 1st item, <code>2</code> the 2nd, etc.
   */
  indexOfNth(subStr: string, n: number): number;

  /**
   * Returns <code>true</code> if this <code>string</code> <i>starts with</code> the given <code>subStr</code>;
   * otherwise <code>false</code>.
   */
  startsWith(subStr: string): boolean;
}

if (!String.prototype.contains)
{
  String.prototype.contains = function(subStr: string)
  {
    return this.indexOf(subStr) >= 0;
  }
}

if (!String.prototype.indexOfNth)
{
  String.prototype.indexOfNth = function(subStr: string, n: number)
  {
    let i = this.indexOf(subStr);

    if (n <= 0)
    {
      return i;
    }
    else
    {
      let s = this.substr(i + subStr.length);
      let j = s.indexOfNth(subStr, n - 1);

      return j >= 0 ? i + subStr.length + j : j;
    }
  }
}

if (!String.prototype.startsWith)
{
  String.prototype.startsWith = function(subStr: string)
  {
    return this.indexOf(subStr) == 0;
  }
}