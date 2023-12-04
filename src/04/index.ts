import sum from "lodash/sum";
import { join } from "path";

import { getInput } from "../utils";

const INPUT = getInput(join(__dirname, "input.txt"));

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

function getMatchCount(card: Card): number {
  const winningNumbers = new Set(card.winningNumbers);

  const matchCount = card.numbers.reduce(
    (acc, number) => (winningNumbers.has(number) ? acc + 1 : acc),
    0
  );

  return matchCount;
}

function scoreCard(card: Card): number {
  const matchCount = getMatchCount(card);

  return matchCount ? 2 ** (matchCount - 1) : 0;
}

function getPart1(input: string[]) {
  return sum(getCards(input).map(scoreCard));
}

function getMemoKey(start: number, end: number) {
  return `${start}_${end}`;
}

function countCards(
  cards: Card[],
  start = 0,
  end = cards.length,
  memo: Record<string, number> = {}
): number {
  const memoKey = getMemoKey(start, end);

  if (memo[memoKey] === undefined) {
    let sum = 0;

    for (let c = start; c < end; c++) {
      const matchCount = getMatchCount(cards[c]);

      sum += 1 + countCards(cards, c + 1, c + 1 + matchCount, memo);
    }

    memo[memoKey] = sum;
  }

  return memo[memoKey];
}

function getPart2(input: string[]): number {
  return countCards(getCards(input));
}

console.log(getPart1(INPUT), getPart2(INPUT));
