import sum from "lodash/sum";
import { join } from "path";

import { getInput } from "../utils";

const INPUT = getInput(join(__dirname, "input.txt"));

type Card =
  | "A"
  | "K"
  | "Q"
  | "J"
  | "T"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2"
  | "1";

interface Hand {
  cards: Card[];
  bid: number;
  type: HandType;
}

type HandType =
  | "FiveOfAKind"
  | "FourOfAKind"
  | "FullHouse"
  | "ThreeOfAKind"
  | "TwoPair"
  | "OnePair"
  | "HighCard";

const HandValues: Record<HandType, number> = {
  FiveOfAKind: 7,
  FourOfAKind: 6,
  FullHouse: 5,
  ThreeOfAKind: 4,
  TwoPair: 3,
  OnePair: 2,
  HighCard: 1,
};

const CardValues: Record<Card, number> = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
  "1": 1,
};

function getCardValue(card: Card, useJokers: boolean): number {
  return useJokers && card === "J" ? 0 : CardValues[card];
}

function getHands(input: string[], useJokers = false): Hand[] {
  return input.map((line): Hand => {
    const [cardsStr, bidStr] = line.split(" ");
    const cards = cardsStr.split("") as Card[];

    return {
      cards,
      bid: Number(bidStr),
      type: getHandType(cards, useJokers),
    };
  });
}

export function getHandType(cards: Card[], useJokers = false): HandType {
  const counts = cards.reduce(
    (acc, card) => {
      if (!acc[card]) {
        acc[card] = 0;
      }

      acc[card]++;

      return acc;
    },
    {} as Record<Card, number>
  );

  const uniqueCardCount = Object.keys(counts).length;
  const jokerCount = useJokers ? counts["J"] : 0;
  const countSet = new Set(Object.values(counts));

  if (uniqueCardCount === 1 || (uniqueCardCount === 2 && jokerCount > 0)) {
    return "FiveOfAKind";
  }

  if (uniqueCardCount === 2 || (uniqueCardCount === 3 && jokerCount > 0)) {
    return countSet.has(4) ||
      (countSet.has(3) && jokerCount > 0) ||
      (countSet.has(2) && jokerCount == 2)
      ? "FourOfAKind"
      : "FullHouse";
  }

  if (uniqueCardCount === 3 || (uniqueCardCount === 4 && jokerCount > 0)) {
    return countSet.has(3) || (countSet.has(2) && jokerCount > 0)
      ? "ThreeOfAKind"
      : "TwoPair";
  }

  if (uniqueCardCount === 4 || (uniqueCardCount === 5 && jokerCount === 1)) {
    return "OnePair";
  }

  return "HighCard";
}

function handComparitor(a: Hand, b: Hand, useJokers = false): number {
  if (HandValues[a.type] !== HandValues[b.type]) {
    return HandValues[a.type] - HandValues[b.type];
  }

  for (let i = 0; i < 5; i++) {
    const cardValueA = getCardValue(a.cards[i], useJokers);
    const cardValueB = getCardValue(b.cards[i], useJokers);

    if (cardValueA !== cardValueB) {
      return cardValueA - cardValueB;
    }
  }

  return 0;
}

function getPart1(input: string[]): number {
  return sum(
    getHands(input)
      .sort(handComparitor)
      .map(({ bid }, i) => bid * (i + 1))
  );
}

function getPart2(input: string[]): number {
  return sum(
    getHands(input, true)
      .sort((a: Hand, b: Hand) => handComparitor(a, b, true))
      .map(({ bid }, i) => bid * (i + 1))
  );
}

console.log(getPart1(INPUT), getPart2(INPUT));
