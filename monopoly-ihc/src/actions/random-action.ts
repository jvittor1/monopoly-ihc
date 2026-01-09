import type { Contexts } from "@/types/contexts-type";
import type { Tile } from "@/types/tile";

export async function handleRandomQuestionAction(
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
    const points = questionPayload.points ?? tile.points ?? 0;
    console.log("removendo pontos do jogador ", points);
    await answer.showAnswer(isAnswerCorrect, points);

    if (!isAnswerCorrect) {
      player.removeMoney(points, playerId);
    } else {
      player.addMoney(points, playerId);
    }
  }
}
