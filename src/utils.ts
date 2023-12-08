import { readFileSync } from "fs";

export function getRawInput(filename: string): string {
  return readFileSync(filename, "utf8").trim();
}

export function getInput(filename: string): string[] {
  return getRawInput(filename).trim().split("\n");
}
