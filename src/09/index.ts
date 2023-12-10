import sum from "lodash/sum";
import { join } from "path";

import { getInput } from "../utils";

const INPUT = getInput(join(__dirname, "input.txt"));

function extrapolate(history: number[]): number[][] {
  let currentHistory: number[] = history;
  let nextPrediction: number[] = [];
  const extrapolated: number[][] = [history];

  while (currentHistory.length > 1) {
    let allZeroes = true;

    for (let i = 0; i < currentHistory.length - 1; i++) {
      const reading = currentHistory[i + 1] - currentHistory[i];
      nextPrediction.push(reading);
      if (reading !== 0) {
        allZeroes = false;
      }
    }

    if (allZeroes) {
      break;
    }

    extrapolated.push(nextPrediction);
    currentHistory = nextPrediction;
    nextPrediction = [];
  }

  return extrapolated;
}

function predict(extrapolation: number[][]): number {
  const lastRow = extrapolation[extrapolation.length - 1];
  let prediction = lastRow[lastRow.length - 1];

  for (let i = extrapolation.length - 2; i >= 0; i--) {
    prediction += extrapolation[i][extrapolation[i].length - 1];
  }

  return prediction;
}

function predictBackwards(extrapolation: number[][]): number {
  const lastRow = extrapolation[extrapolation.length - 1];
  let prediction = lastRow[0];

  for (let i = extrapolation.length - 2; i >= 0; i--) {
    prediction = extrapolation[i][0] - prediction;
  }

  return prediction;
}

function getHistories(input: string[]): number[][] {
  return input.map((line) => line.split(" ").map((str) => Number(str)));
}

function getPart1(input: string[]) {
  return sum(
    getHistories(input).map((history) => predict(extrapolate(history)))
  );
}

function getPart2(input: string[]) {
  return sum(
    getHistories(input).map((history) => predictBackwards(extrapolate(history)))
  );
}

console.log(getPart1(INPUT), getPart2(INPUT));
