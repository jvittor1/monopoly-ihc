import React, {
  createContext,
  useContext,
  useState,
  Suspense,
  useRef,
} from "react";
import {
  AnswerFactory,
  PropertyAnswerFactory,
} from "@/factories/answer-factory";

export type AnswerContextType = {
  showAnswer: (
    isCorrect: boolean,
    tilePoints?: number,
    onClose?: () => void,
  ) => Promise<void>;
  showModalPropertyAcquired: (
    isCorrect: boolean,
    propertyName: string,
  ) => Promise<void>;
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

  const resolveRef = useRef<(() => void) | null>(null);

  const closeAnswer = () => {
    setAnswerContent(null);
    if (resolveRef.current) {
      resolveRef.current();
      resolveRef.current = null;
    }
  };

  const showAnswer = (
    isCorrect: boolean,
    tilePoints?: number,
  ): Promise<void> => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;

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
            }}
          />
        </Suspense>,
      );
    });
  };

  const showModalPropertyAcquired = (
    isCorrect: boolean,
    propertyName: string,
  ): Promise<void> => {
    console.log("ta chegando aqui");
    return new Promise((resolve) => {
      resolveRef.current = resolve;

      const AnswerComponent = PropertyAnswerFactory(
        isCorrect,
        propertyName,
      ) as React.ComponentType<{
        propertyName: string;
        onClose?: () => void;
      }>;

      setAnswerContent(
        <Suspense fallback={<div className="text-white">Carregando...</div>}>
          <AnswerComponent
            propertyName={propertyName}
            onClose={() => {
              closeAnswer();
            }}
          />
        </Suspense>,
      );
    });
  };

  return (
    <AnswerContext.Provider
      value={{ showAnswer, closeAnswer, showModalPropertyAcquired }}
    >
      {children}
      {answerContent}
    </AnswerContext.Provider>
  );
}
