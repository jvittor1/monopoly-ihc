import type { Player } from "@/interfaces/player";

export const playerMock: Player[] = [
  {
    id: 1,
    name: "Jogador 1",
    position: 0,
    money: 1500,
    properties: [],
    inJail: false,
    jailTurns: 0,
    getOutOfJailFreeCards: 0,
    bankrupt: false,
    color: "#457B9D",
  },

  {
    id: 2,
    name: "Jogador 2",
    position: 0,
    money: 1500,
    properties: [],
    inJail: false,
    jailTurns: 0,
    getOutOfJailFreeCards: 0,
    bankrupt: false,
    color: "#E63946",
  },
];
// '#E63946', // Vermelho
//     '#457B9D', // Azul
//     '#2A9D8F', // Verde água
//     '#F4A261', // Laranja
//     '#9D4EDD', // Roxo
//     '#06FFA5', // Verde neon
