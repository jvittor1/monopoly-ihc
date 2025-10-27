export type BaseModalProps<TileT = any> = {
  tile: TileT;
  playerId: number;
  onAction?: (payload?: any) => void;
};
