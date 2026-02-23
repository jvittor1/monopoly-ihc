import type { QuestionCard } from "@/interfaces/question-card";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { CheckCircle2, AlertTriangle, Star } from "lucide-react";
import { DIFFICULTY_COLORS } from "@/constants/difficulty-colors";

import type { BaseModalProps } from "@/types/modal-type";

type QuestionModalProps = BaseModalProps<QuestionCard>;

import { gameLogic } from "@/services/game-logic";
import ModalWrapper from "./modal-wrapper";
import { BotService } from "@/services/bot-service";
import { usePlayer } from "@/contexts/player-context";

export default function RandomQuestionModal({
  tile: initialTile,
  playerId,
  onAction,
}: QuestionModalProps) {
  const TOTAL_TIME = 60;
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const hasSubmitted = useRef(false);
  const { getPlayerById } = usePlayer();
  const currentPlayer = getPlayerById(playerId);
  const isBot = currentPlayer?.isBot ?? false;

  const [dynamicCard, setDynamicCard] = useState<QuestionCard | null>(null);

  useEffect(() => {
    const card = gameLogic.drawRevesCard();
    setDynamicCard(card);
  }, []);

  const tile = dynamicCard || initialTile;

  useEffect(() => {
    if (isBot) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isBot]);

  useEffect(() => {
    if (timeLeft === 0) {
      const timeout = setTimeout(submitAnswer, 1500);
      return () => clearTimeout(timeout);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (!isBot || !dynamicCard) return;

    const playBotTurn = async () => {
      await BotService.thinkingDelay();

      const answer = BotService.chooseAnswer(
        dynamicCard,
        currentPlayer!.botDifficulty,
      );
      setSelected(answer);

      await BotService.submitDelay();

      if (hasSubmitted.current) return;
      hasSubmitted.current = true;

      const isCorrect = answer === dynamicCard.correctAlternative;
      if (onAction) {
        onAction({ playerId, isCorrect, points: dynamicCard.points });
      }
    };

    playBotTurn();
  }, [isBot, dynamicCard, playerId, onAction]);

  const submitAnswer = () => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;

    if (selected === null) setSelected(-1);
    const isCorrect = selected === tile.correctAlternative;
    if (onAction) {
      onAction({ playerId, isCorrect, points: tile.points });
    }
  };

  const difficultyColor = DIFFICULTY_COLORS[tile.difficulty];
  const starCount =
    { easy: 1, "easy-medium": 2, medium: 3, hard: 4 }[tile.difficulty] ?? 1;
  const percentage = (timeLeft / TOTAL_TIME) * 100;
  const circumference = 2 * Math.PI * 16;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <ModalWrapper isOpen={true} disableBackdropClick maxWidth="2xl">
      <div className="relative max-h-[90vh] w-full overflow-x-hidden overflow-y-auto">
        <div
          className={`rounded-ful absolute -top-1 -right-1 animate-pulse p-2 ${isBot ? "hidden" : ""}`}
        >
          <div className="relative flex h-12 w-12 items-center justify-center">
            <svg className="h-12 w-12 -rotate-90 transform">
              <circle
                cx="24"
                cy="24"
                r="16"
                stroke="white"
                strokeWidth="3"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-white tabular-nums">
                {timeLeft}
              </span>
            </div>
          </div>
        </div>

        <div
          className="rounded-t bg-gray-800 p-4"
          style={{
            borderBottom: "0.5px solid var(--color-border-light)",
          }}
        >
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-wide text-purple-400 uppercase">
              {tile.type === "random" ? "Sorte ou Revés" : tile.text}
            </h2>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: starCount }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-yellow-200 text-yellow-200"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-5 rounded bg-yellow-900/30 px-4 py-3 backdrop-blur-sm"
            style={{ border: "0.5px solid rgba(234, 179, 8, 0.3)" }}
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 text-yellow-400" />
              <p className="text-sm font-semibold text-yellow-200">
                Cuidado! Errar esta questão terá consequências
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative mb-5 rounded bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-5 backdrop-blur-sm"
            style={{ border: "0.5px solid var(--color-border-subtle)" }}
          >
            <div
              className="absolute top-0 bottom-0 left-0 w-0.5"
              style={{ backgroundColor: difficultyColor }}
            ></div>

            <div className="flex items-start gap-3">
              <div
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded text-sm font-bold shadow-lg"
                style={{
                  backgroundColor: difficultyColor,
                  border: "0.5px solid var(--color-border-lighter)",
                }}
              >
                ?
              </div>
              <p className="flex-1 text-base leading-relaxed font-medium text-white">
                {tile.question}
              </p>
            </div>
          </motion.div>

          <div className="mb-5 space-y-2.5">
            {tile.alternatives.map((option, index) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => setSelected(option.id)}
                disabled={isBot}
                className={`w-full rounded p-3.5 text-left transition-all duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 ${
                  selected === option.id
                    ? "bg-purple-800 shadow-lg"
                    : "bg-gray-800/60 backdrop-blur-sm hover:bg-gray-700/70"
                }`}
                style={{
                  border:
                    selected === option.id
                      ? "0.5px solid var(--color-border-lighter)"
                      : "0.5px solid var(--color-border-faint)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded text-sm font-bold transition-all ${
                      selected === option.id
                        ? "scale-110 bg-white/20"
                        : "bg-white/10"
                    }`}
                    style={{
                      border: "0.5px solid var(--color-border-lighter)",
                    }}
                  >
                    {option.id}
                  </div>
                  <span className="flex-1 text-sm font-medium text-white">
                    {option.text}
                  </span>
                  {selected === option.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto"
                    >
                      <CheckCircle2 className="h-4 w-4 animate-pulse text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          <div className="flex justify-end">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              disabled={!selected || isBot}
              onClick={submitAnswer}
              className={`flex cursor-pointer items-center gap-2 rounded px-6 py-2.5 text-sm font-bold uppercase transition-all duration-300 ${
                selected && !isBot
                  ? "bg-purple-800 text-white shadow-lg hover:bg-purple-900"
                  : "cursor-not-allowed bg-gray-700/50 text-gray-400"
              }`}
              style={{
                border:
                  selected && !isBot
                    ? "0.5px solid var(--color-border-lighter)"
                    : "0.5px solid var(--color-border-faint)",
              }}
            >
              <CheckCircle2 className="h-4 w-4" />
              Confirmar
            </motion.button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
