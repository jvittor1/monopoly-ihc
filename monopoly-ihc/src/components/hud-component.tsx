import { useGame } from "@/contexts/game-context";
import type { Player } from "@/interfaces/player";
import { Crown, Coins, Lock } from "lucide-react";
import { motion } from "framer-motion";

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
      className={`relative overflow-hidden rounded-lg border backdrop-blur-sm transition-all duration-300 ${
        player.inJail
          ? "border-red-500/70 bg-gradient-to-br from-red-950/70 to-red-900/70"
          : isCurrentPlayer
            ? "border-cyan-400/60 bg-gradient-to-br from-cyan-900/50 to-blue-900/50 shadow-lg shadow-cyan-500/20"
            : "border-slate-700/40 bg-slate-900/50"
      }`}
    >
      {/* Barra de alerta vermelha para prisioneiros */}
      {player.inJail && (
        <motion.div
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600"
        />
      )}

      {/* Brilho animado para jogador atual */}
      {isCurrentPlayer && !player.inJail && (
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent"
        />
      )}

      <div className="relative p-3">
        <div className="flex items-center gap-2.5">
          {/* Avatar */}
          <div className="relative">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full font-bold text-white shadow-lg ${
                player.inJail
                  ? "ring-2 ring-red-500"
                  : isCurrentPlayer
                    ? "ring-2 ring-cyan-400"
                    : ""
              }`}
              style={{ background: player.color }}
            >
              <span className="text-base">
                {player.name.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Badge de status no avatar */}
            {player.inJail ? (
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 shadow-lg shadow-red-500/60"
              >
                <Lock className="h-3 w-3 text-white" />
              </motion.div>
            ) : isCurrentPlayer ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 rounded-full bg-yellow-400 p-0.5 shadow-lg"
              >
                <Crown className="h-3 w-3 text-slate-900" fill="currentColor" />
              </motion.div>
            ) : null}
          </div>

          {/* Info do jogador */}
          <div className="min-w-0 flex-1">
            <h3
              className={`truncate text-sm font-bold ${
                player.inJail
                  ? "text-red-100"
                  : isCurrentPlayer
                    ? "text-cyan-50"
                    : "text-slate-300"
              }`}
            >
              {player.name}
            </h3>

            {/* Pontos */}
            <div className="mt-0.5 flex items-center gap-1.5">
              <Coins
                className={`h-3.5 w-3.5 ${player.inJail ? "text-red-400" : "text-yellow-400"}`}
              />
              <span
                className={`text-sm font-semibold ${
                  player.inJail ? "text-red-200" : "text-slate-200"
                }`}
              >
                {player.money}
              </span>
            </div>
          </div>

          {/* Contador de prisão - GRANDE E VISÍVEL */}
          {player.inJail && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 10px rgba(239, 68, 68, 0.5)",
                    "0 0 20px rgba(239, 68, 68, 0.8)",
                    "0 0 10px rgba(239, 68, 68, 0.5)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-red-500 bg-red-600"
              >
                <span className="text-2xl font-bold text-white">
                  {player.jailTurns}
                </span>
              </motion.div>

              {/* Ícone de cadeado pequeno no canto */}
              <div className="absolute -right-1 -bottom-1 rounded-full bg-red-950 p-0.5 ring-2 ring-red-600">
                <Lock className="h-2.5 w-2.5 text-red-400" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Barra de indicador na parte inferior para jogador atual */}
        {isCurrentPlayer && !player.inJail && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="absolute right-0 bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500"
          />
        )}
      </div>
    </motion.div>
  );
};

export default function HudComponent() {
  const { round, currentPlayer, players } = useGame();

  // Divide jogadores em duas colunas
  const leftPlayers = players.slice(0, Math.ceil(players.length / 2));
  const rightPlayers = players.slice(Math.ceil(players.length / 2));

  return (
    <>
      {/* HUD Esquerda */}
      <div className="fixed top-4 left-4 z-40 w-60 space-y-2.5">
        {/* Info da Rodada */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative overflow-hidden rounded-lg border border-cyan-500/50 bg-gradient-to-br from-[#0f2027]/95 to-[#12304d]/95 p-3.5 shadow-xl backdrop-blur-md"
        >
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent"
          />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-wider text-cyan-400 uppercase">
                Rodada
              </p>
              <h1 className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
                #{round}
              </h1>
            </div>
            <div className="rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-2 shadow-lg shadow-cyan-500/30">
              <Crown className="h-5 w-5 text-white" fill="currentColor" />
            </div>
          </div>

          <div className="relative mt-2.5 flex items-center gap-2 rounded-md border border-cyan-500/30 bg-slate-900/60 px-2.5 py-1.5">
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/60"
            />
            <p className="text-xs font-bold text-cyan-50">
              {currentPlayer.name}
            </p>
          </div>
        </motion.div>

        {/* Jogadores da esquerda */}
        <div className="space-y-2">
          {leftPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              isCurrentPlayer={player.id === currentPlayer.id}
            />
          ))}
        </div>
      </div>

      {/* HUD Direita */}
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
    </>
  );
}
