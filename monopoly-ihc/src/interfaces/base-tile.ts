export interface BaseTile {
  id: number;
  text: string;
  effect: (playerId: number) => void;
}
