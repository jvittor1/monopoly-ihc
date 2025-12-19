import React, { createContext, useContext, useState } from "react";
import { cornerTiles } from "@/data/corner-cards";
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

import { gameLogic } from "@/services/game-logic";

const generateBoard = (): Tile[] => {
  const questions = gameLogic.getShuffledQuestions();
  console.log("DEBUG: Total questions available:", questions.length);
  let questionIndex = 0;

  // Helper to create a mixed group of tiles
  const createGroup = (size: number, revesCount: number, startIndex: number) => {
    const groupTiles: Tile[] = [];
    const questionCount = size - revesCount;

    // Add Revés tiles
    for (let i = 0; i < revesCount; i++) {
      groupTiles.push({
        id: 1000 + startIndex + i,
        text: "Sorte ou Revés",
        question: "Carta Surpresa",
        answer: "",
        difficulty: "medium",
        type: "random",
        points: 0,
        alternatives: [],
        correctAlternative: 0,
        rentPrice: 0,
        ownerId: undefined
      } as any);
    }

    // Add Question tiles
    for (let i = 0; i < questionCount; i++) {
      if (questionIndex < questions.length) {
        groupTiles.push({ 
          ...questions[questionIndex], 
          ownerId: undefined,
          type: "question" // Force type to ensure correct rendering
        });
        questionIndex++;
      } else {
        // Fallback if out of questions
        groupTiles.push({
          id: 2000 + startIndex + i,
          text: "Pergunta Extra",
          question: "Pergunta reserva",
          answer: "Resposta",
          difficulty: "easy",
          type: "question",
          points: 10,
          alternatives: [],
          correctAlternative: 0,
          rentPrice: 50,
          ownerId: undefined
        } as any);
      }
    }

    // Shuffle the group to randomize positions
    return gameLogic.shuffle(groupTiles);
  };

  // Side 1 (Right): 4 tiles between Corner 0 and Corner 1
  const side1 = createGroup(4, 1, 0);
  
  // Side 2 (Top): 6 tiles between Corner 1 and Corner 2
  const side2 = createGroup(6, 1, 10);
  
  // Side 3 (Left): 4 tiles between Corner 2 and Corner 3
  const side3 = createGroup(4, 1, 20);
  
  // Side 4 (Bottom): 6 tiles after Corner 3
  const side4 = createGroup(6, 1, 30);

  return [
    cornerTiles[0],
    ...side1,
    cornerTiles[1],
    ...side2,
    cornerTiles[2],
    ...side3,
    cornerTiles[3],
    ...side4,
  ];
};

export function BoardProvider({ children }: { children: React.ReactNode }) {
  const [boardTiles, setBoardTiles] = useState<Tile[]>(() => generateBoard());

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
    setBoardTiles(generateBoard());
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
