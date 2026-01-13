import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import InfoModal from "./info-modal";
import type { Player } from "@/interfaces/player";

interface JailTurnSkipModalProps {
  player: Player;
  playerId: number;
  onClose: () => void;
}

export default function JailTurnSkipModal({
  player,
  playerId,
  onClose,
}: JailTurnSkipModalProps) {
  const turnsRemaining = player.jailTurns;

  const infoCard = (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="mb-4 flex justify-center"
      >
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-white shadow-lg"
          style={{
            background: player.color,
            border: "2px solid rgb(17, 24, 39)",
          }}
        >
          <span className="text-sm">{player.name.charAt(0).toUpperCase()}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex w-full flex-col items-center justify-center gap-3 rounded bg-red-900/20 px-6 py-3 backdrop-blur-sm"
        style={{ border: "0.5px solid var(--color-red-border)" }}
      >
        <p className="text-xs font-medium text-red-300">Preso por mais</p>

        <div className="flex items-center gap-2 text-center">
          <Lock className="h-5 w-5 text-red-400" />
          <p className="text-2xl font-bold text-red-50">
            {turnsRemaining} {turnsRemaining === 1 ? "turno" : "turnos"}
          </p>
        </div>
      </motion.div>
    </>
  );

  return (
    <InfoModal
      headerColor="bg-red-900"
      headerIcon={Lock}
      headerTitle="Turno Bloqueado"
      mainIcon={Lock}
      mainIconColor="bg-red-900"
      title="Jogador Preso"
      description={player.name}
      infoCard={infoCard}
      buttonText="Continuar"
      buttonColor="bg-red-800"
      playerId={playerId}
      onAction={onClose}
    />
  );
}
