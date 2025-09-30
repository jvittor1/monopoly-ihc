import type { QuestionCard } from "../interfaces/question-card";
import BaseCardComponent from "./base-card-component";

const colorByDifficulty = {
  easy: "bg-[#6DF282]",
  "easy-medium": "bg-[#84C7E2]",
  medium: "bg-[#4E0062]",
  hard: "bg-[#FF5252]",
};

interface CardComponentProps extends QuestionCard {
  className?: string;
}

export default function CardComponent({
  text,
  question,
  answer,
  difficulty,
  points,
  ownerId,
  className,
}: CardComponentProps) {
  return (
    <BaseCardComponent
      className={`flex h-[115px] w-[105px] flex-col items-center ${className}`}
    >
      <div
        className={`h-[30px] w-full border-b-1 border-white ${colorByDifficulty[difficulty]}`}
      ></div>
      <div className="flex flex-1 flex-col items-center justify-between p-3">
        <p className="text-sxs font-bold uppercase">{text}</p>
        <span className="text-xs font-medium">{points} pontos</span>
      </div>
    </BaseCardComponent>
  );
}
