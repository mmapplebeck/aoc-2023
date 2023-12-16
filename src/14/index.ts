import { join } from "path";

import { getRawInput } from "../utils";

type Grid = string[][];

const INPUT = getRawInput(join(__dirname, "input.txt"));

function getGrid(input: string): Grid {
  return input.split("\n").map((row) => row.split(""));
}

function tiltNorth(grid: Grid): Grid {
  for (let r = 1; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === "O") {
        let currentRow = r;

        while (currentRow > 0 && grid[currentRow - 1][c] === ".") {
          grid[currentRow - 1][c] = "O";
          grid[currentRow][c] = ".";
          currentRow = currentRow - 1;
        }
      }
    }
  }

  return grid;
}

function tiltSouth(grid: Grid): Grid {
  for (let r = grid.length - 2; r >= 0; r--) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === "O") {
        let currentRow = r;

        while (
          currentRow < grid.length - 1 &&
          grid[currentRow + 1][c] === "."
        ) {
          grid[currentRow + 1][c] = "O";
          grid[currentRow][c] = ".";
          currentRow = currentRow + 1;
        }
      }
    }
  }

  return grid;
}

function tiltEast(grid: Grid): Grid {
  for (let c = grid[0].length - 2; c >= 0; c--) {
    for (let r = 0; r < grid.length; r++) {
      if (grid[r][c] === "O") {
        let currentCol = c;

        while (
          currentCol < grid[0].length - 1 &&
          grid[r][currentCol + 1] === "."
        ) {
          grid[r][currentCol + 1] = "O";
          grid[r][currentCol] = ".";
          currentCol = currentCol + 1;
        }
      }
    }
  }

  return grid;
}

function tiltWest(grid: Grid): Grid {
  for (let c = 1; c < grid[0].length; c++) {
    for (let r = 0; r < grid.length; r++) {
      if (grid[r][c] === "O") {
        let currentCol = c;

        while (currentCol > 0 && grid[r][currentCol - 1] === ".") {
          grid[r][currentCol - 1] = "O";
          grid[r][currentCol] = ".";
          currentCol = currentCol - 1;
        }
      }
    }
  }

  return grid;
}

function cycle(grid: Grid): Grid {
  tiltNorth(grid);
  tiltWest(grid);
  tiltSouth(grid);
  tiltEast(grid);

  return grid;
}

function calculateLoad(grid: Grid): number {
  return grid.reduce(
    (acc, row, i) =>
      acc + row.filter((col) => col === "O").length * (grid.length - i),
    0
  );
}

function getPart1(input: string): number {
  return calculateLoad(tiltNorth(getGrid(input)));
}

function serialize(grid: Grid): string {
  return grid.flatMap((row) => row.join("")).join("_");
}

function deserialize(serialized: string): Grid {
  return serialized.split("_").map((row) => row.split(""));
}

function getPart2(input: string): number {
  const grid = getGrid(input);
  const n = 1000000000;
  const matches = new Set();
  const cache: string[] = [];
  let i = 0;
  let startOfCycle = 0;

  while (i < n) {
    cycle(grid);

    const serialized = serialize(grid);

    if (matches.has(serialized)) {
      startOfCycle = cache.findIndex(
        (perviouslySerialized) => perviouslySerialized === serialized
      );

      break;
    }

    cache[i] = serialized;
    matches.add(serialized);

    i++;
  }

  const cycleSize = matches.size - startOfCycle;

  return calculateLoad(
    deserialize(cache[startOfCycle + ((n - startOfCycle) % cycleSize) - 1])
  );
}

console.log(getPart1(INPUT), getPart2(INPUT));
