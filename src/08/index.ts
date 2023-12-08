import { join } from "path";

import { getRawInput } from "../utils";

const INPUT = getRawInput(join(__dirname, "input.txt"));

interface NetworkNode {
  id: string;
  left: string;
  right: string;
}

type NetworkGraph = Record<string, NetworkNode>;

interface Network {
  graph: NetworkGraph;
  instructions: string;
}

function getNetwork(input: string): Network {
  const [instructions, nodes] = input.split("\n\n");

  const regex = new RegExp(/^(.+) = \((.+), (.+)\)$/);

  return {
    graph: nodes.split("\n").reduce((acc, line) => {
      const [_, id, left, right] = line.match(regex);

      acc[id] = {
        id,
        left,
        right,
      };

      return acc;
    }, {} as NetworkGraph),
    instructions,
  };
}

function countStepsToTraverseNetwork(
  network: Network,
  startingNodeId = "AAA"
): number {
  let count = 0;
  let currentNodeId = startingNodeId;
  let currentInstructionIndex = 0;

  while (currentNodeId[currentNodeId.length - 1] !== "Z") {
    const instruction = network.instructions[currentInstructionIndex];

    count++;

    currentNodeId =
      network.graph[currentNodeId][instruction === "L" ? "left" : "right"];

    currentInstructionIndex++;

    if (currentInstructionIndex >= network.instructions.length) {
      currentInstructionIndex = 0;
    }
  }

  return count;
}

function countStepsToTraverseNetworkAsGhost(network: Network): number {
  const startingNodeIds = Object.keys(network.graph).filter(
    (id) => id[id.length - 1] === "A"
  );

  const counts = startingNodeIds.map((id) =>
    countStepsToTraverseNetwork(network, id)
  );

  return lcmm(counts);
}

function gcd(a: number, b: number): number {
  while (b != 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function lcmm(nums: number[]): number {
  if (nums.length == 2) {
    return lcm(nums[0], nums[1]);
  } else {
    const num = nums[0];
    nums.shift();
    return lcm(num, lcmm(nums));
  }
}

function getPart1(input: string): number {
  return countStepsToTraverseNetwork(getNetwork(input));
}

function getPart2(input: string): number {
  return countStepsToTraverseNetworkAsGhost(getNetwork(input));
}

console.log(getPart1(INPUT), getPart2(INPUT));
