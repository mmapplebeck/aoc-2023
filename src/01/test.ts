import { getCallibrationValueFromLine, getPart1 } from ".";

describe("Day 1", () => {
  describe("Part 1", () => {
    const exampleInput = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];

    describe("getCallibrationValueFromLine", () => {
      it("gets the callibration values", () => {
        expect(getCallibrationValueFromLine(exampleInput[0])).toBe(12);
        expect(getCallibrationValueFromLine(exampleInput[1])).toBe(38);
        expect(getCallibrationValueFromLine(exampleInput[2])).toBe(15);
        expect(getCallibrationValueFromLine(exampleInput[3])).toBe(77);
      });
    });

    describe("getPart1", () => {
      it("gets the sum", () => {
        expect(getPart1(exampleInput)).toBe(142);
      });
    });
  });
});
