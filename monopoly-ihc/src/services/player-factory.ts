import type { Player } from "@/interfaces/player";
import type { GameConfig } from "@/components/modals/game-setup-modal";

const AVAILABLE_COLORS = [
  "#457B9D", // Azul
  "#E63946", // Vermelho
  "#FFFFFF", // Branco
  "#F4A261", // Laranja
  "#9D4EDD", // Roxo
  "#06FFA5", // Verde Neon
];

export function createPlayers(config: GameConfig): Player[] {
  const { playerName, playerColor, botDifficulty } = config;

  const availableColorsForBot = AVAILABLE_COLORS.filter(
    (c) => c !== playerColor,
  );
  const randomIndex = Math.floor(Math.random() * availableColorsForBot.length);
  const botColor = availableColorsForBot[randomIndex] || AVAILABLE_COLORS[1];

  const humanPlayer: Player = {
    id: 1,
    name: playerName,
    position: 0,
    money: 500,
    properties: [],
    inJail: false,
    jailTurns: 0,
    getOutOfJailFreeCards: 0,
    bankrupt: false,
    color: playerColor,
    isBot: false,
  };

  const botPlayer: Player = {
    id: 2,
    name: "Bot",
    position: 0,
    money: 500,
    properties: [],
    inJail: false,
    jailTurns: 0,
    getOutOfJailFreeCards: 0,
    bankrupt: false,
    color: botColor,
    isBot: true,
    botDifficulty,
  };

  return [humanPlayer, botPlayer];
}
