import sum from "lodash/sum";
import { join } from "path";

import { getInput } from "../utils";

const INPUT = getInput(join(__dirname, "example-input.txt"));

interface Card {
  numbers: number[];
  winningNumbers: number[];
}

function getCards(input: string[]): Card[] {
  return input.map((line): Card => {
    const [_cardLabel, numberLists] = line.split(":");
    const [winningNumbers, numbers] = numberLists
      .trim()
      .split("|")
      .map((str) => str.trim())
      .map((str) =>
        str
          .split(" ")
          .filter((str) => str !== "")
          .map((str) => Number(str))
      );

    return {
      numbers,
      winningNumbers,
    };
  });
}

function scoreCard(card: Card): number {
  const winningNumbers = new Set(card.winningNumbers);

  const matchCount = card.numbers.reduce(
    (acc, number) => (winningNumbers.has(number) ? acc + 1 : acc),
    0
  );

  return matchCount ? 2 ** (matchCount - 1) : 0;
}

function getPart1(input: string[]) {
  return sum(getCards(input).map(scoreCard));
}

console.log(getPart1(INPUT));
