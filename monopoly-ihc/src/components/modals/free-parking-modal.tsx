import type { CornerTile } from "@/interfaces/corner-tile";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Sparkles, Smile } from "lucide-react";
import { TIME } from "../../constants/time";
import type { BaseModalProps } from "@/types/modal-type";
import { useEffect } from "react";

type FreeParkingModalProps = BaseModalProps<CornerTile>;

export default function FreeParkingModal({ onAction }: FreeParkingModalProps) {
  const handleContinue = () => {
    if (onAction) onAction();
  };

  useEffect(() => {
    const timer = setTimeout(handleContinue, TIME.EXTRA_LONG_DELAY);
    return () => clearTimeout(timer);
  }, []);

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
          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
          animate={{
            scale: 1,
            opacity: 1,
            rotate: 0,
          }}
          exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          className="relative w-full max-w-md overflow-hidden rounded-lg border border-purple-500/30 bg-gradient-to-br from-[#0f2027] to-[#12304d] shadow-2xl shadow-purple-500/20"
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
            className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent"
          />

          {/* Partículas flutuantes múltiplas */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 180, 360],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-8 right-12"
          >
            <Sparkles className="h-5 w-5 text-purple-400" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -15, 0],
              x: [0, -10, 0],
              rotate: [360, 180, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute top-16 left-12"
          >
            <Sparkles className="h-4 w-4 text-blue-400" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -10, 0],
              x: [0, 5, 0],
              rotate: [0, 90, 180],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-24 right-20"
          >
            <Sparkles className="h-3 w-3 text-cyan-400" />
          </motion.div>

          {/* Ícone grande de descanso */}
          <div className="flex justify-center pt-8">
            <motion.div
              initial={{ scale: 0, y: -50 }}
              animate={{
                scale: 1,
                y: 0,
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
                  rotate: [0, -5, 5, -5, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-4 shadow-lg shadow-purple-500/50"
              >
                <Coffee className="h-16 w-16 text-white" strokeWidth={2.5} />
              </motion.div>

              {/* Smile sobreposto */}
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="absolute -top-2 -right-2 rounded-full bg-yellow-400 p-1.5 shadow-lg"
              >
                <Smile className="h-5 w-5 text-slate-900" strokeWidth={2.5} />
              </motion.div>

              {/* Efeito de pulso suave */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-0 rounded-full border-2 border-purple-400"
              />
            </motion.div>
          </div>

          {/* Conteúdo */}
          <div className="p-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-2 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-3xl font-bold text-transparent"
            >
              Parada Livre!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 text-sm text-purple-100"
            >
              Aproveite para descansar um pouco
            </motion.p>

            {/* Card de mensagem positiva */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="mb-5 rounded-lg border border-purple-500/30 bg-gradient-to-r from-slate-800/60 to-slate-700/60 p-6 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.7,
                  type: "spring",
                  stiffness: 300,
                }}
                className="space-y-2"
              >
                <p className="text-2xl font-bold text-purple-50">Relaxe!</p>
                <p className="text-sm text-purple-200">
                  Nada de ruim acontece aqui
                </p>
              </motion.div>
            </motion.div>

            {/* Benefícios */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-6 space-y-2"
            >
              <div className="rounded-lg border border-green-500/20 bg-slate-800/40 p-3 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-400" />
                  <p className="text-xs text-slate-300">Sem penalidades</p>
                </div>
              </div>

              <div className="rounded-lg border border-blue-500/20 bg-slate-800/40 p-3 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-400" />
                  <p className="text-xs text-slate-300">
                    Continue jogando normalmente
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-purple-500/20 bg-slate-800/40 p-3 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-400" />
                  <p className="text-xs text-slate-300">
                    Zona segura do tabuleiro
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              onClick={handleContinue}
              className="w-full transform rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50"
            >
              Continuar Jogando
            </motion.button>
          </div>

          {/* Decoração de cantos */}
          <div className="absolute top-0 left-0 h-20 w-20 rounded-tl-lg bg-gradient-to-br from-purple-500/10 to-transparent" />
          <div className="absolute right-0 bottom-0 h-20 w-20 rounded-br-lg bg-gradient-to-tl from-indigo-500/10 to-transparent" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
