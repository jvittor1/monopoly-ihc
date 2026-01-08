import type { QuestionCard } from "@/interfaces/question-card";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { DIFFICULTY_COLORS } from "@/constants/difficulty-colors";

import type { BaseModalProps } from "@/types/modal-type";

type QuestionModalProps = BaseModalProps<QuestionCard>;

export default function QuestionModal({
  tile,
  playerId,
  onAction,
}: QuestionModalProps) {
  const TOTAL_TIME = 60;
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      const timeout = setTimeout(submitAnswer, 1500);
      return () => clearTimeout(timeout);
    }
  }, [timeLeft]);

  const submitAnswer = () => {
    if (selected === null) setSelected(-1);
    const isCorrect = selected === tile.correctAlternative;
    if (onAction) {
      onAction({ playerId, isCorrect });
    }
  };

  const difficultyColor = DIFFICULTY_COLORS[tile.difficulty];
  const percentage = (timeLeft / TOTAL_TIME) * 100;
  const circumference = 2 * Math.PI * 16;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
      >
        <motion.div
          key="modal"
          initial={{ y: 50, opacity: 0, scale: 0.85 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.85 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative max-h-[90vh] w-full max-w-2xl overflow-x-hidden overflow-y-auto rounded bg-gray-900/95 text-white shadow-2xl backdrop-blur-sm"
          style={{ border: "0.5px solid var(--color-border-light)" }}
        >
          {/* Timer Circular - Top Right - Simplified */}
          <div className="absolute -top-1 -right-1 animate-pulse rounded-full p-2">
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

          {/* Header - Sem cor da dificuldade */}
          <div
            className="rounded-t bg-gray-800 p-4"
            style={{
              borderBottom: "0.5px solid var(--color-border-light)",
            }}
          >
            <div className="flex items-center gap-2">
              <h2 className="bg-gradient-to-r text-xl font-bold tracking-wide text-blue-400 uppercase">
                {tile.type}
              </h2>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-6">
            {/* Pergunta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative mb-5 rounded bg-gray-800/90 bg-gradient-to-br to-gray-900/90 p-5 backdrop-blur-sm"
              style={{ border: "0.5px solid var(--color-border-subtle)" }}
            >
              {/* Barra lateral sutil com cor da dificuldade */}
              <div
                className="absolute top-0 bottom-0 left-0 w-0.5 rounded-l-md"
                style={{ backgroundColor: difficultyColor }}
              ></div>

              <div className="flex items-start gap-3">
                {/* Ícone de pergunta */}
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

            {/* Alternativas com cor padrão verde */}
            <div className="mb-5 space-y-2.5">
              {tile.alternatives.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  onClick={() => setSelected(option.id)}
                  className={`w-full rounded p-3.5 text-left transition-all duration-300 hover:scale-[1.01] ${
                    selected === option.id
                      ? "bg-blue-800 bg-gradient-to-r shadow-lg"
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

            {/* Botão Confirmar com cor padrão verde */}
            <div className="flex justify-end">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                disabled={!selected}
                onClick={submitAnswer}
                className={`flex cursor-pointer items-center gap-2 rounded px-6 py-2.5 text-sm font-bold uppercase transition-all duration-300 ${
                  selected
                    ? "bg-blue-800 text-white shadow-lg hover:bg-blue-900"
                    : "cursor-not-allowed bg-gray-700/50 text-gray-400"
                }`}
                style={{
                  border: selected
                    ? "0.5px solid var(--color-blue-border-medium)"
                    : "0.5px solid var(--color-border-faint)",
                }}
              >
                <CheckCircle2 className="h-4 w-4" />
                Confirmar
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
