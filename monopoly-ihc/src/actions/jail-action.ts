import { POINTS_VARIABLES } from "@/constants/points-variables";

import type { Contexts } from "@/types/contexts-type";
import type { Tile } from "@/types/tile";

export async function handleJailAction(
  tile: Tile,
  playerId: number,
  contexts: Contexts,
): Promise<void> {
  const { modal, player } = contexts;

  await modal.showModalForTile(tile, playerId, {
    onAction: async () => {
      await player.addJailTurns(POINTS_VARIABLES.JAIL_TURNS_QUANTITY, playerId);
    },
  });
}
