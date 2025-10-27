import type { BaseTile } from "@/interfaces/base-tile";
import type { Alternative, QuestionCard } from "@/interfaces/question-card";
import type { TileType } from "@/types/tile-type";

export function createQuestionCard(data: {
  id: number;
  text: string;
  question: string;
  answer: string;
  type: TileType;
  effect: BaseTile["effect"];
  difficulty: QuestionCard["difficulty"];
  alternatives: Alternative[];
  correctAlternative: number;
  points: number;
  ownerId?: number;
}): QuestionCard {
  return {
    ...data,
    isCorner: false,
  };
}
