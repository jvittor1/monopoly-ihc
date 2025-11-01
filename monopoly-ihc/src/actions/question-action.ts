import type { Contexts } from "@/types/contexts-type";
import type { Tile } from "@/types/tile";

export async function handleQuestionAction(
  tile: Tile,
  playerId: number,
  contexts: Contexts,
): Promise<void> {
  const { modal, answer, player, board } = contexts;

  let isAnswerCorrect = false;
  let questionPayload: any = null;

  await modal.showModalForTile(tile, playerId, {
    onAction: (payload: any) => {
      isAnswerCorrect = payload.isCorrect;
      questionPayload = payload;
    },
  });

  if (questionPayload) {
    await answer.showModalPropertyAcquired(isAnswerCorrect, tile.text);

    if (!isAnswerCorrect) {
      player.removeMoney(tile.points!, playerId);
    } else {
      player.addPropertyToPlayer(playerId, tile.id);
      board.updateTile(tile.id, playerId);
    }
  }
}
