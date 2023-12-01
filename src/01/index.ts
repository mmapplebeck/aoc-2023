import { join } from "path";
import sum from "lodash/sum";

import { getInput } from "../utils";

const INPUT_FILENAME = join(__dirname, "input.txt");
const INPUT = getInput(INPUT_FILENAME);

function isCharacterValidNumber(character: string): boolean {
  return !isNaN(Number(character));
}

export function getCallibrationValueFromLine(line: string): number {
  let l = 0;
  let r = line.length - 1;

  for (l; l < line.length; l++) {
    if (isCharacterValidNumber(line[l])) {
      break;
    }
  }

  for (r; r >= 0; r--) {
    if (isCharacterValidNumber(line[r])) {
      break;
    }
  }

  return Number(line[l] + line[r]);
}

export function getPart1(input: string[]): number {
  return sum(input.map(getCallibrationValueFromLine));
}

console.log(getPart1(INPUT));
