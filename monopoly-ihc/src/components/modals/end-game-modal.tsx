import { motion } from "framer-motion";
import { Trophy, Home } from "lucide-react";
import type { Player } from "@/interfaces/player";
import { MenuButton } from "@/components/menu-button";
import ModalWrapper from "./modal-wrapper";

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
    <ModalWrapper isOpen={isOpen} disableBackdropClick maxWidth="lg">
      <div className="absolute inset-0 overflow-hidden rounded">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative p-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-2xl"
          style={{ border: "3px solid var(--color-border-lighter)" }}
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
            style={{ border: "0.5px solid var(--color-border-light)" }}
          >
            <div className="flex items-center justify-center gap-4">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white shadow-lg ring-4 ring-yellow-400/50"
                style={{ background: winner.color }}
              >
                {winner.name.charAt(0).toUpperCase()}
              </div>

              <div className="text-left">
                <h2 className="text-2xl font-bold text-white">{winner.name}</h2>
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
    </ModalWrapper>
  );
}
