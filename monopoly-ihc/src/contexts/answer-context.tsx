import React, {
  createContext,
  useContext,
  useState,
  Suspense,
  useEffect,
} from "react";
import { AnswerFactory } from "@/factories/answer-factory";
import { eventBus } from "@/utils/event-emitter";

interface AnswerContextType {
  showAnswer: (isCorrect: boolean) => void;
  closeAnswer: () => void;
}

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

  const showAnswer = (isCorrect: boolean) => {
    const AnswerComponent = AnswerFactory(isCorrect);

    setAnswerContent(
      <Suspense fallback={<div className="text-white">Carregando...</div>}>
        <AnswerComponent
          onClose={() => {
            closeAnswer();
            eventBus.emit("nextTurn");
          }}
        />
      </Suspense>,
    );
  };

  // Aqui ouvimos o evento do eventBus
  useEffect(() => {
    const handleShowAnswer = ({ isCorrect }: { isCorrect: boolean }) => {
      showAnswer(isCorrect);
    };

    eventBus.on("showAnswer", handleShowAnswer);
    return () => {
      eventBus.off("showAnswer", handleShowAnswer);
    };
  }, []);

  return (
    <AnswerContext.Provider value={{ showAnswer, closeAnswer }}>
      {children}
      {answerContent}
    </AnswerContext.Provider>
  );
}
