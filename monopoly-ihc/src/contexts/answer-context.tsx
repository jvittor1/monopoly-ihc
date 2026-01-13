import React, {
  createContext,
  useContext,
  useState,
  Suspense,
  useRef,
} from "react";

const CorrectAnswerModal = React.lazy(
  () => import("@/components/answers/correct-answer-component"),
);
const IncorrectAnswerModal = React.lazy(
  () => import("@/components/answers/incorrect-answer-component"),
);
const PropertyAcquiredModal = React.lazy(
  () => import("@/components/answers/correct-property-answer-component"),
);
const PropertyFailedModal = React.lazy(
  () => import("@/components/answers/incorrect-property-answer-component"),
);

export type AnswerContextType = {
  showAnswer: (
    isCorrect: boolean,
    tilePoints?: number,
    onClose?: () => void,
  ) => Promise<void>;
  showModalPropertyAcquired: (
    isCorrect: boolean,
    propertyName: string,
    playerId: number,
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

      setAnswerContent(
        <Suspense fallback={<div className="text-white">Carregando...</div>}>
          {isCorrect ? (
            <CorrectAnswerModal
              points={tilePoints}
              onClose={() => {
                closeAnswer();
              }}
            />
          ) : (
            <IncorrectAnswerModal
              points={tilePoints}
              onClose={() => {
                closeAnswer();
              }}
            />
          )}
        </Suspense>,
      );
    });
  };

  const showModalPropertyAcquired = (
    isCorrect: boolean,
    propertyName: string,
    playerId: number,
  ): Promise<void> => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;

      setAnswerContent(
        <Suspense fallback={<div className="text-white">Carregando...</div>}>
          {isCorrect ? (
            <PropertyAcquiredModal
              propertyName={propertyName}
              playerId={playerId}
              onClose={() => {
                closeAnswer();
              }}
            />
          ) : (
            <PropertyFailedModal
              propertyName={propertyName}
              playerId={playerId}
              onClose={() => {
                closeAnswer();
              }}
            />
          )}
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
