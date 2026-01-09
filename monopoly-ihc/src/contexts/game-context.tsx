import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { Player } from "@/interfaces/player";
import { usePlayer } from "./player-context";
import { TIME } from "@/constants/time";
import { useModal } from "./modal-context";
import EndGameModal from "@/components/modals/end-game-modal";

export type GameContextType = {
  players: Player[];
  currentPlayer: Player;
  nextTurn: (turnIndexValue: number) => void;
  round: number;
  turnIndex: number;
  isRoundInProgress?: boolean;
  setIsRoundInProgress: (inProgress: boolean) => void;
  resetGame: () => void;
  endGameCalled: boolean;
};

interface GameProviderProps {
  children: React.ReactNode;
  onBackToMenu?: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within a GameProvider");
  return ctx;
};

export const GameProvider: React.FC<GameProviderProps> = ({
  children,
  onBackToMenu,
}) => {
  const { addJailTurns, players, resetGame: resetPlayers } = usePlayer();
  const { showJailTurnSkipModal } = useModal();
  const [turnIndex, setTurnIndex] = useState(0);
  const [isRoundInProgress, setIsRoundInProgress] = useState(false);
  const [round, setRound] = useState(1);
  const [endGameCalled, setEndGameCalled] = useState(false);
  const [showEndGameModal, setShowEndGameModal] = useState(false);

  useEffect(() => {
    try {
      const savedGameState = localStorage.getItem("monopoly_game_state");
      if (savedGameState) {
        const { turnIndex: savedTurn, round: savedRound } =
          JSON.parse(savedGameState);
        console.log("Restaurando estado do jogo:", {
          turnIndex: savedTurn,
          round: savedRound,
        });
        setTurnIndex(savedTurn);
        setRound(savedRound);
      }
    } catch (error) {
      console.error("Erro ao restaurar estado do jogo:", error);
      localStorage.removeItem("monopoly_game_state");
    }
  }, []);

  useEffect(() => {
    if (players.length > 0) {
      const gameState = { turnIndex, round };
      localStorage.setItem("monopoly_game_state", JSON.stringify(gameState));
    }
  }, [turnIndex, round, players.length]);

  const currentPlayer = players[turnIndex] || players[0];

  const handleBackToMenu = () => {
    if (onBackToMenu) {
      onBackToMenu();
    } else {
      window.location.href = "/";
    }
  };

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const endGame = () => {
    setEndGameCalled(true);
    setShowEndGameModal(true);
  };

  useEffect(() => {
    const activePlayers = players.filter((p) => !p.bankrupt);
    if (activePlayers.length === 1) {
      endGame();
    }
  }, [players]);

  const playersRef = useRef(players);
  useEffect(() => {
    playersRef.current = players;
  }, [players]);

  const nextTurn = async (turnIndexValue: number) => {
    if (endGameCalled) return;
    await sleep(TIME.SMALL_DELAY);
    setIsRoundInProgress(false);

    const nextIndex = (turnIndexValue + 1) % playersRef.current.length;
    const nextPlayer = playersRef.current[nextIndex];

    if (nextIndex === 0) {
      setRound((prevRound) => prevRound + 1);
    }

    if (!nextPlayer.inJail) {
      setTurnIndex(nextIndex);
      return;
    } else {
      showJailTurnSkipModal(nextPlayer);
      await addJailTurns(-1, nextPlayer.id);

      return nextTurn(nextIndex);
    }
  };

  const winner = players.find((p) => !p.bankrupt) || players[0];

  const resetGame = () => {
    console.log("Resetting entire game...");
    resetPlayers();
    setTurnIndex(0);
    setRound(1);
    setIsRoundInProgress(false);
    setEndGameCalled(false);
    setShowEndGameModal(false);
    localStorage.removeItem("monopoly_game_state");
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
        resetGame,
        endGameCalled,
      }}
    >
      {children}

      <EndGameModal
        isOpen={showEndGameModal}
        winner={winner}
        onBackToMenu={() => {
          setShowEndGameModal(false);
          handleBackToMenu();
        }}
      />
    </GameContext.Provider>
  );
};

export { GameContext };
