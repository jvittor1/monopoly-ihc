import type { QuestionCard } from "../interfaces/question-card";
import BaseCardComponent from "./base-card-component";
import { motion } from "framer-motion";
import { usePlayer } from "@/contexts/player-context";
import { BsQuestionLg } from "react-icons/bs";
import HouseComponent from "./property-component";
import { DIFFICULTY_COLORS } from "@/constants/colors";

interface CardComponentProps extends QuestionCard {
  className?: string;
}

export default function CardComponent({
  text,
  difficulty,
  type,
  points,
  ownerId,
  className,
}: CardComponentProps) {
  const isProperty = type === "property";
  const hasOwner = ownerId !== null && ownerId !== undefined;
  const isRandomTile = type === "random";
  const { getPlayerById } = usePlayer();
  const owner = getPlayerById(ownerId!);
  const ownerColor = hasOwner ? owner?.color : null;

  return (
    <BaseCardComponent
      className={`relative flex h-[115px] w-[105px] flex-col items-center ${className}`}
    >
      {!isRandomTile && (
        <div
          className="relative z-50 h-[30px] w-full border-b-1 border-white"
          style={{ backgroundColor: DIFFICULTY_COLORS[difficulty] }}
        >
          {isProperty && hasOwner && ownerColor && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[50%] scale-75 transform">
              <HouseComponent color={ownerColor} />
            </div>
          )}
        </div>
      )}

      <div className="relative z-10 flex flex-1 flex-col items-center justify-between p-3">
        <p className="text-sxs text-center font-semibold uppercase">{text}</p>

        {isRandomTile && (
          <motion.div>
            <BsQuestionLg size={48} color="white" />
          </motion.div>
        )}

        <span className="text-xs font-medium">
          {!isRandomTile ? `${points} pontos` : ""}
        </span>
      </div>
    </BaseCardComponent>
  );
}
