import { createCornerTile } from "@/utils/create-corner-tiles";
import type { CornerTile } from "../interfaces/corner-tile";

export const cornerTiles: CornerTile[] = [
  createCornerTile(1, "Início", "start", (playerId: number) => {
    console.log(`Jogador ${playerId} passou pelo início!`);
  }),
  createCornerTile(10, "Prisão", "jail", (playerId: number) => {
    console.log(`Jogador ${playerId} está preso!`);
  }),
  createCornerTile(20, "Vá para a prisão", "go-to-jail", (playerId: number) => {
    console.log(`Jogador ${playerId} foi enviado para a prisão!`);
  }),
  createCornerTile(30, "Parada Livre", "free", () => {
    console.log("Parada Livre, nada acontece.");
  }),
];
