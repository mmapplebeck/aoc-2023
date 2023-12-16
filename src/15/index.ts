import sum from "lodash/sum";
import { join } from "path";

import { getRawInput } from "../utils";

const INPUT = getRawInput(join(__dirname, "input.txt"));

const stepRegex = new RegExp(/^(.+)(-|=)(.*)$/);

interface Lens {
  label: string;
  focalLength: number;
}

interface Box {
  id: number;
  lenses: Lens[];
}

type Operation = "-" | "=";

interface ParsedStep {
  boxId: number;
  operation: Operation;
  lens: Lens;
}

function hash(step: string): number {
  let currentValue = 0;

  for (let i = 0; i < step.length; i++) {
    currentValue += step.charCodeAt(i);
    currentValue *= 17;
    currentValue %= 256;
  }

  return currentValue;
}

function getSteps(input: string): string[] {
  return input.replace("\n", "").split(",");
}

function parseStep(step: string): ParsedStep {
  const [_, lensLabel, operation, focalLength] = step.match(stepRegex);

  return {
    boxId: hash(lensLabel),
    operation: operation as Operation,
    lens: {
      label: lensLabel,
      focalLength: Number(focalLength),
    },
  };
}

function getBoxes(steps: ParsedStep[]): Box[] {
  return Object.values(
    steps.reduce(
      (acc, { boxId, operation, lens }) => {
        if (operation === "-" && acc[boxId]) {
          acc[boxId].lenses = acc[boxId].lenses.filter(
            ({ label }) => label !== lens.label
          );
        } else if (operation === "=") {
          if (acc[boxId]) {
            const index = acc[boxId].lenses.findIndex(
              ({ label }) => label === lens.label
            );
            if (index >= 0) {
              acc[boxId].lenses[index] = lens;
            } else {
              acc[boxId].lenses.push(lens);
            }
          } else {
            acc[boxId] = { id: boxId, lenses: [lens] };
          }
        }

        return acc;
      },
      {} as Record<number, Box>
    )
  );
}

function scoreBox({ id, lenses }: Box): number {
  return sum(
    lenses.map(({ focalLength }, i) => (id + 1) * (i + 1) * focalLength)
  );
}

function getPart1(input: string) {
  return sum(getSteps(input).map(hash));
}

function getPart2(input: string) {
  return sum(getBoxes(getSteps(input).map(parseStep)).map(scoreBox));
}

console.log(getPart1(INPUT), getPart2(INPUT));
