import { CheckCircle2, Home, Key } from "lucide-react";
import PropertyAnswerModal from "./property-answer-modal";

interface PropertyAcquiredModalProps {
  onClose: () => void;
  propertyName?: string;
  playerId: number;
}

export default function PropertyAcquiredModal({
  onClose,
  propertyName,
  playerId,
}: PropertyAcquiredModalProps) {
  const infoMessage = (
    <>
      <Key className="h-4 w-4 text-green-400" />
      Agora você cobra aluguel de quem cair aqui!
    </>
  );

  return (
    <PropertyAnswerModal
      headerBg="bg-cyan-900"
      headerIcon={Home}
      headerTitle="Propriedade Conquistada!"
      mainGradient="from-cyan-500 to-blue-500"
      badgeIcon={CheckCircle2}
      badgeBg="bg-green-500"
      title="Parabéns! Você é o novo proprietário!"
      titleColor="text-cyan-400"
      propertyCardBg="bg-cyan-900/30"
      propertyCardBorder="rgba(34, 211, 238, 0.3)"
      propertyTextColor="text-cyan-300"
      infoMessage={infoMessage}
      infoCardBg="bg-green-900/30"
      infoTextColor="text-green-300"
      buttonBg="bg-cyan-900/70 hover:bg-cyan-900/90"
      propertyName={propertyName}
      playerId={playerId}
      onClose={onClose}
    />
  );
}
