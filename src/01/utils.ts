import maxBy from "lodash/maxBy";
import minBy from "lodash/minBy";
import sum from "lodash/sum";

import { DigitsBySpelling } from "./consts";
import { DigitPosition } from "./types";

export function getNumericalDigit(digit: string): string {
  return DigitsBySpelling[digit] || digit;
}

export function getDigitPositionsInLine(
  digits: Set<string>,
  line: string,
  positionType: "first" | "last"
): DigitPosition[] {
  return Array.from(digits)
    .map(
      (digit): DigitPosition => ({
        digit,
        index:
          positionType === "first"
            ? line.indexOf(digit)
            : line.lastIndexOf(digit),
      })
    )
    .filter(({ index }) => index !== -1);
}

export function getCallibrationValueFromLine(
  line: string,
  validDigits: Set<string>
): number {
  const { digit: firstDigit } = minBy(
    getDigitPositionsInLine(validDigits, line, "first"),
    ({ index }) => index
  );
  const { digit: lastDigit } = maxBy(
    getDigitPositionsInLine(validDigits, line, "last"),
    ({ index }) => index
  );

  return Number([firstDigit, lastDigit].map(getNumericalDigit).join(""));
}

export function getCallibrationSum(
  input: string[],
  validDigits: Set<string>
): number {
  return sum(
    input.map((line) => getCallibrationValueFromLine(line, validDigits))
  );
}
