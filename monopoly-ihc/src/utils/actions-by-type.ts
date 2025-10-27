import { POINTS_VARIABLES } from "@/constants/points-variables";
import type { AnswerContextType } from "@/contexts/answer-context";
import type { GameContextType } from "@/contexts/game-context";
import type { ModalContextType } from "@/contexts/modal-context";
import type { PlayerContextType } from "@/contexts/player-context";
import type { Tile } from "@/hooks/use-board";

interface Contexts {
  game: GameContextType;
  modal: ModalContextType;
  answer: AnswerContextType;
  player: PlayerContextType;
}

interface ActionsProps {
  tile: Tile;
  playerId: number;
  contexts: Contexts;
}

export async function ActionsByType({
  tile,
  playerId,
  contexts,
}: ActionsProps) {
  const { game, modal, answer, player } = contexts;

  switch (tile.type) {
    case "question":
      modal.showModalForTile(tile, playerId, {
        onAction: (payload: any) => {
          answer.showAnswer(payload.isCorrect, playerId, tile.id, tile.points!);
          if (!payload.isCorrect) {
            player.removeMoney(tile.points!, playerId);
          } else if (payload.isCorrect) {
            player.addMoney(tile.points!, playerId);
          }
          game.nextTurn();
        },
      });
      break;

    case "start":
      modal.showModalForTile(tile, playerId, {
        onAction: () => {
          player.addMoney(POINTS_VARIABLES.START, playerId);
          game.nextTurn();
        },
      });
      break;

    case "jail":
      modal.showModalForTile(tile, playerId, {
        onAction: () => {
          player.addJailTurns(POINTS_VARIABLES.JAIL_TURNS_QUANTITY, playerId);
          game.nextTurn();
        },
      });
      break;

    case "free":
      modal.showModalForTile(tile, playerId, {
        onAction: () => game.nextTurn(),
      });
      break;

    case "go-to-jail":
      modal.showModalForTile(tile, playerId, {
        onAction: () => {
          player.movePlayerToJail(playerId);
          player.addJailTurns(POINTS_VARIABLES.JAIL_TURNS_QUANTITY, playerId);
          game.nextTurn();
        },
      });
      break;

    case "random":
      modal.showModalForTile(tile, playerId, {
        onAction: () => {
          game.nextTurn();
        },
      });
      break;

    case "property":
      modal.showModalForTile(tile, playerId, {
        onAction: () => {
          game.nextTurn();
        },
      });
      break;

    default:
      modal.showModalForTile(tile, playerId, {
        onAction: () => game.nextTurn(),
      });
      break;
  }
}
