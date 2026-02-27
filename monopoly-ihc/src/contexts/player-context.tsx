import { POINTS_VARIABLES } from "@/constants/points-variables";
import { TIME } from "@/constants/time";
import type { Player } from "@/interfaces/player";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export type PlayerContextType = {
  players: Player[];
  movePlayer: (steps: number, playerId: number) => Promise<number>;
  addMoney: (amount: number, playerId: number) => void;
  removeMoney: (amount: number, playerId: number) => void;
  addJailTurns: (turns: number, playerId: number) => Promise<void>;
  getPlayerById: (playerId: number) => Player | undefined;
  addPropertyToPlayer: (playerId: number, propertyId: number) => void;
  movePlayerToJail: (playerId: number) => void;
  resetGame: () => void;
  initializePlayers: (players: Player[]) => void;
};

interface PlayerProviderProps {
  children: React.ReactNode;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within a PlayerProvider");
  return ctx;
};

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [initialPlayers, setInitialPlayers] = useState<Player[]>([]);
  const boardLength = 24;

  // Tentar restaurar jogadores do localStorage ao montar
  useEffect(() => {
    try {
      const savedPlayers = localStorage.getItem("players");
      if (savedPlayers) {
        const parsedPlayers = JSON.parse(savedPlayers) as Player[];
        if (parsedPlayers.length > 0) {
          console.log("Restaurando jogadores do localStorage:", parsedPlayers);
          setPlayers(parsedPlayers);
          setInitialPlayers(parsedPlayers);
        }
      }
    } catch (error) {
      console.error("Erro ao restaurar jogadores do localStorage:", error);
      localStorage.removeItem("players");
    }
  }, []);

  useEffect(() => {
    if (players.length > 0) {
      localStorage.setItem("players", JSON.stringify(players));
    }
  }, [players]);

  function movePlayer(steps: number, playerId: number): Promise<number> {
    return new Promise<number>((resolve) => {
      let step = 0;
      let passedStart = false;

      // pega a posição inicial do jogador pelo ID
      const startingPlayer = players.find((p) => p.id === playerId);
      if (!startingPlayer) {
        console.warn("Player not found:", playerId);
        resolve(0);
        return;
      }
      let newPosition = startingPlayer.position;

      function moveStep() {
        if (step < steps) {
          newPosition = (newPosition + 1) % boardLength;

          if (newPosition === 0) {
            passedStart = true;
          }

          // atualiza o estado do jogador pelo ID
          setPlayers((prev) => {
            const newPlayers = [...prev];
            const idx = newPlayers.findIndex((p) => p.id === playerId);
            if (idx === -1) return newPlayers;
            newPlayers[idx] = { ...newPlayers[idx], position: newPosition };
            return newPlayers;
          });

          step++;
          setTimeout(moveStep, 750);
        } else {
          resolve(newPosition);

          if (passedStart && newPosition !== 0) {
            const playerName =
              players.find((p) => p.id === playerId)?.name ?? "Jogador";
            addMoney(POINTS_VARIABLES.START, playerId);
            toast.success(
              `${playerName} recebeu $${POINTS_VARIABLES.START} por passar pelo Início!`,
              {
                style: {
                  background: "linear-gradient(135deg, #0f2027, #12304d)",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  fontFamily: "'Titan One', sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.8px",
                },
              },
            );
            passedStart = false;
          }
        }
      }

      setTimeout(moveStep, TIME.MEDIUM_DELAY);
    });
  }

  function addMoney(amount: number, playerId: number): void {
    setPlayers((prev) => {
      const newPlayers = [...prev];
      const idx = newPlayers.findIndex((p) => p.id === playerId);
      if (idx === -1) return newPlayers;
      newPlayers[idx] = {
        ...newPlayers[idx],
        money: newPlayers[idx].money + amount,
      };
      return newPlayers;
    });

    console.log(`Added ${amount} to player ${playerId}`);
  }

  function removeMoney(amount: number, playerId: number): void {
    setPlayers((prev) => {
      const newPlayers = [...prev];
      const idx = newPlayers.findIndex((p) => p.id === playerId);
      if (idx === -1) return newPlayers;
      newPlayers[idx] = {
        ...newPlayers[idx],
        bankrupt: newPlayers[idx].money - amount < 0,
        money: newPlayers[idx].money - amount,
      };
      return newPlayers;
    });

    console.log(`Removed ${amount} from player ${playerId}`);
  }

  async function addJailTurns(turns: number, playerId: number): Promise<void> {
    return new Promise((resolve) => {
      setPlayers((prev) => {
        const newPlayers = [...prev];
        const idx = newPlayers.findIndex((p) => p.id === playerId);
        if (idx === -1) return newPlayers;

        const newJailTurns = newPlayers[idx].jailTurns + turns;
        newPlayers[idx] = {
          ...newPlayers[idx],
          jailTurns: newJailTurns,
          inJail: newJailTurns > 0,
        };

        console.log(
          `Player ${newPlayers[idx].name} jail turns updated to: ${newJailTurns}`,
        );

        return newPlayers;
      });

      // Espera o ciclo de renderização terminar antes de continuar
      setTimeout(resolve, 0);
    });
  }

  function movePlayerToJail(playerId: number): void {
    const jailPosition = 5;
    setPlayers((prev) => {
      const newPlayers = [...prev];
      const idx = newPlayers.findIndex((p) => p.id === playerId);
      if (idx === -1) return newPlayers;
      newPlayers[idx] = {
        ...newPlayers[idx],
        position: jailPosition,
      };
      return newPlayers;
    });
    console.log(`Moved player ${playerId} to jail`);
  }

  const getPlayerById = (playerId: number): Player | undefined => {
    return players.find((p) => p.id === playerId);
  };

  async function addPropertyToPlayer(
    playerId: number,
    propertyId: number,
  ): Promise<void> {
    setPlayers((prev) => {
      const newPlayers = [...prev];
      const idx = newPlayers.findIndex((p) => p.id === playerId);
      if (idx === -1) return newPlayers;
      const player = newPlayers[idx];
      const updatedProperties = player.properties
        ? [...player.properties, propertyId]
        : [propertyId];
      newPlayers[idx] = {
        ...player,
        properties: updatedProperties,
      };
      return newPlayers;
    });
    console.log(`Added property ${propertyId} to player ${playerId}`);
  }

  function resetGame(): void {
    console.log("Resetting game to initial state...");
    setPlayers(initialPlayers.map((p) => ({ ...p })));
    localStorage.removeItem("players");
  }

  function initializePlayers(newPlayers: Player[]): void {
    console.log("Initializing players:", newPlayers);
    setPlayers(newPlayers);
    setInitialPlayers(newPlayers);
  }

  return (
    <PlayerContext.Provider
      value={{
        players,
        movePlayer,
        addMoney,
        removeMoney,
        addJailTurns,
        movePlayerToJail,
        getPlayerById,
        addPropertyToPlayer,
        resetGame,
        initializePlayers,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
