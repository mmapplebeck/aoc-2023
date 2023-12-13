import sum from "lodash/sum";
import zip from "lodash/zip";
import { join } from "path";

import { getRawInput } from "../utils";

type Pattern = string[][];

const INPUT = getRawInput(join(__dirname, "input.txt"));

function getPatterns(input: string): Pattern[] {
  return input
    .split("\n\n")
    .map((pattern) => pattern.split("\n").map((row) => row.split("")));
}

function getColMirrorIndex(pattern: Pattern): number {
  return getRowMirrorIndex(zip(...pattern));
}

function getRowMirrorIndex(pattern: Pattern): number {
  for (let i = 0; i < pattern.length - 1; i++) {
    let l = i;
    let r = i + 1;
    let isMirror = true;

    while (l >= 0 && r < pattern.length) {
      if (pattern[l--].join("") !== pattern[r++].join("")) {
        isMirror = false;
        break;
      }
    }

    if (isMirror) {
      return i;
    }
  }

  return -1;
}

function scorePattern(pattern: Pattern): number {
  const colMirrorIndex = getColMirrorIndex(pattern);
  const rowMirrorIndex = getRowMirrorIndex(pattern);
  const colScore = colMirrorIndex !== -1 ? colMirrorIndex + 1 : 0;
  const rowScore = rowMirrorIndex !== -1 ? 100 * (rowMirrorIndex + 1) : 0;

  return colScore + rowScore;
}

function getPart1(input: string): number {
  return sum(getPatterns(input).map(scorePattern));
}

console.log(getPart1(INPUT));
