import { createContext, useContext, useState } from "react";
import type { Player } from "@/interfaces/player";
import { playerMock } from "@/data/player-mock";

type GameContextType = {
  players: Player[];
  currentPlayer: Player;
  movePlayer: (steps: number) => void;
  nextTurn: () => void;
};

interface GameProviderProps {
  children: React.ReactNode;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>(playerMock);
  const [turnIndex, setTurnIndex] = useState(0);

  const currentPlayer = players[turnIndex];

  const movePlayer = (steps: number) => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === currentPlayer.id
          ? { ...p, position: (p.position + steps) % 24 }
          : p,
      ),
    );
  };

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
