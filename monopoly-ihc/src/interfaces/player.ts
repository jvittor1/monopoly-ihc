export interface Player {
  id: number;
  name: string;
  position: number;
  money: number;
  properties: number[];
  inJail: boolean;
  jailTurns: number;
  getOutOfJailFreeCards: number;
  bankrupt: boolean;
  color: string;
}
