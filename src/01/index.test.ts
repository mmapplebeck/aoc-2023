import { getPart1, getPart2 } from ".";
import { EXAMPLE_PART_1_INPUT, EXAMPLE_PART_2_INPUT } from "./consts";

describe("Day 1", () => {
  describe("getPart1", () => {
    it("gets the answer", () => {
      expect(getPart1(EXAMPLE_PART_1_INPUT)).toBe(142);
    });
  });

  describe("getPart2", () => {
    it("gets the answer", () => {
      expect(getPart2(EXAMPLE_PART_2_INPUT)).toBe(281);
    });
  });
});
