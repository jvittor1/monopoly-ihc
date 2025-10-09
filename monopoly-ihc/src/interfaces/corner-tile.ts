import type { BaseTile } from "./base-tile";

export interface CornerTile extends BaseTile {
  isCorner: true;
  points?: number;
}
