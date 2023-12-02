import sum from "lodash/sum";
import { join } from "path";

import { getInput } from "../utils";

const INPUT = getInput(join(__dirname, "input.txt"));

interface Count {
  red: number;
  green: number;
  blue: number;
}

interface Game {
  id: number;
  counts: Count[];
}

const gameIdRegex = new RegExp(/^Game ([1-9]\d*)/);
const redRegex = new RegExp(/(([1-9]\d*) red)/);
const greenRegex = new RegExp(/(([1-9]\d*) green)/);
const blueRegex = new RegExp(/(([1-9]\d*) blue)/);

export function getGames(input: string[]): Game[] {
  return input.map((line): Game => {
    const [gameLabel, counts] = line.split(":");

    const gameId = gameLabel.match(gameIdRegex)[1];

    return {
      id: Number(gameId),
      counts: counts.split(";").map(
        (count): Count => ({
          red: Number(count.match(redRegex)?.[2] || 0),
          green: Number(count.match(greenRegex)?.[2] || 0),
          blue: Number(count.match(blueRegex)?.[2] || 0),
        })
      ),
    };
  });
}

export function findPossibleGames(games: Game[], totalCount: Count): Game[] {
  return games.filter((game) =>
    game.counts.every(
      ({ red, green, blue }) =>
        red <= totalCount.red &&
        green <= totalCount.green &&
        blue <= totalCount.blue
    )
  );
}

export function findMaxCountsFromGames(games: Game[]): Count[] {
  return games.map(({ counts }) => {
    return counts.reduce(
      (acc, { red, green, blue }) => ({
        red: Math.max(red, acc.red),
        green: Math.max(green, acc.green),
        blue: Math.max(blue, acc.blue),
      }),
      { red: 0, green: 0, blue: 0 }
    );
  });
}

export function powerCount({ red, green, blue }: Count): number {
  return red * green * blue;
}

export function getPart1(input: string[], totalCount: Count): number {
  return sum(
    findPossibleGames(getGames(input), totalCount).map(({ id }) => id)
  );
}

export function getPart2(input: string[]): number {
  return sum(findMaxCountsFromGames(getGames(input)).map(powerCount));
}

console.log(getPart1(INPUT, { red: 12, green: 13, blue: 14 }), getPart2(INPUT));
