import { Cache } from "./pokecache.js";
import { test, expect } from "vitest";

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500, // 1/2 second - premade test
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000, // 1 second - premade test
  },
  {
    key: "https://example.com/a",
    val: "short",
    interval: 300,
  },
  {
    key: "https://example.com/b",
    val: "long",
    interval: 2000,
  },
  {
    key: "https://example.com/c",
    val: "VERYSHORT",
    interval: 2000,
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval + 100));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});
