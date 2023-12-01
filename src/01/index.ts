import { INPUT, PART_1_VALID_DIGITS, PART_2_VALID_DIGITS } from "./consts";
import { getCallibrationSum } from "./utils";

export function getPart1(input: string[]): number {
  return getCallibrationSum(input, PART_1_VALID_DIGITS);
}

export function getPart2(input: string[]): number {
  return getCallibrationSum(input, PART_2_VALID_DIGITS);
}

console.log(getPart1(INPUT), getPart2(INPUT));
