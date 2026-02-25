import type { QuestionCard } from "@/interfaces/question-card";
import type { Contexts } from "@/types/contexts-type";
import type { Tile } from "@/types/tile";
import { ANSWER_COST_BY_DIFFICULTY } from "@/constants/cost-by-difficulty";

export async function handleQuestionAction(
  tile: Tile,
  playerId: number,
  contexts: Contexts,
): Promise<void> {
  const { modal, answer, player, board } = contexts;

  const questionTile = tile as QuestionCard;
  const cost = ANSWER_COST_BY_DIFFICULTY[questionTile.difficulty] ?? 15;

  let wantsToAnswer = false;
  await modal.showChoiceModal(questionTile, playerId, {
    onAction: (payload: any) => {
      wantsToAnswer = payload.wantsToAnswer;
    },
  });

  if (!wantsToAnswer) {
    return;
  }

  player.removeMoney(cost, playerId);

  let isAnswerCorrect = false;
  await modal.showModalForTile(tile, playerId, {
    onAction: (payload: any) => {
      isAnswerCorrect = payload.isCorrect;
    },
  });

  await answer.showModalPropertyAcquired(isAnswerCorrect, tile.text, playerId);
  if (isAnswerCorrect) {
    player.addPropertyToPlayer(playerId, tile.id);
    board.updateTile(tile.id, playerId);
  }
}
