import React from "react";

type AnswerComponentProps = {
  onClose: () => void;
};

type AnswerComponent = React.FC<AnswerComponentProps>;

const AnswersRegistry = {
  correct: React.lazy(
    () => import("../components/answers/correct-answer-component"),
  ),
  incorrect: React.lazy(
    () => import("../components/answers/incorrect-answer-component"),
  ),
};

export function AnswerFactory(
  isCorrect: boolean,
  tilePoints?: number,
): AnswerComponent {
  return isCorrect ? AnswersRegistry.correct : AnswersRegistry.incorrect;
}
