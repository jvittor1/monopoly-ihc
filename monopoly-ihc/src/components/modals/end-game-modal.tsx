import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Home } from "lucide-react";
import type { Player } from "@/interfaces/player";
import { MenuButton } from "@/components/menu-button";

interface EndGameModalProps {
  isOpen: boolean;
  winner: Player;
  onBackToMenu: () => void;
}

export default function EndGameModal({
  isOpen,
  winner,
  onBackToMenu,
}: EndGameModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-4"
      >
        <motion.div
          key="modal"
          initial={{ y: 50, opacity: 0, scale: 0.85 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.85 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-lg rounded bg-gray-900/95 text-white shadow-2xl backdrop-blur-sm"
          style={{ border: "0.5px solid rgba(255, 255, 255, 0.2)" }}
        >
          <div className="absolute inset-0 overflow-hidden rounded">
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent" />
          </div>

          <div className="relative p-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-2xl"
              style={{ border: "3px solid rgba(255, 255, 255, 0.3)" }}
            >
              <Trophy className="h-12 w-12 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-2 text-center text-3xl font-bold tracking-wide text-yellow-400 uppercase"
            >
              Vitória!
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8 text-center"
            >
              <p className="mb-4 text-sm text-gray-400">O vencedor é</p>

              <div
                className="mx-auto max-w-xs rounded-lg bg-gray-800/80 p-6 backdrop-blur-sm"
                style={{ border: "0.5px solid rgba(255, 255, 255, 0.2)" }}
              >
                <div className="flex items-center justify-center gap-4">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white shadow-lg ring-4 ring-yellow-400/50"
                    style={{ background: winner.color }}
                  >
                    {winner.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="text-left">
                    <h2 className="text-2xl font-bold text-white">
                      {winner.name}
                    </h2>
                    <p className="text-sm text-gray-400">
                      Saldo final: ${winner.money}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <MenuButton
                label="Voltar ao Menu"
                icon={<Home />}
                onClick={onBackToMenu}
                index={0}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
