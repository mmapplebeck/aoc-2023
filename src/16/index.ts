import sum from "lodash/sum";
import { join } from "path";

import { getRawInput } from "../utils";

const INPUT = getRawInput(join(__dirname, "input.txt"));

type Grid = string[][];

type Direction = "N" | "S" | "E" | "W";

interface Point {
  row: number;
  col: number;
}

function getBeamKey({ row, col }: Point, direction: Direction): string {
  return `${row}_${col}_${direction}`;
}

function isValidPosition({ row, col }: Point, grid: Grid): boolean {
  return grid[row]?.[col] !== undefined;
}

function fireBeam(
  position: Point,
  direction: Direction,
  grid: Grid,
  seen: Set<string>
): Grid {
  let currentPosition = position;
  let currentDirection = direction;

  while (
    isValidPosition(currentPosition, grid) &&
    !seen.has(getBeamKey(currentPosition, currentDirection))
  ) {
    seen.add(getBeamKey(currentPosition, currentDirection));

    const currentTile = grid[currentPosition.row][currentPosition.col];

    if (currentTile === "\\") {
      if (currentDirection === "N") {
        currentDirection = "W";
      } else if (currentDirection === "S") {
        currentDirection = "E";
      } else if (currentDirection === "E") {
        currentDirection = "S";
      } else if (currentDirection === "W") {
        currentDirection = "N";
      }
    } else if (currentTile === "/") {
      if (currentDirection === "N") {
        currentDirection = "E";
      } else if (currentDirection === "S") {
        currentDirection = "W";
      } else if (currentDirection === "E") {
        currentDirection = "N";
      } else if (currentDirection === "W") {
        currentDirection = "S";
      }
    } else if (currentTile === "|") {
      if (currentDirection === "E" || currentDirection === "W") {
        seen.add(getBeamKey(currentPosition, "N"));
        fireBeam(
          {
            row: currentPosition.row - 1,
            col: currentPosition.col,
          },
          "N",
          grid,
          seen
        );
        seen.add(getBeamKey(currentPosition, "S"));
        fireBeam(
          {
            row: currentPosition.row + 1,
            col: currentPosition.col,
          },
          "S",
          grid,
          seen
        );
        break;
      }
    } else if (currentTile === "-") {
      if (currentDirection === "N" || currentDirection === "S") {
        seen.add(getBeamKey(currentPosition, "E"));
        fireBeam(
          {
            row: currentPosition.row,
            col: currentPosition.col + 1,
          },
          "E",
          grid,
          seen
        );
        seen.add(getBeamKey(currentPosition, "W"));
        fireBeam(
          {
            row: currentPosition.row,
            col: currentPosition.col - 1,
          },
          "W",
          grid,
          seen
        );
        break;
      }
    }

    if (currentDirection === "N") {
      currentPosition = {
        row: currentPosition.row - 1,
        col: currentPosition.col,
      };
    } else if (currentDirection === "S") {
      currentPosition = {
        row: currentPosition.row + 1,
        col: currentPosition.col,
      };
    } else if (currentDirection === "E") {
      currentPosition = {
        row: currentPosition.row,
        col: currentPosition.col + 1,
      };
    } else if (currentDirection === "W") {
      currentPosition = {
        row: currentPosition.row,
        col: currentPosition.col - 1,
      };
    }
  }

  return grid;
}

function countEnergizedTiles(seenBeamKeys: Set<string>): number {
  return new Set(
    Array.from(seenBeamKeys).map((key) => key.slice(0, key.length - 2))
  ).size;
}

function getGrid(input: string): Grid {
  return input.split("\n").map((row) => row.split(""));
}

function getPart1(input: string): number {
  const seen: Set<string> = new Set();

  fireBeam({ row: 0, col: 0 }, "E", getGrid(input), seen);

  return countEnergizedTiles(seen);
}

function getPart2(input: string): number {
  const grid = getGrid(input);
  const seen: Set<string> = new Set();

  let maxCount = -Infinity;

  for (let i = 0; i < grid.length; i++) {
    seen.clear();
    fireBeam({ row: 0, col: i }, "S", grid, seen);
    maxCount = Math.max(maxCount, countEnergizedTiles(seen));
    seen.clear();
    fireBeam({ row: grid.length - 1, col: i }, "N", grid, seen);
    maxCount = Math.max(maxCount, countEnergizedTiles(seen));
  }

  for (let i = 0; i < grid.length; i++) {
    seen.clear();
    fireBeam({ row: i, col: 0 }, "E", grid, seen);
    maxCount = Math.max(maxCount, countEnergizedTiles(seen));
    seen.clear();
    fireBeam({ row: i, col: grid[i].length - 1 }, "W", grid, seen);
    maxCount = Math.max(maxCount, countEnergizedTiles(seen));
  }

  return maxCount;
}

console.log(getPart1(INPUT), getPart2(INPUT));
