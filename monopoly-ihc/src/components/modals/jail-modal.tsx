import type { CornerTile } from "@/interfaces/corner-tile";
import { motion } from "framer-motion";
import { Lock, AlertTriangle } from "lucide-react";
import type { BaseModalProps } from "@/types/modal-type";
import { POINTS_VARIABLES } from "@/constants/points-variables";
import InfoModal from "./info-modal";

type JailModalProps = BaseModalProps<CornerTile>;

function JailIconWithBadge() {
  return (
    <div className="relative">
      <Lock className="h-12 w-12 text-white" />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="absolute -top-1 -right-1 rounded-full bg-yellow-500 p-1 shadow-lg"
      >
        <AlertTriangle className="h-4 w-4 text-white" />
      </motion.div>
    </div>
  );
}

export default function JailModal({ onAction, playerId }: JailModalProps) {
  const infoCard = (
    <div
      className="inline-block rounded bg-red-600/20 px-4 py-2 text-center backdrop-blur-sm"
      style={{ border: "0.5px solid var(--color-red-border)" }}
    >
      <p className="text-sm text-gray-300">
        Penalidade:{" "}
        <span className="font-bold text-red-400">
          -{POINTS_VARIABLES.JAIL_TURNS_QUANTITY}
        </span>{" "}
        turnos
      </p>
    </div>
  );

  return (
    <InfoModal
      headerColor="bg-red-900"
      headerIcon={Lock}
      headerTitle="Prisão"
      mainIcon={JailIconWithBadge as any}
      mainIconColor="bg-red-900"
      mainIconAnimation={{
        initial: { scale: 0, rotate: 90 },
        animate: { scale: 1, rotate: 0 },
      }}
      title="Você está visitando a prisão"
      description="Apenas de passagem, sem consequências"
      infoCard={infoCard}
      buttonText="Entendi"
      buttonColor="bg-red-800"
      playerId={playerId}
      onAction={onAction}
    />
  );
}
