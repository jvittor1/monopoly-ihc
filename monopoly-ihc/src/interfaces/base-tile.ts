import type { TileType } from "./tile-type";

export interface BaseTile {
  id: number;
  text: string;
  type: TileType;
  effect: (playerId: number) => void;
}
