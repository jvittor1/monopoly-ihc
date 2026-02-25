export const DIFFICULTY_COLORS = {
  easy: "#4CAF50",
  "easy-medium": "#FF9800",
  medium: "#2196F3",
  hard: "#FF5252",
} as const;

export type Difficulty = keyof typeof DIFFICULTY_COLORS;
