import type { CornerTile } from "@/interfaces/corner-tile";
import { eventBus } from "@/utils/event-emitter";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Sparkles, CirclePoundSterling } from "lucide-react";

interface StartModalProps {
  tile: CornerTile;
  playerId: number;
}

export default function StartModal({ tile, playerId }: StartModalProps) {
  const handleContinue = () => {
    eventBus.emit("closeModal");
    eventBus.emit("nextTurn");
  };

  console.log("StartModal rendered");
  console.log("Tile:", tile);
  console.log("Player ID:", playerId);

  setTimeout(handleContinue, 5000);
  // Valor que o jogador recebe ao passar pelo início
  const bonusAmount = 200;

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
          initial={{ scale: 0.5, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: -100 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-md overflow-hidden rounded-lg border border-cyan-500/30 bg-gradient-to-br from-[#0f2027] to-[#12304d] shadow-2xl shadow-cyan-500/20"
        >
          {/* Efeito de brilho animado */}
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
          />

          {/* Partículas flutuantes */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-10 right-10"
          >
            <Sparkles className="h-6 w-6 text-cyan-400" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute top-20 left-10"
          >
            <Sparkles className="h-4 w-4 text-blue-400" />
          </motion.div>

          {/* Ícone grande de moedas */}
          <div className="flex justify-center pt-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
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
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-4 shadow-lg shadow-cyan-500/50"
              >
                <CirclePoundSterling
                  className="h-16 w-16 text-white"
                  strokeWidth={2.5}
                />
              </motion.div>

              {/* Efeito de pulso ao redor */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-0 rounded-full border-2 border-cyan-400"
              />
            </motion.div>
          </div>

          {/* Conteúdo */}
          <div className="p-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent"
            >
              Passou pelo Início!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 text-sm text-cyan-100"
            >
              Você completou uma volta no tabuleiro
            </motion.p>

            {/* Bônus recebido */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="mb-6 rounded-lg border border-cyan-500/30 bg-gradient-to-r from-slate-800/60 to-slate-700/60 p-6 backdrop-blur-sm"
            >
              <div className="mb-3 flex items-center justify-center gap-2">
                <TrendingUp className="h-6 w-6 text-cyan-400" />
                <p className="text-sm font-semibold text-cyan-300">
                  Bônus Recebido
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
                <p className="text-5xl font-bold text-cyan-50">
                  +{bonusAmount}
                </p>
                <p className="mt-1 text-sm text-cyan-300">pontos</p>
              </motion.div>
            </motion.div>

            {/* Mensagem motivacional */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-6 rounded-lg border border-blue-500/20 bg-slate-800/30 p-3 backdrop-blur-sm"
            >
              <p className="text-xs text-slate-300">
                Continue jogando para acumular mais pontos e vencer o jogo!
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              onClick={handleContinue}
              className="w-full transform rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50"
            >
              Continuar Jogando
            </motion.button>
          </div>

          {/* Decoração de cantos */}
          <div className="absolute top-0 left-0 h-20 w-20 rounded-tl-lg bg-gradient-to-br from-cyan-500/10 to-transparent" />
          <div className="absolute right-0 bottom-0 h-20 w-20 rounded-br-lg bg-gradient-to-tl from-blue-500/10 to-transparent" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
