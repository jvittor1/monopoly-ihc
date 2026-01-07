import { useGame } from "@/contexts/game-context";
import type { Player } from "@/interfaces/player";
import { Coins, Lock, Menu, Volume2, Dices } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";
import GameMenuModal from "@/components/modals/game-menu-modal";

const PlayerCard = ({
  player,
  isCurrentPlayer,
}: {
  player: Player;
  isCurrentPlayer: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      className={`relative overflow-hidden rounded bg-gray-900/50 backdrop-blur-sm transition-all duration-300`}
      style={{
        border: player.inJail
          ? "2px solid rgb(153, 27, 27)"
          : isCurrentPlayer
            ? "2px solid rgb(191, 219, 254)"
            : "0.5px solid var(--color-border-light)",
        boxShadow: player.inJail
          ? "0 0 20px var(--color-red-glow)"
          : isCurrentPlayer
            ? "0 0 20px var(--color-blue-glow)"
            : "none",
      }}
    >
      <div className="relative p-3">
        <div className="flex items-center gap-2.5">
          {/* Avatar */}
          <div className="relative">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full font-bold text-white shadow-lg ${
                player.inJail ? "ring-2 ring-red-800" : ""
              }`}
              style={{ background: player.color }}
            >
              <span className="text-base">
                {player.name.charAt(0).toUpperCase()}
              </span>
            </div>

            {player.inJail && (
              <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-800 shadow-lg">
                <Lock className="h-3 w-3 text-white" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-bold text-slate-300">
              {player.name}
            </h3>

            <div className="mt-0.5 flex items-center gap-1.5">
              <Coins className="h-3.5 w-3.5 text-yellow-400" />
              <span className="text-sm font-semibold text-slate-200">
                {player.money}
              </span>
            </div>
          </div>

          {player.inJail && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-red-700 bg-red-800">
                <span className="text-2xl font-bold text-white">
                  {player.jailTurns}
                </span>
              </div>

              <div className="absolute -right-1 -bottom-1 rounded-full bg-red-950 p-0.5 ring-2 ring-red-800">
                <Lock className="h-2.5 w-2.5 text-red-400" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function HudComponent() {
  const { round, currentPlayer, players } = useGame();
  const navigate = useNavigate();
  const [isGameMenuOpen, setIsGameMenuOpen] = useState(false);

  const leftPlayers = players.slice(0, Math.ceil(players.length / 2));
  const rightPlayers = players.slice(Math.ceil(players.length / 2));

  return (
    <>
      <div className="fixed top-4 left-4 z-40 w-60 space-y-2">
        {leftPlayers.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            isCurrentPlayer={player.id === currentPlayer.id}
          />
        ))}
      </div>

      {rightPlayers.length > 0 && (
        <div className="fixed top-4 right-4 z-40 w-60 space-y-2">
          {rightPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              isCurrentPlayer={player.id === currentPlayer.id}
            />
          ))}
        </div>
      )}

      <div className="fixed bottom-4 left-4 z-40 w-60 space-y-2">
        <div className="flex gap-2">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setIsGameMenuOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded bg-gray-900/95 px-4 py-3 backdrop-blur-sm transition-all hover:bg-gray-800/95"
            style={{ border: "0.5px solid var(--color-border-light)" }}
          >
            <Menu className="h-5 w-5 text-white" />
            <span className="text-sm font-bold text-white">Menu</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center rounded bg-gray-900/95 px-4 py-3 backdrop-blur-sm transition-all hover:bg-gray-800/95"
            style={{ border: "0.5px solid var(--color-border-light)" }}
          >
            <Volume2 className="h-5 w-5 text-white" />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded bg-gray-900/95 p-4 shadow-xl backdrop-blur-sm"
          style={{ border: "0.5px solid rgba(255, 255, 255, 0.2)" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                Rodada
              </p>
              <h1 className="text-3xl font-bold text-white">{round}</h1>
            </div>
            <div className="rounded-full bg-blue-200 p-2.5 shadow-lg">
              <Dices className="h-5 w-5 text-slate-900" />
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded bg-gray-800/60 px-3 py-2">
            <div className="h-2 w-2 rounded-full bg-blue-200" />
            <p className="text-xs font-bold text-white">{currentPlayer.name}</p>
          </div>
        </motion.div>
      </div>

      <GameMenuModal
        isOpen={isGameMenuOpen}
        onClose={() => setIsGameMenuOpen(false)}
        onBackToMenu={() => navigate("/")}
      />
    </>
  );
}
