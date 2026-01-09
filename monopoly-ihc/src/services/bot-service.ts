import type { Player } from "@/interfaces/player";
import type { QuestionCard } from "@/interfaces/question-card";

const DIFFICULTY_PROBABILITIES = {
  easy: 0.3,
  medium: 0.5,
  hard: 0.7,
  master: 0.99,
};

export class BotService {
  static shouldAnswerCorrectly(difficulty: Player["botDifficulty"]): boolean {
    if (!difficulty) return false;

    const probability = DIFFICULTY_PROBABILITIES[difficulty];
    return Math.random() < probability;
  }

  static chooseAnswer(
    question: QuestionCard,
    difficulty: Player["botDifficulty"],
  ): number {
    const shouldBeCorrect = this.shouldAnswerCorrectly(difficulty);

    if (shouldBeCorrect) {
      return question.correctAlternative;
    }

    const wrongAnswers = question.alternatives
      .map((alt) => alt.id)
      .filter((id) => id !== question.correctAlternative);

    return wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
  }

  static async thinkingDelay(): Promise<void> {
    const delay = 2000 + Math.random() * 2000;
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  static async submitDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
