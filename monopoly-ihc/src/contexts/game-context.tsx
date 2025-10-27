import { createContext, useContext, useState } from "react";
import type { Player } from "@/interfaces/player";
import { usePlayer } from "./player-context";

export type GameContextType = {
  players: Player[];
  currentPlayer: Player;
  nextTurn: () => void;
  round: number;
  isRoundInProgress?: boolean;
  setIsRoundInProgress: (inProgress: boolean) => void;
};

interface GameProviderProps {
  children: React.ReactNode;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within a GameProvider");
  return ctx;
};

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const { players } = usePlayer();
  const [turnIndex, setTurnIndex] = useState(0);
  const [isRoundInProgress, setIsRoundInProgress] = useState(false);
  const [round, setRound] = useState(1);

  const currentPlayer = players[turnIndex];

  const nextTurn = () => {
    setIsRoundInProgress(false);
    setTurnIndex((prev) => (prev + 1) % players.length);
    if (turnIndex === players.length - 1) {
      setRound((prev) => prev + 1);
    }
  };

  return (
    <GameContext.Provider
      value={{
        players,
        currentPlayer,
        nextTurn,
        isRoundInProgress,
        setIsRoundInProgress,
        round,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
