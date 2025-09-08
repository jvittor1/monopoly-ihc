import type { BaseTile } from "./base-tile";

export interface CornerTile extends BaseTile {
  cornerType: "start" | "jail" | "free" | "go-to-jail";
  points?: number;
}
