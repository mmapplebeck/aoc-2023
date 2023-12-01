import { join } from "path";

import { getInput } from "../utils";

const INPUT_FILENAME = join(__dirname, "input.txt");

export const INPUT = getInput(INPUT_FILENAME);

export const DigitsBySpelling: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

export const PART_1_VALID_DIGITS = new Set<string>(
  Object.values(DigitsBySpelling)
);

export const PART_2_VALID_DIGITS = new Set<string>([
  ...PART_1_VALID_DIGITS,
  ...Object.keys(DigitsBySpelling),
]);

export const EXAMPLE_PART_1_INPUT = [
  "1abc2",
  "pqr3stu8vwx",
  "a1b2c3d4e5f",
  "treb7uchet",
];

export const EXAMPLE_PART_2_INPUT = [
  "two1nine",
  "eightwothree",
  "abcone2threexyz",
  "xtwone3four",
  "4nineeightseven2",
  "zoneight234",
  "7pqrstsixteen",
];
