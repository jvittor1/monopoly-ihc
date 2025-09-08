import type { BaseTile } from "./base-tile";

export interface QuestionCard extends BaseTile {
  question: string;
  answer: string;
  difficulty: "easy" | "easy-medium" | "medium" | "hard";
  points: number;
  ownerId?: number;
}
