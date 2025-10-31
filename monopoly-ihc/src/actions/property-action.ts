import type { Tile } from "@/hooks/use-board";
import type { Contexts } from "@/types/contexts-type";

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
      player.removeMoney(tile.rentPrice!, playerId);
    },
  });
}
