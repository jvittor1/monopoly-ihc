import { createContext, useContext, useState } from "react";
import type { Player } from "@/interfaces/player";
import { playerMock } from "@/data/player-mock";

type GameContextType = {
  players: Player[];
  currentPlayer: Player;
  movePlayer: (steps: number) => Promise<void>;
  nextTurn: () => void;
};

interface GameProviderProps {
  children: React.ReactNode;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within a GameProvider");
  return context;
};

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>(playerMock);
  const [turnIndex, setTurnIndex] = useState(0);

  const currentPlayer = players[turnIndex];
  const boardLength = 24;

  function movePlayer(steps: number) {
    return new Promise<void>((resolve) => {
      let step = 0;

      function moveStep() {
        if (step < steps) {
          setPlayers((prev) => {
            const newPlayers = [...prev];
            const player = { ...newPlayers[turnIndex] };
            player.position = (player.position + 1) % boardLength;
            newPlayers[turnIndex] = player;
            return newPlayers;
          });

          step++;
          setTimeout(moveStep, 500);
        } else {
          resolve();
        }
      }

      setTimeout(moveStep, 1800);
    });
  }

  const nextTurn = () => {
    setTurnIndex((prev) => (prev + 1) % players.length);
  };

  return (
    <GameContext.Provider
      value={{ players, currentPlayer, movePlayer, nextTurn }}
    >
      {children}
    </GameContext.Provider>
  );
};
