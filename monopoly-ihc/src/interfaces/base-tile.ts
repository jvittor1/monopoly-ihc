import type { TileType } from "../types/tile-type";

export interface BaseTile {
  id: number;
  text: string;
  type: TileType;
}
