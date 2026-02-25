import type { Player } from "@/interfaces/player";
import type { GameConfig } from "@/components/modals/game-setup-modal";
import { AVAILABLE_COLORS } from "@/constants/available-colors";
import { POINTS_VARIABLES } from "@/constants/points-variables";

export function createPlayers(config: GameConfig): Player[] {
  const { playerName, playerColor, botDifficulty } = config;

  const availableColorsForBot = AVAILABLE_COLORS.filter(
    (c) => c.value !== playerColor,
  );
  const randomIndex = Math.floor(Math.random() * availableColorsForBot.length);
  const botColor =
    availableColorsForBot[randomIndex]?.value || AVAILABLE_COLORS[1].value;

  const humanPlayer: Player = {
    id: 1,
    name: playerName,
    position: 0,
    money: POINTS_VARIABLES.INITIAL_MONEY,
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
    money: POINTS_VARIABLES.INITIAL_MONEY,
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
