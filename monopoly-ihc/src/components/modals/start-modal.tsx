import { POINTS_VARIABLES } from "@/constants/points-variables";
import type { CornerTile } from "@/interfaces/corner-tile";
import type { BaseModalProps } from "@/types/modal-type";
import { motion } from "framer-motion";
import { TrendingUp, Coins } from "lucide-react";
import InfoModal from "./info-modal";

type StartModalProps = BaseModalProps<CornerTile>;

export default function StartModal({ onAction, playerId }: StartModalProps) {
  const bonusAmount = POINTS_VARIABLES.START;

  const infoCard = (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: "spring" }}
      className="inline-block rounded bg-green-900/20 px-6 py-3 backdrop-blur-sm"
      style={{
        border: "0.5px solid var(--color-green-border-medium)",
      }}
    >
      <span className="text-3xl font-bold text-green-400">+{bonusAmount}</span>
      <span className="ml-2 text-sm text-gray-300">pontos</span>
    </motion.div>
  );

  return (
    <InfoModal
      headerColor="bg-green-900"
      headerIcon={TrendingUp}
      headerTitle="Início"
      mainIcon={Coins}
      mainIconColor="bg-yellow-600"
      title="Você passou pelo Início!"
      description="Receba seu bônus por completar a volta"
      infoCard={infoCard}
      buttonText="Continuar Jogando"
      buttonColor="bg-green-900"
      playerId={playerId}
      onAction={onAction}
    />
  );
}
