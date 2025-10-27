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
    cornerTiles[0], // Canto Inferior Esquerdo (Início)
    ...mockQuestionCards.slice(0, 4), // 4 tiles subindo
    cornerTiles[1], // Canto Superior Esquerdo
    ...mockQuestionCards.slice(4, 10).reverse(), // 6 tiles para a direita
    cornerTiles[2], // Canto Superior Direito
    ...mockQuestionCards.slice(10, 14).reverse(), // 6 tiles descendo
    cornerTiles[3], // Canto Inferior Direito
    ...mockQuestionCards.slice(14, 20), // 4 tiles para a esquerda
  ];

  const getTileByIndex = (index: number) => boardTiles[index];

  return { boardTiles, getTileByIndex };
}
