import type { Player } from "@/interfaces/player";

export const playerMock: Player[] = [
  {
    id: 1,
    name: "Jogador 1",
    position: 0,
    money: 500,
    properties: [],
    inJail: false,
    jailTurns: 0,
    getOutOfJailFreeCards: 0,
    bankrupt: false,
    color: "#457B9D",
    isBot: false,
  },

  {
    id: 2,
    name: "Jogador 2",
    position: 0,
    money: 500,
    properties: [],
    inJail: false,
    jailTurns: 0,
    getOutOfJailFreeCards: 0,
    bankrupt: false,
    color: "#E63946",
    isBot: false,
  },
];
