import { cornerTiles } from "./corner-cards";
import { questionsPool } from "./questions-pool";
import type { Tile } from "@/types/tile";

function createRevesCard(id: number): Tile {
  return {
    id,
    text: "Sorte ou Revés",
    question: "Carta Surpresa",
    answer: "",
    difficulty: "medium",
    type: "random",
    points: 0,
    alternatives: [],
    correctAlternative: 0,
    rentPrice: 0,
    ownerId: undefined,
    isCorner: false,
  } as Tile;
}

// Selecionar as primeiras 16 perguntas do pool
// Distribuição por dificuldade/cor:
// - 4 verdes (easy - 20pts)
// - 4 laranjas (easy-medium - 30pts)
// - 4 azuis (medium - 40pts)
// - 4 vermelhas (hard - 80pts)
const propertyQuestions = questionsPool.slice(0, 16);

const revesCards = [
  createRevesCard(1001),
  createRevesCard(1002),
  createRevesCard(1003),
  createRevesCard(1004),
];

export const fixedBoardConfig: Tile[] = [
  cornerTiles[0], // Início

  propertyQuestions[0], // verde (easy)
  propertyQuestions[6], // laranja (easy-medium)
  revesCards[0], // Sorte ou Revés
  propertyQuestions[1], // verde (easy)

  cornerTiles[1], // Prisão

  propertyQuestions[7], // azul (medium)
  propertyQuestions[2], // verde (easy)
  propertyQuestions[10], // laranja (easy-medium)
  revesCards[1], // Sorte ou Revés
  propertyQuestions[8], // azul (medium)
  propertyQuestions[3], // verde (easy)

  cornerTiles[2], // Parada Livre

  propertyQuestions[12], // vermelho (hard)
  propertyQuestions[11], // laranja (easy-medium)
  revesCards[2], // Sorte ou Revés
  propertyQuestions[13], // vermelho (hard)

  cornerTiles[3], // Vá para Prisão

  propertyQuestions[4], // laranja (easy-medium)
  propertyQuestions[9], // laranja (easy-medium)
  propertyQuestions[14], // laranja (easy-medium)
  revesCards[3], // Sorte ou Revés
  propertyQuestions[15], // vermelho (hard)
  propertyQuestions[5], // vermelho (hard)
];
