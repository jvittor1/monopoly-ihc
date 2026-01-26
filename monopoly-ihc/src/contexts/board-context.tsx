import React, { createContext, useContext, useState, useEffect } from "react";
import type { Tile } from "@/types/tile";
import { fixedBoardConfig } from "@/data/board-config";

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

export function BoardProvider({ children }: { children: React.ReactNode }) {
  const [boardTiles, setBoardTiles] = useState<Tile[]>(fixedBoardConfig);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const savedBoard = localStorage.getItem("monopoly_board");
      if (savedBoard) {
        const parsedBoard = JSON.parse(savedBoard) as Tile[];
        setBoardTiles(parsedBoard);
      }
    } catch (error) {
      console.error("Erro ao restaurar tabuleiro do localStorage:", error);
      localStorage.removeItem("monopoly_board");
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("monopoly_board", JSON.stringify(boardTiles));
    }
  }, [boardTiles, isInitialized]);

  const getTileByIndex = (index: number): Tile => boardTiles[index];

  const updateTile = (tileId: number, ownerId: number) => {
    setBoardTiles((prev) =>
      prev.map((tile) => {
        if (tile.id !== tileId) return tile;

        if (tile.type === "question") {
          return {
            ...tile,
            ownerId,
            type: "property",
          };
        }

        if (tile.type === "property") {
          return {
            ...tile,
            ownerId,
            type: "property",
          };
        }

        return tile;
      }),
    );

    console.log(`Tile ${tileId} updated with owner ${ownerId}`);
  };

  const resetBoard = () => {
    setBoardTiles(fixedBoardConfig);
    localStorage.removeItem("monopoly_board");
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
