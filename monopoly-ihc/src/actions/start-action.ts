import { POINTS_VARIABLES } from "@/constants/points-variables";
import type { Tile } from "@/hooks/use-board";
import type { Contexts } from "@/types/contexts-type";

export async function handleStartAction(
  tile: Tile,
  playerId: number,
  contexts: Contexts,
): Promise<void> {
  const { modal, player } = contexts;

  await modal.showModalForTile(tile, playerId, {
    onAction: () => {
      player.addMoney(POINTS_VARIABLES.START, playerId);
    },
  });
}
