import type { CornerTile } from "@/interfaces/corner-tile";
import { eventBus } from "@/utils/event-emitter";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, AlertTriangle, Timer } from "lucide-react";
import { TIME } from "../../constants/time";

interface JailModalProps {
  tile: CornerTile;
  playerId: number;
}

export default function JailModal({ tile, playerId }: JailModalProps) {
  // Número de turnos que o jogador fica preso
  const TURNS_IN_JAIL = 2;

  const handleContinue = () => {
    eventBus.emit("closeModal");
    eventBus.emit("nextTurn");
  };

  setTimeout(handleContinue, TIME.EXTRA_LONG_DELAY);
  console.log("Tile:", tile);
  console.log("Player ID:", playerId);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            rotate: [0, -2, 2, -2, 2, 0],
          }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{
            scale: { type: "spring", stiffness: 300, damping: 25 },
            rotate: { duration: 0.5 },
          }}
          className="relative w-full max-w-md overflow-hidden rounded-lg border border-orange-500/30 bg-gradient-to-br from-[#0f2027] to-[#12304d] shadow-2xl shadow-orange-500/20"
        >
          {/* Efeito de brilho animado */}
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/10 to-transparent"
          />

          {/* Barras da prisão - decorativas */}
          <div className="absolute inset-x-0 top-0 flex justify-around opacity-10">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="h-full w-1 bg-orange-400"
              />
            ))}
          </div>

          {/* Ícone grande de cadeado */}
          <div className="flex justify-center pt-8">
            <motion.div
              initial={{ scale: 0, rotate: 90 }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 200,
              }}
              className="relative"
            >
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="rounded-full bg-gradient-to-br from-orange-500 to-red-600 p-4 shadow-lg shadow-orange-500/50"
              >
                <Lock className="h-16 w-16 text-white" strokeWidth={2.5} />
              </motion.div>

              {/* Alerta triangular sobreposto */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="absolute -top-2 -right-2 rounded-full bg-yellow-500 p-1.5 shadow-lg"
              >
                <AlertTriangle
                  className="h-5 w-5 text-slate-900"
                  strokeWidth={2.5}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Conteúdo */}
          <div className="p-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-2 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-3xl font-bold text-transparent"
            >
              Na Prisão!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 text-sm text-orange-100"
            >
              Você foi preso e não pode jogar
            </motion.p>

            {/* Aviso de turnos perdidos */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="mb-5 rounded-lg border border-orange-500/30 bg-gradient-to-r from-slate-800/60 to-slate-700/60 p-5 backdrop-blur-sm"
            >
              <div className="mb-3 flex items-center justify-center gap-2">
                <Timer className="h-6 w-6 text-orange-400" />
                <p className="text-sm font-semibold text-orange-300">
                  Tempo de Prisão
                </p>
              </div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.7,
                  type: "spring",
                  stiffness: 300,
                }}
              >
                <p className="text-5xl font-bold text-orange-50">
                  {TURNS_IN_JAIL}
                </p>
                <p className="mt-1 text-sm text-orange-300">
                  {TURNS_IN_JAIL > 1 ? "turnos perdidos" : "turno perdido"}
                </p>
              </motion.div>
            </motion.div>

            {/* Lista de consequências */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-6 space-y-2"
            >
              <div className="rounded-lg border border-red-500/20 bg-slate-800/40 p-3 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-400" />
                  <p className="text-xs text-slate-300">
                    Você perde sua próxima jogada
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-yellow-500/20 bg-slate-800/40 p-3 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-400" />
                  <p className="text-xs text-slate-300">
                    Outros jogadores continuam normalmente
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              onClick={handleContinue}
              className="w-full transform rounded-lg border border-orange-500/50 bg-gradient-to-r from-slate-700 to-slate-600 px-6 py-3 text-sm font-semibold text-orange-50 shadow-lg transition-all duration-300 hover:scale-105 hover:border-orange-500 hover:shadow-orange-500/20"
            >
              Entendi
            </motion.button>
          </div>

          {/* Decoração de cantos */}
          <div className="absolute top-0 left-0 h-20 w-20 rounded-tl-lg bg-gradient-to-br from-orange-500/10 to-transparent" />
          <div className="absolute right-0 bottom-0 h-20 w-20 rounded-br-lg bg-gradient-to-tl from-red-500/10 to-transparent" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
