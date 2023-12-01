import {
  EXAMPLE_PART_1_INPUT,
  EXAMPLE_PART_2_INPUT,
  PART_1_VALID_DIGITS,
  PART_2_VALID_DIGITS,
} from "./consts";
import { getCallibrationValueFromLine } from "./utils";

describe("utils", () => {
  describe("getCallibrationValueFromLine", () => {
    describe("getCallibrationValueFromLine", () => {
      describe("Part 1", () => {
        const input = EXAMPLE_PART_1_INPUT;

        it("gets the callibration values", () => {
          expect(
            getCallibrationValueFromLine(input[0], PART_1_VALID_DIGITS)
          ).toBe(12);
          expect(
            getCallibrationValueFromLine(input[1], PART_1_VALID_DIGITS)
          ).toBe(38);
          expect(
            getCallibrationValueFromLine(input[2], PART_1_VALID_DIGITS)
          ).toBe(15);
          expect(
            getCallibrationValueFromLine(input[3], PART_1_VALID_DIGITS)
          ).toBe(77);
        });
      });

      describe("Part 2", () => {
        const input = EXAMPLE_PART_2_INPUT;

        it("gets the callibration values", () => {
          expect(
            getCallibrationValueFromLine(input[0], PART_2_VALID_DIGITS)
          ).toBe(29);
          expect(
            getCallibrationValueFromLine(input[1], PART_2_VALID_DIGITS)
          ).toBe(83);
          expect(
            getCallibrationValueFromLine(input[2], PART_2_VALID_DIGITS)
          ).toBe(13);
          expect(
            getCallibrationValueFromLine(input[3], PART_2_VALID_DIGITS)
          ).toBe(24);
          expect(
            getCallibrationValueFromLine(input[4], PART_2_VALID_DIGITS)
          ).toBe(42);
          expect(
            getCallibrationValueFromLine(input[5], PART_2_VALID_DIGITS)
          ).toBe(14);
          expect(
            getCallibrationValueFromLine(input[6], PART_2_VALID_DIGITS)
          ).toBe(76);
        });
      });
    });
  });
});
