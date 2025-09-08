import type { CornerTile } from "../interfaces/corner-tile";

export const cornerTiles: CornerTile[] = [
  {
    id: 1,
    text: "Início",
    cornerType: "start",
    effect: (playerId: number) => {
      console.log(`Jogador ${playerId} passou pelo início!`);
    },
  },
  {
    id: 10,
    text: "Prisão",
    cornerType: "jail",
    effect: (playerId: number) => {
      console.log(`Jogador ${playerId} está preso!`);
    },
  },
  {
    id: 20,
    text: "Parada Livre",
    cornerType: "free",
    effect: () => {
      console.log("Parada Livre, nada acontece.");
    },
  },
  {
    id: 30,
    text: "Vá para a prisão",
    cornerType: "go-to-jail",
    effect: (playerId: number) => {
      console.log(`Jogador ${playerId} foi enviado para a prisão!`);
    },
  },
];
