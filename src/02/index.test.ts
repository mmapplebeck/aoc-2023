import {
  findMaxCountsFromGames,
  findPossibleGames,
  getGames,
  getPart1,
  getPart2,
  powerCount,
} from ".";

describe("Day 2", () => {
  const exampleInput = [
    "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
    "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
    "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
    "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
    "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
  ];

  describe("getGames", () => {
    it("gets a Game from a line", () => {
      expect(getGames(exampleInput)).toStrictEqual([
        {
          id: 1,
          counts: [
            {
              blue: 3,
              red: 4,
              green: 0,
            },
            {
              red: 1,
              green: 2,
              blue: 6,
            },
            {
              green: 2,
              blue: 0,
              red: 0,
            },
          ],
        },
        {
          id: 2,
          counts: [
            {
              blue: 1,
              green: 2,
              red: 0,
            },
            {
              green: 3,
              blue: 4,
              red: 1,
            },
            {
              green: 1,
              blue: 1,
              red: 0,
            },
          ],
        },
        {
          id: 3,
          counts: [
            {
              green: 8,
              blue: 6,
              red: 20,
            },
            {
              blue: 5,
              red: 4,
              green: 13,
            },
            {
              green: 5,
              red: 1,
              blue: 0,
            },
          ],
        },
        {
          id: 4,
          counts: [
            {
              green: 1,
              red: 3,
              blue: 6,
            },
            {
              green: 3,
              red: 6,
              blue: 0,
            },
            {
              green: 3,
              blue: 15,
              red: 14,
            },
          ],
        },
        {
          id: 5,
          counts: [
            {
              red: 6,
              blue: 1,
              green: 3,
            },
            {
              blue: 2,
              red: 1,
              green: 2,
            },
          ],
        },
      ]);
    });

    it("handles multi-digit game ids", () => {
      expect(getGames(["Game 25: 3 blue"])[0].id).toBe(25);
    });
  });

  describe("findPossibleGames", () => {
    it("returns the possible games", () => {
      expect(
        findPossibleGames(getGames(exampleInput), {
          red: 12,
          green: 13,
          blue: 14,
        }).map(({ id }) => id)
      ).toStrictEqual([1, 2, 5]);
    });
  });

  describe("getPart1", () => {
    it("gets the sum of the ids of the possible games", () => {
      expect(getPart1(exampleInput, { red: 12, green: 13, blue: 14 })).toBe(8);
    });
  });

  describe("findMaxCountsFromGames", () => {
    expect(findMaxCountsFromGames(getGames(exampleInput))).toStrictEqual([
      {
        red: 4,
        green: 2,
        blue: 6,
      },
      {
        red: 1,
        green: 3,
        blue: 4,
      },
      {
        red: 20,
        green: 13,
        blue: 6,
      },
      {
        red: 14,
        green: 3,
        blue: 15,
      },
      {
        red: 6,
        green: 3,
        blue: 2,
      },
    ]);
  });

  describe("powerCount", () => {
    it("multiplies the count values", () => {
      expect(
        findMaxCountsFromGames(getGames(exampleInput)).map(powerCount)
      ).toStrictEqual([48, 12, 1560, 630, 36]);
    });
  });

  describe("getPart2", () => {
    it("sums the powers", () => {
      expect(getPart2(exampleInput)).toBe(2286);
    });
  });
});
