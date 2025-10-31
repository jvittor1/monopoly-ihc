import { handleFreeAction } from "@/actions/free-action";
import { handleGoToJailAction } from "@/actions/go-to-jail-action";
import { handleJailAction } from "@/actions/jail-action";
import { handlePropertyAction } from "@/actions/property-action";
import { handleQuestionAction } from "@/actions/question-action";
import { handleStartAction } from "@/actions/start-action";

import type { Tile } from "@/hooks/use-board";
import type { Contexts } from "@/types/contexts-type";

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
  const { game, modal } = contexts;

  switch (tile.type) {
    case "question":
      await handleQuestionAction(tile, playerId, contexts);

      break;

    case "start":
      await handleStartAction(tile, playerId, contexts);
      break;

    case "jail":
      await handleJailAction(tile, playerId, contexts);
      break;

    case "free":
      await handleFreeAction(tile, playerId, contexts);
      break;

    case "go-to-jail":
      await handleGoToJailAction(tile, playerId, contexts);
      break;

    case "random":
      modal.showModalForTile(tile, playerId, {
        onAction: () => {
          game.nextTurn(game.turnIndex);
        },
      });
      break;

    case "property":
      await handlePropertyAction(tile, playerId, contexts);
      break;

    default:
      console.log("Tipo de tile desconhecido:", tile.type);
      break;
  }

  game.nextTurn(game.turnIndex);
}
