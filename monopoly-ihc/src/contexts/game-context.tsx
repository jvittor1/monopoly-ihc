import { createContext, useContext, useEffect, useState } from "react";
import type { Player } from "@/interfaces/player";
import { playerMock } from "@/data/player-mock";
import { useBoard } from "@/hooks/use-board";
import { eventBus } from "@/utils/event-emitter";
import { TIME } from "@/constants/time";
// import { useModal } from "./modal-context";

type GameContextType = {
  players: Player[];
  currentPlayer: Player;
  movePlayer: (steps: number) => Promise<void>;
  nextTurn: () => void;
  isRoundInProgress?: boolean;
  setIsRoundInProgress: (inProgress: boolean) => void;
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
  const [isRoundInProgress, setIsRoundInProgress] = useState(false);

  const { getTileByIndex } = useBoard();
  // const { showModalForTile } = useModal();
  const currentPlayer = players[turnIndex];
  const boardLength = 24;

  function movePlayer(steps: number) {
    return new Promise<void>((resolve) => {
      let step = 0;
      let newPosition = currentPlayer.position;

      function moveStep() {
        if (step < steps) {
          newPosition = (newPosition + 1) % boardLength;
          setPlayers((prev) => {
            const newPlayers = [...prev];
            const player = { ...newPlayers[turnIndex] };
            player.position = newPosition;
            newPlayers[turnIndex] = player;
            return newPlayers;
          });

          step++;
          setTimeout(moveStep, 750);
        } else {
          // call tile effect here
          const tile = getTileByIndex(newPosition);
          console.log("Landed on tile:", tile);
          tile.effect(currentPlayer.id);
          eventBus.emit("showModal", { tile, playerId: currentPlayer.id });
          resolve();
        }
      }

      setTimeout(moveStep, TIME.MEDIUM_DELAY);
    });
  }

  const nextTurn = () => {
    setIsRoundInProgress(false);
    setTurnIndex((prev) => (prev + 1) % players.length);
  };

  useEffect(() => {
    const handleNextTurn = () => {
      nextTurn();
    };
    eventBus.on("nextTurn", handleNextTurn);
    return () => {
      eventBus.off("nextTurn", handleNextTurn);
    };
  }, []);

  return (
    <GameContext.Provider
      value={{
        players,
        currentPlayer,
        movePlayer,
        nextTurn,
        isRoundInProgress,
        setIsRoundInProgress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
