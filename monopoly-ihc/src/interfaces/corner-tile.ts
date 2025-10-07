import type { BaseTile } from "./base-tile";

export interface CornerTile extends BaseTile {
  kind: "corner";
  points?: number;
}
