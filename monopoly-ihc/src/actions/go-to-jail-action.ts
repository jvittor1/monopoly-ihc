import { POINTS_VARIABLES } from "@/constants/points-variables";
import type { Tile } from "@/hooks/use-board";
import type { Contexts } from "@/types/contexts-type";

export async function handleGoToJailAction(
  tile: Tile,
  playerId: number,
  contexts: Contexts,
): Promise<void> {
  const { modal, player } = contexts;

  await modal.showModalForTile(tile, playerId, {
    onAction: async () => {
      player.movePlayerToJail(playerId);
      await player.addJailTurns(POINTS_VARIABLES.JAIL_TURNS_QUANTITY, playerId);
    },
  });
}
