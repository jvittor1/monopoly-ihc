import type { BaseTile } from "@/interfaces/base-tile";
import type { CornerTile } from "@/interfaces/corner-tile";
import type { TileType } from "@/types/tile-type";

export function createCornerTile(
  id: number,
  text: string,
  type: TileType,
  effect: BaseTile["effect"],
): CornerTile {
  return {
    id,
    text,
    type,
    effect,
    isCorner: true,
  };
}
