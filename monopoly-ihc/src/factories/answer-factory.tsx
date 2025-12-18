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

const PropertyAnswerRegistry = {
  correct: React.lazy(
    () => import("../components/answers/correct-property-answer-component"),
  ),
  incorrect: React.lazy(
    () => import("../components/answers/incorrect-property-answer-component"),
  ),
};

export function AnswerFactory(
  isCorrect: boolean,
  tilePoints?: number,
): AnswerComponent {
  return isCorrect ? AnswersRegistry.correct : AnswersRegistry.incorrect;
}

export function PropertyAnswerFactory(
  isCorrect: boolean,
  propertyName?: string,
): AnswerComponent {
  return isCorrect
    ? PropertyAnswerRegistry.correct
    : PropertyAnswerRegistry.incorrect;
}
