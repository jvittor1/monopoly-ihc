import { CheckCircle, Home } from "lucide-react";
import { motion } from "framer-motion";
import InfoModal from "../modals/info-modal";

interface OwnPropertyModalProps {
  propertyName: string;
  rentPrice: number;
  playerId: number;
  onAction?: (params?: any) => void;
}

export default function OwnPropertyModal({
  propertyName,
  rentPrice,
  playerId,
  onAction,
}: OwnPropertyModalProps) {
  const infoCard = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="rounded bg-green-600/20 p-4 text-center backdrop-blur-sm"
      style={{ border: "0.5px solid var(--color-green-border)" }}
    >
      <div className="mb-2 flex items-center justify-center gap-2">
        <Home className="h-5 w-5 text-green-400" />
        <h3 className="text-lg font-bold text-green-50">{propertyName}</h3>
      </div>
      <p className="text-xs text-gray-400">Valor do aluguel: {rentPrice} pts</p>
    </motion.div>
  );

  return (
    <InfoModal
      headerColor="bg-green-900"
      headerIcon={Home}
      headerTitle="Sua Propriedade"
      mainIcon={CheckCircle}
      mainIconColor="bg-green-900"
      title="Você está em casa!"
      description="Esta é sua propriedade"
      infoCard={infoCard}
      buttonText="Continuar"
      buttonColor="bg-green-800"
      playerId={playerId}
      onAction={onAction}
    />
  );
}
