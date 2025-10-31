import type { Tile } from "@/hooks/use-board";
import type { Contexts } from "@/types/contexts-type";

export async function handleQuestionAction(
  tile: Tile,
  playerId: number,
  contexts: Contexts,
): Promise<void> {
  const { modal, answer, player } = contexts;

  let isAnswerCorrect = false;
  let questionPayload: any = null;

  await modal.showModalForTile(tile, playerId, {
    onAction: (payload: any) => {
      isAnswerCorrect = payload.isCorrect;
      questionPayload = payload;
    },
  });

  if (questionPayload) {
    await answer.showAnswer(isAnswerCorrect, tile.points!);

    if (!isAnswerCorrect) {
      player.addPropertyToPlayer(playerId, tile.id);
    } else {
      player.addMoney(tile.points!, playerId);
    }
  }
}
