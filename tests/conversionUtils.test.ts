import { describe, it, expect } from "vitest";
import { separateCents } from "../src/utils";

describe("Conversion utility functions", () => {
  it("should display cents corrects", () => {
    const expected = "4.00";
    const input = 400;
    const result = separateCents(input);

    expect(result).toBe(expected);
  });
});
