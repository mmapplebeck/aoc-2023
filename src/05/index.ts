import chunk from "lodash/chunk";
import { join } from "path";

import { getRawInput } from "../utils";

const INPUT = getRawInput(join(__dirname, "input.txt"));

interface Conversion {
  destinationRangeStart: number;
  sourceRangeStart: number;
  rangeLength: number;
}

interface SeedRange {
  start: number;
  end: number;
}

interface Almanac {
  seedRanges: SeedRange[];
  conversions: Conversion[][];
}

function getAlmanac(input: string, useRanges = false): Almanac {
  const [seeds, ...mappings] = input.split("\n\n");

  return {
    seedRanges: getSeedRanges(seeds, useRanges),
    conversions: getConversions(mappings),
  };
}

function getConversion(input: string): Conversion {
  const [destinationRangeStart, sourceRangeStart, rangeLength] = input
    .split(" ")
    .map((str) => Number(str));

  return {
    destinationRangeStart,
    sourceRangeStart,
    rangeLength,
  };
}

function getConversions(mappings: string[]): Conversion[][] {
  return mappings.map((mapping) =>
    mapping.split("\n").slice(1).map(getConversion)
  );
}

function getSeedRanges(input: string, useRanges: boolean): SeedRange[] {
  const seeds = input
    .split(":")[1]
    .trim()
    .split(" ")
    .map((str) => Number(str));

  if (!useRanges) {
    return seeds.map((seed) => ({
      start: seed,
      end: seed,
    }));
  }

  return chunk(seeds, 2).map(([start, count]) => ({
    start,
    end: start + count,
  }));
}

function getSeedLocation(almanac: Almanac): number {
  let minLocation = Infinity;

  almanac.seedRanges.forEach(({ start, end }) => {
    for (let seed = start; seed <= end; seed++) {
      let value: number = seed;

      almanac.conversions.forEach((conversion) => {
        const matchingConversion = conversion.reduce((acc, c) => {
          const withinRange =
            value >= c.sourceRangeStart &&
            value < c.sourceRangeStart + c.rangeLength;

          return withinRange ? c : acc;
        }, undefined);

        value = matchingConversion
          ? matchingConversion.destinationRangeStart +
            value -
            matchingConversion.sourceRangeStart
          : value;
      });

      minLocation = Math.min(minLocation, value);
    }
  });

  return minLocation;
}

function getSeedLocationBackwards(almanac: Almanac): number {
  let location = 0;

  const conversions = almanac.conversions.reverse();

  while (location !== undefined) {
    let value: number = location;

    conversions.forEach((conversion) => {
      const matchingConversion = conversion.reduce((acc, c) => {
        const withinRange =
          value >= c.destinationRangeStart &&
          value < c.destinationRangeStart + c.rangeLength;

        return withinRange ? c : acc;
      }, undefined);

      value = matchingConversion
        ? matchingConversion.sourceRangeStart -
          matchingConversion.destinationRangeStart +
          value
        : value;
    });

    if (
      almanac.seedRanges.some(
        ({ start, end }) => value >= start && value <= end
      )
    ) {
      break;
    }

    location++;
  }

  return location;
}

function getPart1(input: string): number {
  return getSeedLocation(getAlmanac(input));
}

function getPart2(input: string): number {
  return getSeedLocationBackwards(getAlmanac(input, true));
}

console.log(getPart1(INPUT), getPart2(INPUT));
