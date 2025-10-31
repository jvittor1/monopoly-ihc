import type { AnswerContextType } from "@/contexts/answer-context";
import type { BoardContextType } from "@/contexts/board-context";
import type { GameContextType } from "@/contexts/game-context";
import type { ModalContextType } from "@/contexts/modal-context";
import type { PlayerContextType } from "@/contexts/player-context";

export interface Contexts {
  game: GameContextType;
  modal: ModalContextType;
  answer: AnswerContextType;
  player: PlayerContextType;
  board: BoardContextType;
}
