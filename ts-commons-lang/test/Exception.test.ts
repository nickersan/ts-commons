/// <reference path="../node_modules/@types/jest/index.d.ts"/>

import { Exception } from "../src/Exception";

describe(
  "Exception",
  () =>
  {
    it(
      "toString",
      () =>
      {
        expect(new Exception("test").toString().startsWith("Exception: test")).toBe(true);
        expect(new Exception("test", new Exception("cause")).toString().contains("Caused by: Exception: cause")).toBe(true);
      }
    );
  }
);
