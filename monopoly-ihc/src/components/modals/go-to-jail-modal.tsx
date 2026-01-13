import type { CornerTile } from "@/interfaces/corner-tile";
import { motion } from "framer-motion";
import type { BaseModalProps } from "@/types/modal-type";
import InfoModal from "./info-modal";
import { GiHandcuffs } from "react-icons/gi";

type GoToJailModalProps = BaseModalProps<CornerTile>;

export default function GoToJailModal({
  onAction,
  playerId,
}: GoToJailModalProps) {
  const infoCard = (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: "spring" }}
      className="rounded bg-red-700/20 p-4 text-center backdrop-blur-sm"
      style={{ border: "0.5px solid var(--color-red-border-light)" }}
    >
      <p className="text-sm font-semibold text-red-400">
        Você precisará acertar uma pergunta para sair
      </p>
    </motion.div>
  );

  return (
    <InfoModal
      headerColor="bg-red-900"
      headerIcon={GiHandcuffs}
      headerTitle="VÁ PARA A PRISÃO!"
      mainIcon={GiHandcuffs}
      mainIconColor="bg-red-900"
      mainIconAnimation={{
        initial: { scale: 0, rotate: 90 },
        animate: { scale: 1, rotate: 0 },
      }}
      title="Você foi pego!"
      description="Vá direto para a prisão sem passar pelo Início"
      infoCard={infoCard}
      buttonText="Ir para a Prisão"
      buttonColor="bg-red-900"
      playerId={playerId}
      onAction={onAction}
    />
  );
}
