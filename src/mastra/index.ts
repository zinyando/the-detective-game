import { Mastra } from "@mastra/core";
import {
  sarahReynoldsAgent,
  marcusChenAgent,
  dianaWilkinsAgent,
  tomJohnsonAgent,
  alexRiveraAgent,
} from "./agents";

export const mastra = new Mastra({
  agents: {
    sarahReynoldsAgent,
    marcusChenAgent,
    dianaWilkinsAgent,
    tomJohnsonAgent,
    alexRiveraAgent,
  },
});
