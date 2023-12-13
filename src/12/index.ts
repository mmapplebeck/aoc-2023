import sum from "lodash/sum";
import { join } from "path";

import { getInput } from "../utils";

const INPUT = getInput(join(__dirname, "input.txt"));

interface Line {
  springs: string;
  groupSizes: number[];
}

function getLines(input: string[]): Line[] {
  return input.map(
    (line): Line => ({
      springs: line.split(" ")[0],
      groupSizes: line
        .split(" ")[1]
        .split(",")
        .map((str) => Number(str)),
    })
  );
}

function getPermutations(str: string): string[] {
  if (str.length === 0) {
    return [""];
  }

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "?") {
      const prefix = str.slice(0, i);

      const futurePermutations = getPermutations(str.slice(i + 1));

      return [
        ...futurePermutations.map((perm) => prefix + "." + perm),
        ...futurePermutations.map((perm) => prefix + "#" + perm),
      ];
    }
  }

  return [str];
}

function getValidPermutations(line: Line): string[] {
  return getPermutations(line.springs).filter((permutation) =>
    isValidPermutation(permutation, line)
  );
}

function isValidPermutation(permutation: string, line: Line): boolean {
  let i = 0;
  const groupSizes: number[] = [];
  let currentGroupCount = 0;

  while (i < permutation.length) {
    if (permutation[i] === "#") {
      currentGroupCount++;
    } else if (permutation[i] === "." && currentGroupCount) {
      groupSizes.push(currentGroupCount);
      currentGroupCount = 0;
    }

    i++;
  }

  if (currentGroupCount) {
    groupSizes.push(currentGroupCount);
  }

  return groupSizes.join(",") === line.groupSizes.join(",");
}

function getPart1(input: string[]): number {
  const lines = getLines(input);

  return sum(
    lines.map((line) => {
      const validPermutations = getValidPermutations(line);
      return validPermutations.length;
    })
  );
}

console.log(getPart1(INPUT));
