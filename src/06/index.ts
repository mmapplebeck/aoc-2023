import { join } from "path";

import { getInput } from "../utils";

const INPUT = getInput(join(__dirname, "input.txt"));

interface Record {
  distance: number;
  time: number;
}

function parseLineWithMultipleRecords(line: string): number[] {
  return line
    .replace(/  +/g, " ")
    .split(":")[1]
    .trim()
    .split(" ")
    .map((str) => Number(str));
}

function parseLineWithSingleRecord(line: string): number {
  return Number(line.replace(/  +/g, "").split(":")[1]);
}

function getRecords(input: string[]): Record[] {
  const times = parseLineWithMultipleRecords(input[0]);
  const distances = parseLineWithMultipleRecords(input[1]);

  return times.map((time, i): Record => ({ time, distance: distances[i] }));
}

function getActualRecord(input: string[]): Record {
  return {
    time: parseLineWithSingleRecord(input[0]),
    distance: parseLineWithSingleRecord(input[1]),
  };
}

function getDistance(buttonPressTime: number, raceTime: number): number {
  return buttonPressTime * (raceTime - buttonPressTime);
}

function checkWin(buttonPressTime: number, record: Record): boolean {
  return getDistance(buttonPressTime, record.time) > record.distance;
}

function countWaysToWin(record: Record): number {
  let count = 0;

  for (let i = 1; i < record.time; i++) {
    count += checkWin(i, record) ? 1 : 0;
  }

  return count;
}

function findFirstWin(record: Record, start: number, end: number): number {
  if (end - start <= 0) {
    return -1;
  }

  const middle = start + Math.floor((end - start) / 2);
  const isMiddleWinning = checkWin(middle, record);
  const isPreviousWinning = checkWin(middle - 1, record);
  const foundStart = isMiddleWinning && !isPreviousWinning;

  if (foundStart) {
    return middle;
  }

  return isMiddleWinning
    ? findFirstWin(record, start, middle - 1)
    : findFirstWin(record, middle + 1, end);
}

function findLastWin(record: Record, start: number, end: number): number {
  if (end - start <= 0) {
    return -1;
  }

  const middle = start + Math.floor((end - start) / 2);
  const isMiddleWinning = checkWin(middle, record);
  const isNextWinning = checkWin(middle + 1, record);
  const foundEnd = isMiddleWinning && !isNextWinning;

  if (foundEnd) {
    return middle;
  }

  return isMiddleWinning
    ? findLastWin(record, middle + 1, end)
    : findLastWin(record, start, middle - 1);
}

function findWin(record: Record, start = 1, end = record.distance - 1): number {
  if (end - start <= 0) {
    return -1;
  }

  const middle = start + Math.floor((end - start) / 2);

  if (checkWin(middle, record)) {
    return middle;
  }

  return getDistance(start, record.time) < getDistance(middle, record.time)
    ? findWin(record, middle + 1, end)
    : findWin(record, start, middle - 1);
}

function countWaysToWinBinarySearch(record: Record): number {
  const win = findWin(record);
  const firstWin = findFirstWin(record, 1, win - 1);
  const lastWin = findLastWin(record, win + 1, record.distance - 1);

  return lastWin - firstWin + 1;
}

function getPart1(input: string[]): number {
  return getRecords(input)
    .map(countWaysToWin)
    .reduce((acc, ways) => acc * ways, 1);
}

function getPart2(input: string[]): number {
  return countWaysToWinBinarySearch(getActualRecord(input));
}

console.log(getPart1(INPUT), getPart2(INPUT));
