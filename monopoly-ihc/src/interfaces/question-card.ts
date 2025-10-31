import type { BaseTile } from "./base-tile";

export interface QuestionCard extends BaseTile {
  question: string;
  answer: string;
  difficulty: "easy" | "easy-medium" | "medium" | "hard";
  alternatives: Alternative[];
  correctAlternative: number;
  isCorner: false;
  points: number;
  ownerId?: number;
  rentPrice: number;
}

export type Alternative = {
  id: number;
  text: string;
};
