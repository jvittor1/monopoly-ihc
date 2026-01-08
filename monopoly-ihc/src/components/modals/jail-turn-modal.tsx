import { TIME } from "@/constants/time";
import type { Player } from "@/interfaces/player";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useEffect } from "react";
import ModalWrapper from "./modal-wrapper";

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
    <ModalWrapper isOpen={true} disableBackdropClick maxWidth="sm">
      {/* Header */}
      <div
        className="rounded-t bg-orange-800 p-4"
        style={{
          borderBottom: "0.5px solid var(--color-border-light)",
        }}
      >
        <div className="flex items-center justify-center gap-2">
          <Lock className="h-6 w-6 text-white" />
          <h2 className="text-xl font-bold tracking-wide text-white uppercase">
            Turno Bloqueado
          </h2>
        </div>
      </div>

      <div className="p-6 text-center">
        {/* Ícone e Avatar */}
        <div className="mb-4 flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="relative"
          >
            <div className="rounded-full bg-orange-800 p-3 shadow-lg">
              <Lock className="h-10 w-10 text-white" />
            </div>

            {/* Avatar do jogador */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-white shadow-lg"
                style={{
                  background: player.color,
                  border: "2px solid rgb(17, 24, 39)",
                }}
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
          <h3 className="mb-1 text-2xl font-bold text-white">
            Preso na Cadeia
          </h3>
          <p className="mb-4 text-base font-semibold text-gray-300">
            {player.name}
          </p>
        </motion.div>

        {/* Contador */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-3 rounded bg-orange-800/20 px-6 py-3 backdrop-blur-sm"
          style={{ border: "0.5px solid var(--color-brown-border)" }}
        >
          <Lock className="h-5 w-5 text-orange-400" />
          <div className="text-left">
            <p className="text-xs font-medium text-orange-300">
              Preso por mais
            </p>
            <p className="text-2xl font-bold text-orange-50">
              {turnsRemaining} {turnsRemaining === 1 ? "turno" : "turnos"}
            </p>
          </div>
        </motion.div>
      </div>
    </ModalWrapper>
  );
}
