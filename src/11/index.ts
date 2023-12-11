import sum from "lodash/sum";
import zip from "lodash/zip";
import { join } from "path";

import { getInput } from "../utils";

const INPUT = getInput(join(__dirname, "input.txt"));

interface Point {
  row: number;
  col: number;
}

interface Pair {
  sourceId: string;
  destinationId: string;
  emptyRowsBetween: number;
  emptyColsBetween: number;
}

function getImage(input: string[]): string[][] {
  return input.map((row) => row.split(""));
}

function getEmptyIndexes(image: string[][]): number[][] {
  const emptyRowIndexes = image.reduce((acc, row, i) => {
    if (row.every((col) => col === ".")) {
      acc.push(i);
    }
    return acc;
  }, [] as number[]);

  const emptyColIndexes = zip(...image).reduce((acc, row, i) => {
    if (row.every((col) => col === ".")) {
      acc.push(i);
    }
    return acc;
  }, [] as number[]);

  return [emptyRowIndexes, emptyColIndexes];
}

function getGalaxyPositions(image: string[][]): Record<string, Point> {
  const positions: Record<string, Point> = {};

  for (let row = 0; row < image.length; row++) {
    for (let col = 0; col < image[row].length; col++) {
      if (image[row][col] !== "#") {
        continue;
      }

      positions[Object.keys(positions).length + 1] = {
        row,
        col,
      };
    }
  }

  return positions;
}

function getPairs(
  positions: Record<string, Point>,
  emptyIndexes: number[][]
): Pair[] {
  return Object.keys(positions).reduce((acc, sourceId, i) => {
    Object.keys(positions)
      .slice(i + 1)
      .forEach((destinationId) => {
        const source = positions[sourceId];
        const destination = positions[destinationId];
        acc.push({
          sourceId,
          destinationId,
          emptyRowsBetween: emptyIndexes[0].filter(
            (emptyRowIndex) =>
              emptyRowIndex > Math.min(source.row, destination.row) &&
              emptyRowIndex < Math.max(source.row, destination.row)
          ).length,
          emptyColsBetween: emptyIndexes[1].filter(
            (emptyColIndex) =>
              emptyColIndex > Math.min(source.col, destination.col) &&
              emptyColIndex < Math.max(source.col, destination.col)
          ).length,
        });
      });

    return acc;
  }, [] as Pair[]);
}

function getMinDistance(
  positions: Record<string, Point>,
  pair: Pair,
  expansionMultiplier: number
): number {
  const source = positions[pair.sourceId];
  const destination = positions[pair.destinationId];
  const rowAdjustment = pair.emptyRowsBetween * (expansionMultiplier - 1);
  const colAdjustment = pair.emptyColsBetween * (expansionMultiplier - 1);

  return (
    Math.abs(source.row - destination.row) +
    rowAdjustment +
    Math.abs(source.col - destination.col) +
    colAdjustment
  );
}

function getPart1(input: string[]) {
  const image = getImage(input);
  const positions = getGalaxyPositions(image);
  const pairs = getPairs(positions, getEmptyIndexes(image));

  return sum(pairs.map((pair) => getMinDistance(positions, pair, 2)));
}

function getPart2(input: string[]) {
  const image = getImage(input);
  const positions = getGalaxyPositions(image);
  const pairs = getPairs(positions, getEmptyIndexes(image));

  return sum(pairs.map((pair) => getMinDistance(positions, pair, 1000000)));
}

console.log(getPart1(INPUT), getPart2(INPUT));
