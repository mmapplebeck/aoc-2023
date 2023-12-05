import { join } from "path";

import { getRawInput } from "../utils";

const INPUT = getRawInput(join(__dirname, "example-input.txt"));

interface Conversion {
  destinationRangeStart: number;
  sourceRangeStart: number;
  rangeLength: number;
}

const CONVERSION_TYPES = [
  "seed-to-soil",
  "soil-to-fertilizer",
  "fertilizer-to-water",
  "water-to-light",
  "light-to-temperature",
  "temperature-to-humidity",
  "humidity-to-location",
] as const;

type ConversionType = (typeof CONVERSION_TYPES)[number];

type ConversionsByType = Record<ConversionType, Conversion[]>;

interface Almanac {
  seeds: number[];
  conversionsByType: ConversionsByType;
}

function getAlmanac(input: string): Almanac {
  const [seeds, ...mappings] = input.split("\n\n");

  return {
    seeds: getSeeds(seeds),
    conversionsByType: getConversionsByType(mappings),
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

function getConversionsByType(input: string[]) {
  return input.reduce((acc, mapping) => {
    const [heading, ...conversions] = mapping.split("\n");

    acc[heading.split(" ")[0] as ConversionType] =
      conversions.map(getConversion);

    return acc;
  }, {} as ConversionsByType);
}

function getSeeds(input: string): number[] {
  return input
    .split(":")[1]
    .trim()
    .split(" ")
    .map((str) => Number(str));
}

function convert(
  sourceRangeStart: number,
  type: ConversionType,
  almanac: Almanac
) {
  const conversion = almanac.conversionsByType[type].reduce((acc, c) => {
    const withinRange =
      sourceRangeStart >= c.sourceRangeStart &&
      sourceRangeStart <= c.sourceRangeStart + c.rangeLength;

    return withinRange ? c : acc;
  }, undefined);

  return conversion
    ? conversion.destinationRangeStart +
        sourceRangeStart -
        conversion.sourceRangeStart
    : sourceRangeStart;
}

function getSeedLocations(almanac: Almanac): number[] {
  return almanac.seeds.map((seed) => {
    const soil = convert(seed, "seed-to-soil", almanac);
    const fertilizer = convert(soil, "soil-to-fertilizer", almanac);
    const water = convert(fertilizer, "fertilizer-to-water", almanac);
    const light = convert(water, "water-to-light", almanac);
    const temperature = convert(light, "light-to-temperature", almanac);
    const humidity = convert(temperature, "temperature-to-humidity", almanac);
    const location = convert(humidity, "humidity-to-location", almanac);

    return location;
  });
}

function getPart1(input: string): number {
  return Math.min(...getSeedLocations(getAlmanac(input)));
}

console.log(getPart1(INPUT));
