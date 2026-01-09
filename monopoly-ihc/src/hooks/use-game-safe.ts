import { useContext } from "react";
import { GameContext } from "@/contexts/game-context";
import type { GameContextType } from "@/contexts/game-context";

export function useGameSafe(): GameContextType | null {
  const context = useContext(GameContext);
  return context || null;
}
