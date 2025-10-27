import type { CornerTile } from "@/interfaces/corner-tile";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Zap, ArrowRight, Lock } from "lucide-react";
import { TIME } from "../../constants/time";
import type { BaseModalProps } from "@/types/modal-type";
import { useEffect } from "react";

type GoToJailModalProps = BaseModalProps<CornerTile>;

export default function GoToJailModal({ onAction }: GoToJailModalProps) {
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      >
        <motion.div
          key="modal"
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            x: [0, -20, 20, -20, 20, -10, 10, 0],
          }}
          exit={{ scale: 0.5, opacity: 0, y: 100 }}
          transition={{
            scale: { type: "spring", stiffness: 300, damping: 20 },
            x: { duration: 0.6 },
          }}
          className="relative w-full max-w-md overflow-hidden rounded-lg border-2 border-red-500/50 bg-gradient-to-br from-[#0f2027] to-[#12304d] shadow-2xl shadow-red-500/40"
        >
          {/* Efeito de alerta piscante */}
          <motion.div
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-orange-600/20"
          />

          {/* Flash de raio */}
          <motion.div
            animate={{
              x: ["-200%", "200%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5,
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/30 to-transparent"
          />

          {/* Raios decorativos */}
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-8 left-8"
          >
            <Zap className="h-6 w-6 text-yellow-400" fill="currentColor" />
          </motion.div>

          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute top-12 right-8"
          >
            <Zap className="h-5 w-5 text-yellow-400" fill="currentColor" />
          </motion.div>

          {/* Ícone grande de alerta */}
          <div className="flex justify-center pt-8">
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="relative"
            >
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 10, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                className="rounded-full bg-gradient-to-br from-red-600 to-red-700 p-4 shadow-lg shadow-red-500/60"
              >
                <ShieldAlert
                  className="h-16 w-16 text-white"
                  strokeWidth={2.5}
                />
              </motion.div>

              {/* Pulsos de alerta */}
              <motion.div
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-0 rounded-full border-4 border-red-500"
              />

              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.3,
                }}
                className="absolute inset-0 rounded-full border-4 border-orange-500"
              />
            </motion.div>
          </div>

          {/* Conteúdo */}
          <div className="p-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-2 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-3xl font-bold text-transparent"
            >
              VÁ PARA A PRISÃO!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 text-sm font-semibold text-red-200"
            >
              Você foi pego e será enviado diretamente para a prisão
            </motion.p>

            {/* Seta animada indicando transferência */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="mb-5 flex items-center justify-center gap-3"
            >
              <div className="rounded-lg border border-slate-600/50 bg-slate-800/60 p-3 backdrop-blur-sm">
                <p className="text-xs text-slate-400">Posição Atual</p>
              </div>

              <motion.div
                animate={{
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="h-6 w-6 text-red-400" strokeWidth={3} />
              </motion.div>

              <div className="rounded-lg border border-red-500/50 bg-red-900/40 p-3 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-red-300" />
                  <p className="text-xs font-semibold text-red-200">Prisão</p>
                </div>
              </div>
            </motion.div>

            {/* Consequências */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-6 space-y-2"
            >
              <div className="rounded-lg border border-red-500/30 bg-slate-800/40 p-3 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-400" />
                  <p className="text-xs text-slate-300">
                    Você vai direto para a prisão
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-orange-500/30 bg-slate-800/40 p-3 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-400" />
                  <p className="text-xs text-slate-300">
                    Não passa pelo Início nem recebe bônus
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-yellow-500/30 bg-slate-800/40 p-3 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-400" />
                  <p className="text-xs text-slate-300">
                    Perde sua próxima jogada
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={handleContinue}
              className="w-full transform rounded-lg border border-red-500/50 bg-gradient-to-r from-red-700 to-red-800 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-500/30 transition-all duration-300 hover:scale-105 hover:border-red-500 hover:shadow-red-500/50"
            >
              IR PARA A PRISÃO
            </motion.button>
          </div>

          {/* Decoração de cantos com alerta */}
          <div className="absolute top-0 left-0 h-20 w-20 rounded-tl-lg bg-gradient-to-br from-red-500/20 to-transparent" />
          <div className="absolute right-0 bottom-0 h-20 w-20 rounded-br-lg bg-gradient-to-tl from-orange-500/20 to-transparent" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
