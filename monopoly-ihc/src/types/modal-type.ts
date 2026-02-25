import type { Tile } from "@/types/tile";

export interface BaseModalProps<T extends Tile = Tile> {
  tile: T;
  playerId: number;
  onAction?: (payload: any) => void | Promise<void>;
}
