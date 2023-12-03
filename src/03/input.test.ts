import { join } from "path";

import { getInput } from "../utils";
import {
  getGrid,
  getPart1,
  getSchematicNumbers,
  isPartNumber,
  SchematicNumber,
} from ".";

const EXAMPLE_INPUT = getInput(join(__dirname, "example-input.txt"));

describe("Day 3", () => {
  describe("getSchematicNumbers", () => {
    it("gets the numbers", () => {
      expect(getSchematicNumbers(getGrid(EXAMPLE_INPUT))).toStrictEqual([
        {
          value: 467,
          start: {
            row: 0,
            column: 0,
          },
          end: {
            row: 0,
            column: 2,
          },
        },
        {
          value: 114,
          start: {
            row: 0,
            column: 5,
          },
          end: {
            row: 0,
            column: 7,
          },
        },
        {
          value: 35,
          start: {
            row: 2,
            column: 2,
          },
          end: {
            row: 2,
            column: 3,
          },
        },
        {
          value: 633,
          start: {
            row: 2,
            column: 6,
          },
          end: {
            row: 2,
            column: 8,
          },
        },
        {
          value: 617,
          start: {
            row: 4,
            column: 0,
          },
          end: {
            row: 4,
            column: 2,
          },
        },
        {
          value: 58,
          start: {
            row: 5,
            column: 7,
          },
          end: {
            row: 5,
            column: 8,
          },
        },
        {
          value: 592,
          start: {
            row: 6,
            column: 2,
          },
          end: {
            row: 6,
            column: 4,
          },
        },
        {
          value: 755,
          start: {
            row: 7,
            column: 6,
          },
          end: {
            row: 7,
            column: 8,
          },
        },
        {
          value: 664,
          start: {
            row: 9,
            column: 1,
          },
          end: {
            row: 9,
            column: 3,
          },
        },
        {
          value: 598,
          start: {
            row: 9,
            column: 5,
          },
          end: {
            row: 9,
            column: 7,
          },
        },
      ] as SchematicNumber[]);
    });
  });

  describe("isPartNumber", () => {
    it("gets only the numbers adjacent to symbols", () => {
      const grid = getGrid(EXAMPLE_INPUT);

      expect(
        getSchematicNumbers(grid)
          .filter((number) => !isPartNumber(number, grid))
          .map(({ value }) => value)
      ).toStrictEqual([114, 58]);
    });
  });

  describe("getPart1", () => {
    it("sums the part numbers", () => {
      expect(getPart1(EXAMPLE_INPUT)).toBe(4361);
    });
  });
});
