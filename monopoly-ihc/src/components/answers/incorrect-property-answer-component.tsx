import { XCircle, AlertTriangle, Home } from "lucide-react";
import PropertyAnswerModal from "./property-answer-modal";

interface PropertyFailedModalProps {
  onClose: () => void;
  propertyName?: string;
  playerId: number;
}

export default function PropertyFailedModal({
  onClose,
  propertyName,
  playerId,
}: PropertyFailedModalProps) {
  const infoMessage = (
    <>
      <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
      <p className="text-sm">
        A propriedade continua disponível para tentativas futuras
      </p>
    </>
  );

  return (
    <PropertyAnswerModal
      headerBg="bg-red-900"
      headerIcon={Home}
      headerTitle="Resposta Incorreta"
      mainGradient="from-gray-700 to-gray-800"
      badgeIcon={XCircle}
      badgeBg="bg-red-500"
      title="Que pena! Resposta Errada"
      titleColor="text-red-400"
      propertyCardBg="bg-red-900/30"
      propertyCardBorder="rgba(239, 68, 68, 0.3)"
      propertyTextColor="text-red-300"
      infoMessage={infoMessage}
      infoCardBg="bg-yellow-900/30"
      infoTextColor="text-yellow-400"
      buttonBg="bg-red-900/70 hover:bg-red-900/90"
      propertyName={propertyName}
      playerId={playerId}
      onClose={onClose}
    />
  );
}
