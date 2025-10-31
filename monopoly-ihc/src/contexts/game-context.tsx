import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { Player } from "@/interfaces/player";
import { usePlayer } from "./player-context";
import { TIME } from "@/constants/time";
import { useModal } from "./modal-context";

export type GameContextType = {
  players: Player[];
  currentPlayer: Player;
  nextTurn: (turnIndexValue: number) => void;
  round: number;
  turnIndex: number;
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
  const { addJailTurns, players } = usePlayer();
  const { showJailTurnSkipModal } = useModal();
  const [turnIndex, setTurnIndex] = useState(0);
  const [isRoundInProgress, setIsRoundInProgress] = useState(false);
  const [round, setRound] = useState(1);

  const currentPlayer = players[turnIndex];

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const playersRef = useRef(players);
  useEffect(() => {
    playersRef.current = players;
  }, [players]);

  const nextTurn = async (turnIndexValue: number) => {
    await sleep(TIME.SMALL_DELAY);
    setIsRoundInProgress(false);

    const nextIndex = (turnIndexValue + 1) % playersRef.current.length;
    const nextPlayer = playersRef.current[nextIndex];

    // check to increment round
    if (nextIndex === 0) {
      setRound((prevRound) => prevRound + 1);
      console.log("New Round:", round + 1);
    }

    if (!nextPlayer.inJail) {
      setTurnIndex(nextIndex);
      console.log("Next Turn:", nextIndex);
      return;
    } else {
      // await sleep(TIME.EXTRA_LONG_DELAY);
      showJailTurnSkipModal(nextPlayer);
      await addJailTurns(-1, nextPlayer.id);

      return nextTurn(nextIndex);
    }
  };

  return (
    <GameContext.Provider
      value={{
        players,
        currentPlayer,
        nextTurn,
        turnIndex,
        isRoundInProgress,
        setIsRoundInProgress,
        round,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
