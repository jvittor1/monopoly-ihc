import React, { createContext, useContext, useState } from "react";
import { cornerTiles } from "@/data/corner-cards";
import { mockQuestionCards } from "@/data/card-mock";
import type { Tile } from "@/types/tile";

export type BoardContextType = {
  boardTiles: Tile[];
  getTileByIndex: (index: number) => Tile;
  updateTile: (tileId: number, ownerId: number) => void;
  resetBoard: () => void;
};

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const useBoard = () => {
  const ctx = useContext(BoardContext);
  if (!ctx) throw new Error("useBoard must be used inside BoardProvider");
  return ctx;
};

const initialBoard: Tile[] = [
  cornerTiles[0],
  ...mockQuestionCards.slice(0, 4),
  cornerTiles[1],
  ...mockQuestionCards.slice(4, 10).reverse(),
  cornerTiles[2],
  ...mockQuestionCards.slice(10, 14).reverse(),
  cornerTiles[3],
  ...mockQuestionCards.slice(14, 20),
];

export function BoardProvider({ children }: { children: React.ReactNode }) {
  const [boardTiles, setBoardTiles] = useState<Tile[]>(initialBoard);

  const getTileByIndex = (index: number): Tile => boardTiles[index];

  const updateTile = (tileId: number, ownerId: number) => {
    setBoardTiles((prev) =>
      prev.map((tile) => {
        if (tile.id !== tileId) return tile;

        // se for uma carta question, adiciona ownerId e muda o tipo
        if (tile.type === "question") {
          return {
            ...tile,
            ownerId, // adiciona o campo
            type: "property", // muda o tipo
          };
        }

        // se já for property, apenas atualiza o dono
        if (tile.type === "property") {
          return {
            ...tile,
            ownerId,
          };
        }

        return tile;
      }),
    );

    console.log(`Tile ${tileId} updated with owner ${ownerId}`);
  };

  const resetBoard = () => {
    setBoardTiles(initialBoard);
  };

  return (
    <BoardContext.Provider
      value={{
        boardTiles,
        getTileByIndex,
        updateTile,
        resetBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
