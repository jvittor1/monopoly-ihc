import type { QuestionCard } from "@/interfaces/question-card";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle2, AlertTriangle, Zap } from "lucide-react";

import type { BaseModalProps } from "@/types/modal-type";

type QuestionModalProps = BaseModalProps<QuestionCard>;

import { gameLogic } from "@/services/game-logic";

export default function RandomQuestionModal({
  tile: initialTile,
  playerId,
  onAction,
}: QuestionModalProps) {
  const TOTAL_TIME = 60;
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  
  // State to hold the dynamically fetched card
  const [dynamicCard, setDynamicCard] = useState<QuestionCard | null>(null);

  useEffect(() => {
    // Fetch a fresh Revés card when the modal mounts
    const card = gameLogic.drawRevesCard();
    setDynamicCard(card);
  }, []);

  // Use dynamicCard if available, otherwise fallback to initialTile (shouldn't happen for Revés)
  const tile = dynamicCard || initialTile;

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
      onAction({ playerId, isCorrect, points: tile.points });
    }
  };

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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      >
        <motion.div
          key="modal"
          initial={{ y: 50, opacity: 0, scale: 0.75 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.75 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg border border-purple-500/30 bg-gradient-to-br from-[#0f2027] to-[#12304d] shadow-2xl shadow-purple-500/20 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-500/20"
        >
          {/* Efeito de alerta piscante */}
          <motion.div
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-purple-600/10 to-pink-600/10"
          />

          {/* Timer Circular - Top Right */}
          <div className="absolute -top-3 -right-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 p-2 shadow-lg shadow-purple-500/50">
            <div className="relative flex h-12 w-12 items-center justify-center">
              <svg className="h-12 w-12 -rotate-90 transform">
                <circle
                  cx="24"
                  cy="24"
                  r="16"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="3"
                  fill="none"
                />
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
                <span className="text-sm font-bold text-white">{timeLeft}</span>
              </div>
            </div>
          </div>

          {/* Raios de alerta decorativos */}
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-6 left-6"
          >
            <Zap className="h-5 w-5 text-yellow-400" fill="currentColor" />
          </motion.div>

          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute top-20 right-6"
          >
            <Zap className="h-4 w-4 text-yellow-400" fill="currentColor" />
          </motion.div>

          {/* Conteúdo */}
          <div className="relative z-10 p-6">
            {/* Header */}
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-md bg-gradient-to-r from-purple-500 to-pink-600 p-2.5">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <h2 className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-xl font-bold text-transparent">
                {tile.type === "random" ? "Sorte ou Revés" : tile.text}
              </h2>
            </div>

            {/* Aviso */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4 rounded-lg border border-yellow-500/30 bg-yellow-900/20 px-3 py-2 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                <p className="text-xs font-semibold text-yellow-200">
                  Cuidado! Errar esta questão terá consequências
                </p>
              </div>
            </motion.div>

            {/* Pergunta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-5 transform rounded-lg border border-purple-500/30 bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-5 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.01] hover:border-purple-500/50"
            >
              <p className="text-base leading-relaxed font-medium text-purple-50">
                {tile.question}
              </p>
            </motion.div>

            {/* Alternativas */}
            <div className="mb-5 grid grid-cols-1 gap-2.5">
              {tile.alternatives.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onClick={() => setSelected(option.id)}
                  className={`relative transform rounded-lg p-3.5 text-left transition-all duration-300 hover:scale-[1.01] ${
                    selected === option.id
                      ? "scale-[1.01] bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30"
                      : "border border-slate-600/50 bg-slate-800/40 backdrop-blur-sm hover:border-purple-500/50 hover:bg-slate-700/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-md text-sm font-bold transition-all ${
                        selected === option.id
                          ? "bg-white text-purple-600"
                          : "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                      }`}
                    >
                      {option.id}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        selected === option.id ? "text-white" : "text-slate-200"
                      }`}
                    >
                      {option.text}
                    </span>
                    {selected === option.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto"
                      >
                        <CheckCircle2 className="h-4 w-4 animate-bounce text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Botão Confirmar */}
            <div className="flex justify-end">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                disabled={!selected}
                onClick={submitAnswer}
                className={`flex transform items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                  selected
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
                    : "cursor-not-allowed border border-slate-600/50 bg-slate-700/50 text-slate-400"
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                Confirmar
              </motion.button>
            </div>
          </div>

          {/* Decoração de cantos */}
          <div className="absolute top-0 left-0 h-16 w-16 rounded-tl-lg bg-gradient-to-br from-purple-500/10 to-transparent" />
          <div className="absolute right-0 bottom-0 h-16 w-16 rounded-br-lg bg-gradient-to-tl from-pink-500/10 to-transparent" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
