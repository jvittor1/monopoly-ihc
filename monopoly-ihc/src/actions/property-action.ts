import type { Contexts } from "@/types/contexts-type";
import type { Tile } from "@/types/tile";

export async function handlePropertyAction(
  tile: Tile,
  playerId: number,
  contexts: Contexts,
): Promise<void> {
  const { modal, player } = contexts;

  if (!("rentPrice" in tile) || tile.rentPrice === undefined) {
    throw new Error("Tile does not have a rent price");
  }

  await modal.showModalForTile(tile, playerId, {
    onAction: async () => {
      if (tile.ownerId !== playerId)
        player.removeMoney(tile.rentPrice!, playerId);
    },
  });
}
