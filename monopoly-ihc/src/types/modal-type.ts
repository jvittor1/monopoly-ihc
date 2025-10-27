export type BaseModalProps<TileT = any> = {
  tile: TileT;
  playerId: number;
  onClose?: () => void;
  onAction?: (payload?: any) => void;
};
