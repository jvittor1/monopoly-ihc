import type { CornerTile } from "../interfaces/corner-tile";

export const cornerTiles: CornerTile[] = [
  {
    id: 1,
    text: "Início",
    cornerType: "start",
    type: "start",
    effect: (playerId: number) => {
      console.log(`Jogador ${playerId} passou pelo início!`);
    },
  },
  {
    id: 10,
    text: "Prisão",
    cornerType: "jail",
    type: "prison",
    effect: (playerId: number) => {
      console.log(`Jogador ${playerId} está preso!`);
    },
  },
  {
    id: 20,
    text: "Vá para a prisão",
    cornerType: "go-to-jail",
    type: "go-to-prison",
    effect: (playerId: number) => {
      console.log(`Jogador ${playerId} foi enviado para a prisão!`);
    },
  },
  {
    id: 30,
    text: "Parada Livre",
    cornerType: "free",
    type: "free",
    effect: () => {
      console.log("Parada Livre, nada acontece.");
    },
  },
];
