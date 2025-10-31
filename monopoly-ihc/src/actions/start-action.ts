import { POINTS_VARIABLES } from "@/constants/points-variables";

import type { Contexts } from "@/types/contexts-type";
import type { Tile } from "@/types/tile";

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
