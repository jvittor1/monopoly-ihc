import type { Tile } from "@/hooks/use-board";

export interface BaseModalProps<T extends Tile = Tile> {
  tile: T;
  playerId: number;
  onAction?: (payload: any) => void | Promise<void>;
}
