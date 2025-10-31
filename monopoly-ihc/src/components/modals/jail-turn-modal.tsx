import { TIME } from "@/constants/time";
import type { Player } from "@/interfaces/player";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, XCircle } from "lucide-react";
import { useEffect } from "react";

interface JailTurnSkipModalProps {
  player: Player;
  onClose: () => void;
}

export default function JailTurnSkipModal({
  player,
  onClose,
}: JailTurnSkipModalProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, TIME.LONG_DELAY);

    return () => clearTimeout(timer);
  }, [onClose]);

  const turnsRemaining = player.jailTurns;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.8, opacity: 0, y: -50 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
            x: [0, -3, 3, -3, 3, 0],
          }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{
            scale: { type: "spring", stiffness: 400, damping: 25 },
            x: { duration: 0.4 },
          }}
          className="relative w-full max-w-sm overflow-hidden rounded-lg border-2 border-orange-500/60 bg-gradient-to-br from-[#0f2027]/98 to-[#12304d]/98 shadow-2xl shadow-orange-500/40"
        >
          {/* Barra de progresso */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 2, ease: "linear" }}
            className="absolute top-0 right-0 left-0 h-1 origin-left bg-gradient-to-r from-orange-500 via-red-500 to-orange-500"
          />

          {/* Efeito de alerta piscante */}
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-red-600/20"
          />

          <div className="relative p-6 text-center">
            {/* Ícone e Avatar combinados */}
            <div className="mb-4 flex justify-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                className="relative"
              >
                <div className="rounded-full bg-gradient-to-br from-orange-500 to-red-600 p-3 shadow-lg shadow-orange-500/50">
                  <Lock className="h-10 w-10 text-white" strokeWidth={2.5} />
                </div>

                {/* X vermelho */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="absolute -top-1 -right-1 rounded-full bg-red-600 p-1 shadow-lg ring-2 ring-slate-900"
                >
                  <XCircle className="h-5 w-5 text-white" strokeWidth={2.5} />
                </motion.div>

                {/* Avatar do jogador */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-white shadow-lg ring-2 ring-orange-500"
                    style={{ background: player.color }}
                  >
                    <span className="text-sm">
                      {player.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Mensagem */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="mb-1 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-2xl font-bold text-transparent">
                Turno Bloqueado
              </h2>
              <p className="mb-4 text-base font-semibold text-orange-100">
                {player.name}
              </p>
            </motion.div>

            {/* Contador em destaque */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="inline-flex items-center gap-3 rounded-lg border border-orange-500/50 bg-slate-900/60 px-6 py-3 backdrop-blur-sm"
            >
              <Lock className="h-5 w-5 text-orange-400" />
              <div className="text-left">
                <p className="text-xs font-medium text-orange-300">
                  Preso por mais
                </p>
                <motion.p
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-2xl font-bold text-orange-50"
                >
                  {turnsRemaining} {turnsRemaining === 1 ? "turno" : "turnos"}
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Decoração */}
          <div className="absolute top-0 left-0 h-16 w-16 rounded-tl-lg bg-gradient-to-br from-orange-500/10 to-transparent" />
          <div className="absolute right-0 bottom-0 h-16 w-16 rounded-br-lg bg-gradient-to-tl from-red-500/10 to-transparent" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
