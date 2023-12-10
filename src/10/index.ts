import { join } from "path";

import { getInput } from "../utils";

const INPUT = getInput(join(__dirname, "input.txt"));

type PipeType = "|" | "-" | "L" | "J" | "7" | "F" | "S";

type Direction = "N" | "S" | "E" | "W";

interface Position {
  row: number;
  column: number;
}

const AccessiblePipesByDirection: Record<Direction, Set<PipeType>> = {
  N: new Set(["|", "7", "F", "S"]),
  S: new Set(["|", "L", "J", "S"]),
  E: new Set(["-", "J", "7", "S"]),
  W: new Set(["-", "L", "F", "S"]),
};

const AccessibleDirectionsByPipe: Record<PipeType, Set<Direction>> = {
  "|": new Set(["N", "S"]),
  "-": new Set(["E", "W"]),
  L: new Set(["N", "E"]),
  J: new Set(["N", "W"]),
  "7": new Set(["W", "S"]),
  F: new Set(["E", "S"]),
  S: new Set(["N", "S", "E", "W"]),
};

function canContinue(
  source: PipeType,
  destination: PipeType,
  direction: Direction
): boolean {
  return (
    AccessibleDirectionsByPipe[source].has(direction) &&
    AccessiblePipesByDirection[direction].has(destination)
  );
}

function getNeighborPosition(
  { row, column }: Position,
  direction: Direction
): Position {
  switch (direction) {
    case "N":
      return {
        row: row - 1,
        column,
      };
    case "S":
      return {
        row: row + 1,
        column,
      };
    case "E":
      return {
        row,
        column: column + 1,
      };
    case "W":
      return {
        row,
        column: column - 1,
      };
  }
}

function getOppositeDirection(direction: Direction): Direction {
  switch (direction) {
    case "N":
      return "S";
    case "S":
      return "N";
    case "E":
      return "W";
    case "W":
      return "E";
  }
}

interface Step {
  position: Position;
  comingFrom: Direction | undefined;
  count: number;
}

function getDistanceToLoopMidPoint(grid: string[][]): number {
  const stack: Step[] = [
    {
      position: getStartingPosition(grid),
      comingFrom: undefined,
      count: 0,
    },
  ];

  while (stack.length) {
    const { position, comingFrom, count } = stack.pop();

    const current = grid[position.row][position.column];

    if (comingFrom && current === "S") {
      return count / 2;
    }

    (["N", "E", "S", "W"] as Direction[])
      .filter((direction) => direction !== comingFrom)
      .forEach((direction) => {
        const neighborPosition = getNeighborPosition(position, direction);
        const neighbor = grid[neighborPosition.row]?.[neighborPosition.column];

        if (neighbor === undefined || neighbor === ".") {
          return;
        }

        if (
          canContinue(
            grid[position.row][position.column] as PipeType,
            neighbor as PipeType,
            direction
          )
        ) {
          stack.push({
            position: neighborPosition,
            comingFrom: getOppositeDirection(direction),
            count: count + 1,
          });
        }
      });
  }

  return -1;
}

function getGrid(lines: string[]): string[][] {
  const grid: string[][] = [];

  for (const line of lines) {
    grid.push(line.split(""));
  }

  return grid;
}

function getStartingPosition(grid: string[][]): Position {
  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      if (grid[row][column] === "S") {
        return {
          row,
          column,
        };
      }
    }
  }
}

function getPart1(input: string[]): number {
  return getDistanceToLoopMidPoint(getGrid(input));
}

console.log(getPart1(INPUT));
