import { Mastra } from "@mastra/core";
import {
  sarahReynoldsAgent,
  marcusChenAgent,
  dianaWilkinsAgent,
} from "./agents";

export const mastra = new Mastra({
  agents: { sarahReynoldsAgent, marcusChenAgent, dianaWilkinsAgent },
});
