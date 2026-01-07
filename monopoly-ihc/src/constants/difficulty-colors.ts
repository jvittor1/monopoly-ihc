export const DIFFICULTY_COLORS = {
  easy: "#6DF282",
  "easy-medium": "#84C7E2",
  medium: "#4E0062",
  hard: "#FF5252",
} as const;

export type Difficulty = keyof typeof DIFFICULTY_COLORS;
