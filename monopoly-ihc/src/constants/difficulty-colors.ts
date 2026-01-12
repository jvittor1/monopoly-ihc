export const DIFFICULTY_COLORS = {
  easy: "#4CAF50", // Verde - Fácil (20 pts)
  "easy-medium": "#FF9800", // Laranja - Médio-Fácil (30 pts)
  medium: "#2196F3", // Azul - Médio (40 pts)
  hard: "#FF5252", // Vermelho - Difícil (80 pts)
} as const;

export type Difficulty = keyof typeof DIFFICULTY_COLORS;
