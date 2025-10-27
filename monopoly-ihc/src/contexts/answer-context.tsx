import React, { createContext, useContext, useState, Suspense } from "react";
import { AnswerFactory } from "@/factories/answer-factory";

export type AnswerContextType = {
  showAnswer: (
    isCorrect: boolean,
    playerId: number,
    tileId: number,
    tilePoints?: number,
    onClose?: () => void,
  ) => void;
  closeAnswer: () => void;
};

const AnswerContext = createContext<AnswerContextType | undefined>(undefined);

export const useAnswer = () => {
  const ctx = useContext(AnswerContext);
  if (!ctx) throw new Error("useAnswer must be used inside AnswerProvider");
  return ctx;
};

export function AnswerProvider({ children }: { children: React.ReactNode }) {
  const [answerContent, setAnswerContent] = useState<React.ReactNode | null>(
    null,
  );

  const closeAnswer = () => setAnswerContent(null);

  const showAnswer = (
    isCorrect: boolean,
    playerId: number,
    tileId: number,
    tilePoints?: number,
    onClose?: () => void,
  ) => {
    const AnswerComponent = AnswerFactory(
      isCorrect,
      tilePoints,
    ) as React.ComponentType<{
      tilePoints?: number;
      onClose?: () => void;
    }>;

    setAnswerContent(
      <Suspense fallback={<div className="text-white">Carregando...</div>}>
        <AnswerComponent
          tilePoints={tilePoints}
          onClose={() => {
            closeAnswer();
            onClose?.();
          }}
        />
      </Suspense>,
    );
  };

  return (
    <AnswerContext.Provider value={{ showAnswer, closeAnswer }}>
      {children}
      {answerContent}
    </AnswerContext.Provider>
  );
}
