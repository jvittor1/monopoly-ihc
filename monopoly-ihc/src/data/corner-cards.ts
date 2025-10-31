import { createCornerTile } from "@/utils/create-corner-tiles";
import type { CornerTile } from "../interfaces/corner-tile";

export const cornerTiles: CornerTile[] = [
  createCornerTile(1, "Início", "start"),
  createCornerTile(10, "Prisão", "jail"),
  createCornerTile(20, "Parada Livre", "free"),
  createCornerTile(30, "Vá para a prisão", "go-to-jail"),
];
