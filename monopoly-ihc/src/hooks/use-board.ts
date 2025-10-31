import { cornerTiles } from "@/data/corner-cards";
import { mockQuestionCards } from "@/data/card-mock";
import type { QuestionCard } from "@/interfaces/question-card";
import type { CornerTile } from "@/interfaces/corner-tile";

export type Tile = QuestionCard | CornerTile;

export type BoardHookReturn = {
  boardTiles: Tile[];
  getTileByIndex: (index: number) => Tile;
};

export function useBoard(): BoardHookReturn {
  const boardTiles: Tile[] = [
    cornerTiles[0],
    ...mockQuestionCards.slice(0, 4),
    cornerTiles[1],
    ...mockQuestionCards.slice(4, 10).reverse(),
    cornerTiles[2],
    ...mockQuestionCards.slice(10, 14).reverse(),
    cornerTiles[3],
    ...mockQuestionCards.slice(14, 20),
  ];

  const getTileByIndex = (index: number) => boardTiles[index];

  return { boardTiles, getTileByIndex };
}
