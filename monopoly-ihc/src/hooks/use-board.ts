import { cornerTiles } from "@/data/corner-cards";
import { mockQuestionCards } from "@/data/card-mock";
import type { QuestionCard } from "@/interfaces/question-card";
import type { CornerTile } from "@/interfaces/corner-tile";

export type Tile = QuestionCard | CornerTile;

export function useBoard() {
  const boardTiles: Tile[] = [
    cornerTiles[0],
    ...mockQuestionCards.slice(0, 6),
    cornerTiles[1],
    ...mockQuestionCards.slice(16, 20).reverse(),
    cornerTiles[2],
    ...mockQuestionCards.slice(10, 16).reverse(),
    cornerTiles[3],
    ...mockQuestionCards.slice(6, 10),
  ];

  const getTileByIndex = (index: number) => boardTiles[index];

  return { boardTiles, getTileByIndex };
}
