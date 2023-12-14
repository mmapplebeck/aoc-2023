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

function getColMirrorIndex(pattern: Pattern, ignore?: number): number {
  return getRowMirrorIndex(zip(...pattern), ignore);
}

function getRowMirrorIndex(pattern: Pattern, ignore?: number): number {
  for (let i = 0; i < pattern.length - 1; i++) {
    if (i === ignore) {
      continue;
    }

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

function scorePattern(pattern: Pattern, checkSmudge = false): number {
  const colMirrorIndex = getColMirrorIndex(pattern);
  const rowMirrorIndex = getRowMirrorIndex(pattern);
  let finalColMirrorIndex = colMirrorIndex;
  let finalRowMirrorIndex = rowMirrorIndex;
  let foundSmudgeReflection = false;

  if (checkSmudge) {
    for (let i = 0; i < pattern.length; i++) {
      for (let j = 0; j < pattern[i].length; j++) {
        const original = pattern[i][j];

        pattern[i][j] = original === "." ? "#" : ".";

        const smudgeColMirrorIndex = getColMirrorIndex(pattern, colMirrorIndex);
        const smudgeRowMirrorIndex = getRowMirrorIndex(pattern, rowMirrorIndex);

        if (smudgeColMirrorIndex !== -1 || smudgeRowMirrorIndex !== -1) {
          finalColMirrorIndex = smudgeColMirrorIndex;
          finalRowMirrorIndex = smudgeRowMirrorIndex;
          foundSmudgeReflection = true;
          break;
        }

        pattern[i][j] = original;
      }
      if (foundSmudgeReflection) {
        break;
      }
    }
  }

  const colScore = finalColMirrorIndex !== -1 ? finalColMirrorIndex + 1 : 0;
  const rowScore =
    finalRowMirrorIndex !== -1 ? 100 * (finalRowMirrorIndex + 1) : 0;

  return colScore + rowScore;
}

function getPart1(input: string): number {
  return sum(getPatterns(input).map((pattern) => scorePattern(pattern)));
}

function getPart2(input: string): number {
  return sum(getPatterns(input).map((pattern) => scorePattern(pattern, true)));
}

console.log(getPart1(INPUT), getPart2(INPUT));
