import { useGame } from "@/contexts/game-context";
import type { Player } from "@/interfaces/player";
import { Crown, Coins, Lock, Users } from "lucide-react";
import { motion } from "framer-motion";

const PlayerInfo = ({
  player,
  isCurrentPlayer,
}: {
  player: Player;
  isCurrentPlayer: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`group relative overflow-hidden rounded-lg border backdrop-blur-sm transition-all duration-300 ${
        isCurrentPlayer
          ? "scale-105 border-cyan-500/50 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 shadow-lg shadow-cyan-500/20"
          : "border-slate-700/50 bg-slate-800/40 hover:border-slate-600/50 hover:bg-slate-800/60"
      }`}
    >
      {/* Brilho para jogador atual */}
      {isCurrentPlayer && (
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
        />
      )}

      <div className="relative flex items-center gap-3 p-3">
        {/* Avatar com indicador de vez */}
        <div className="relative">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full font-bold text-white shadow-lg transition-all duration-300 ${
              isCurrentPlayer
                ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-900"
                : ""
            }`}
            style={{ background: player.color }}
          >
            <span className="text-lg">
              {player.name.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Coroa para jogador atual */}
          {isCurrentPlayer && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute -top-1 -right-1 rounded-full bg-yellow-400 p-1 shadow-lg"
            >
              <Crown className="h-3 w-3 text-slate-900" fill="currentColor" />
            </motion.div>
          )}
        </div>

        {/* Informações do jogador */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3
              className={`truncate font-semibold ${
                isCurrentPlayer ? "text-cyan-50" : "text-slate-200"
              }`}
            >
              {player.name}
            </h3>
          </div>

          {/* Dinheiro */}
          <div className="mt-1 flex items-center gap-1.5">
            <Coins
              className={`h-3.5 w-3.5 ${
                isCurrentPlayer ? "text-cyan-400" : "text-slate-400"
              }`}
            />
            <p
              className={`text-sm font-medium ${
                isCurrentPlayer ? "text-cyan-200" : "text-slate-400"
              }`}
            >
              {player.money} pts
            </p>
          </div>

          {/* Status de prisão */}
          {player.inJail && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 flex items-center gap-1.5 rounded-md border border-red-500/30 bg-red-900/40 px-2 py-0.5"
            >
              <Lock className="h-3 w-3 text-red-400" />
              <p className="text-xs font-medium text-red-300">
                Prisão: {player.jailTurns}{" "}
                {player.jailTurns === 1 ? "turno" : "turnos"}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function HudComponent() {
  const { round, currentPlayer, players } = useGame();

  return (
    <div className="pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-auto w-72 space-y-4 rounded-lg border border-slate-700/50 bg-gradient-to-br from-[#0f2027]/95 to-[#12304d]/95 p-4 shadow-2xl backdrop-blur-md"
      >
        {/* Header com Round */}
        <div className="relative overflow-hidden rounded-lg border border-cyan-500/30 bg-gradient-to-r from-slate-800/60 to-slate-700/60 p-4 backdrop-blur-sm">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
          />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-cyan-400">
                  Rodada Atual
                </p>
                <h1 className="mt-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
                  #{round}
                </h1>
              </div>

              <div className="rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-3 shadow-lg shadow-cyan-500/30">
                <Crown className="h-6 w-6 text-white" fill="currentColor" />
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-md border border-cyan-500/20 bg-slate-900/40 px-3 py-2">
              <div
                className="h-2 w-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"
                style={{
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              />
              <p className="text-sm font-medium text-cyan-100">
                Vez de{" "}
                <span className="font-bold text-cyan-50">
                  {currentPlayer.name}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Lista de Jogadores */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Users className="h-5 w-5 text-slate-400" />
            <h3 className="text-sm font-semibold text-slate-300">
              Jogadores ({players.length})
            </h3>
          </div>

          <div className="space-y-2 overflow-y-auto p-3">
            {players.map((player) => (
              <PlayerInfo
                key={player.id}
                player={player}
                isCurrentPlayer={player.id === currentPlayer.id}
              />
            ))}
          </div>
        </div>

        {/* Linha decorativa inferior */}
        <div className="h-1 w-full rounded-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      </motion.div>
    </div>
  );
}
