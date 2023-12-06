import { join } from "path";

import { getInput } from "../utils";

const INPUT = getInput(join(__dirname, "input.txt"));

interface Record {
  distance: number;
  time: number;
}

function formatLine(line: string): number[] {
  return line
    .replace(/  +/g, " ")
    .split(":")[1]
    .trim()
    .split(" ")
    .map((str) => Number(str));
}

function getRecords(input: string[]): Record[] {
  const times = formatLine(input[0]);
  const distances = formatLine(input[1]);

  return times.map((time, i): Record => ({ time, distance: distances[i] }));
}

function countWaysToWin(record: Record): number {
  let count = 0;

  for (let i = 1; i < record.time; i++) {
    count += i * (record.time - i) > record.distance ? 1 : 0;
  }

  return count;
}

function getPart1(input: string[]): number {
  return getRecords(input)
    .map(countWaysToWin)
    .reduce((acc, ways) => acc * ways, 1);
}

console.log(getPart1(INPUT));
