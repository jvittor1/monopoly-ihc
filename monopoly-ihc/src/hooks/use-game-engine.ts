import { useGame } from "@/contexts/game-context";
import { useModal } from "@/contexts/modal-context";
import { useAnswer } from "@/contexts/answer-context";
import { useDiceResult } from "@/contexts/dice-result-overlay-context";

import { ActionsByType } from "@/utils/actions-by-type";
import { usePlayer } from "@/contexts/player-context";
import { useBoard } from "@/contexts/board-context";

export function useGameEngine() {
  const game = useGame();
  const modal = useModal();
  const answer = useAnswer();
  const dice = useDiceResult();
  const board = useBoard();
  const player = usePlayer();

  async function handleDiceResult(value: number) {
    dice.showDiceResult({ value });

    const finalPosition = await player.movePlayer(value, game.currentPlayer.id);
    const tile = board.getTileByIndex(finalPosition);

    await ActionsByType({
      tile,
      playerId: game.currentPlayer.id,
      contexts: { game, modal, answer, player, board },
    });
  }
  return {
    handleDiceResult,
  };
}
