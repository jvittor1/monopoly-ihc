import type { QuestionCard } from "../interfaces/question-card";
import BaseCardComponent from "./base-card-component";
import { Home, Shuffle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { usePlayer } from "@/contexts/player-context";
import { BsQuestionLg } from "react-icons/bs";

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
  type,
  points,
  ownerId,
  className,
}: CardComponentProps) {
  const isProperty = type === "property";
  const hasOwner = ownerId !== null && ownerId !== undefined;
  const isRandomTile = type === "random";
  const { getPlayerById } = usePlayer();
  const ownerColor = hasOwner ? getPlayerById(ownerId!)?.color : null;

  return (
    <BaseCardComponent
      className={`relative flex h-[115px] w-[105px] flex-col items-center overflow-hidden ${className}`}
    >
      {isProperty && hasOwner && ownerColor && (
        <motion.div
          animate={{
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, ${ownerColor}30 0%, transparent 70%)`,
          }}
        />
      )}

      {!isRandomTile && (
        <div
          className={`relative h-[30px] w-full border-b-1 border-white ${colorByDifficulty[difficulty]}`}
        >
          {isProperty && (
            <div className="absolute top-1/2 left-1.5 -translate-y-1/2">
              <div className="flex items-center justify-center rounded-full bg-white/95 p-0.5 shadow-sm">
                <Home className="h-3 w-3 text-slate-600" strokeWidth={2.5} />
              </div>
            </div>
          )}

          {isProperty && hasOwner && ownerColor && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute top-1/2 right-1.5 -translate-y-1/2"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    `0 0 0 0px ${ownerColor}40`,
                    `0 0 0 3px ${ownerColor}40`,
                    `0 0 0 0px ${ownerColor}40`,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white shadow-md"
                style={{ backgroundColor: ownerColor }}
              >
                {getPlayerById(ownerId!)?.name.charAt(0).toUpperCase()}
              </motion.div>
            </motion.div>
          )}
        </div>
      )}

      <div className="relative z-10 flex flex-1 flex-col items-center justify-between p-3">
        <p className="text-sxs text-center font-semibold uppercase">{text}</p>

        {isRandomTile && (
          <motion.div>
            <BsQuestionLg size={36} color="white" />
          </motion.div>
        )}

        <span className="text-xs font-medium">{points} pontos</span>
      </div>
    </BaseCardComponent>
  );
}
