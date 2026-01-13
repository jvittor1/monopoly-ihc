import { CheckCircle2, TrendingUp } from "lucide-react";
import AnswerFeedbackModal from "./answer-feedback-modal";

interface CorrectAnswerModalProps {
  onClose: () => void;
  points?: number;
}

export default function CorrectAnswerModal({
  onClose,
  points,
}: CorrectAnswerModalProps) {
  return (
    <AnswerFeedbackModal
      type="success"
      headerTitle="Resposta Correta!"
      mainIcon={CheckCircle2}
      title="Parabéns! Você acertou!"
      description="Continue assim e domine o jogo!"
      points={points}
      pointsIcon={TrendingUp}
      onClose={onClose}
    />
  );
}
