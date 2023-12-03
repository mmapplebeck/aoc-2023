import sum from "lodash/sum";
import { join } from "path";

import { getInput } from "../utils";

const INPUT = getInput(join(__dirname, "input.txt"));

export interface Position {
  row: number;
  column: number;
}

export interface SchematicNumber {
  value: number;
  start: Position;
  end: Position;
}

type Grid = string[][];

export function getGrid(input: string[]): Grid {
  const grid: Grid = [];

  for (const line of input) {
    grid.push(line.split(""));
  }

  return grid;
}

export function isSymbol(str: string | undefined): boolean {
  return str !== undefined && isNaN(Number(str)) && str !== ".";
}

export function isPartNumber(
  schematicNumber: SchematicNumber,
  grid: Grid
): boolean {
  return getSurroundingPositions(schematicNumber).some(({ row, column }) =>
    isSymbol(grid?.[row]?.[column])
  );
}

export function getSurroundingPositions(
  schematicNumber: SchematicNumber
): Position[] {
  const positions: Position[] = [];

  for (
    let c = schematicNumber.start.column - 1;
    c <= schematicNumber.end.column + 1;
    c++
  ) {
    positions.push({
      row: schematicNumber.start.row - 1,
      column: c,
    });

    positions.push({
      row: schematicNumber.start.row + 1,
      column: c,
    });
  }

  positions.push({
    row: schematicNumber.start.row,
    column: schematicNumber.start.column - 1,
  });

  positions.push({
    row: schematicNumber.end.row,
    column: schematicNumber.end.column + 1,
  });

  return positions;
}

export function getSchematicNumbers(grid: Grid): SchematicNumber[] {
  const numbers: SchematicNumber[] = [];

  for (let r = 0; r < grid.length; r++) {
    let c = -1;
    let numberStartingIndex: number | undefined = undefined;

    while (c < grid[r].length) {
      if (isNaN(Number(grid[r][c + 1]))) {
        if (numberStartingIndex !== undefined) {
          const number = Number(
            grid[r].slice(numberStartingIndex, c + 1).join("")
          );
          numbers.push({
            value: number,
            start: {
              row: r,
              column: numberStartingIndex,
            },
            end: {
              row: r,
              column: c,
            },
          });

          numberStartingIndex = undefined;
        }
      } else if (numberStartingIndex === undefined) {
        numberStartingIndex = c + 1;
      }

      c++;
    }
  }

  return numbers;
}

export function getPart1(input: string[]): number {
  const grid = getGrid(input);

  return sum(
    getSchematicNumbers(grid)
      .filter((number) => isPartNumber(number, grid))
      .map(({ value }) => value)
  );
}

console.log(getPart1(INPUT));
