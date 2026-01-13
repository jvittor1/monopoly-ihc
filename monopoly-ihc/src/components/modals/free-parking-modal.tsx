import type { CornerTile } from "@/interfaces/corner-tile";
import { motion } from "framer-motion";
import { Coffee, Smile } from "lucide-react";
import type { BaseModalProps } from "@/types/modal-type";
import InfoModal from "./info-modal";

type FreeParkingModalProps = BaseModalProps<CornerTile>;

export default function FreeParkingModal({
  onAction,
  playerId,
}: FreeParkingModalProps) {
  const infoCard = (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: "spring" }}
      className="rounded bg-purple-800/20 p-4 text-center backdrop-blur-sm"
      style={{ border: "0.5px solid var(--color-purple-border)" }}
    >
      <p className="text-lg font-semibold text-purple-300">Momento de pausa</p>
      <p className="mt-1 text-sm text-gray-300">
        Aproveite para respirar fundo
      </p>
    </motion.div>
  );

  return (
    <InfoModal
      headerColor="bg-purple-900"
      headerIcon={Coffee}
      headerTitle="Estacionamento Livre"
      mainIcon={Smile}
      mainIconColor="bg-purple-900"
      title="Momento de pausa"
      description="Tire um momento para descansar!"
      infoCard={infoCard}
      buttonText="Continuar Jogando"
      buttonColor="bg-purple-900"
      playerId={playerId}
      onAction={onAction}
    />
  );
}
