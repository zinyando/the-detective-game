import { Mastra } from "@mastra/core";
import {
  sarahReynoldsAgent,
  marcusChenAgent,
  dianaWilkinsAgent,
  tomChenAgent,
  alexWongAgent,
} from "./agents";

export const mastra = new Mastra({
  agents: {
    sarahReynoldsAgent,
    marcusChenAgent,
    dianaWilkinsAgent,
    tomChenAgent,
    alexWongAgent,
  },
});
