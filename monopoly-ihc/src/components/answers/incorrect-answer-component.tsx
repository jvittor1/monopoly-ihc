import { XCircle, TrendingDown } from "lucide-react";
import AnswerFeedbackModal from "./answer-feedback-modal";

interface IncorrectAnswerModalProps {
  onClose: () => void;
  points?: number;
}

import { useEffect } from "react";
import { useSound } from "@/contexts/sound-context";

export default function IncorrectAnswerModal({
  onClose,
  points,
}: IncorrectAnswerModalProps) {
  const { playSound } = useSound();

  useEffect(() => {
    playSound("error");
  }, []);
  return (
    <AnswerFeedbackModal
      type="error"
      headerTitle="Resposta Incorreta"
      mainIcon={XCircle}
      title="Que pena! Você errou"
      description="Não desanime! Continue tentando!"
      points={points}
      pointsIcon={TrendingDown}
      onClose={onClose}
    />
  );
}
